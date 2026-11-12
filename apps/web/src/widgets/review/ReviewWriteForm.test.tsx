import { snackbar } from '@kiryong/design-system';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { submitReview } from '@/features/review/api/submitReview';
import { uploadReviewImages } from '@/features/review/api/uploadReviewImages';

import { FOOD_COURT } from '@/shared/api';
import { trackEvent } from '@/shared/lib/ga4';
import { isPhotoReviewEnabled } from '@/shared/utils/version';

import ReviewWriteForm from './ReviewWriteForm';

const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockPathname = '/review/ks/7/write';
let mockSearch = '';
let rerenderForm: () => void = () => {};

jest.mock('@kiryong/design-system', () => ({
  ...jest.requireActual('@kiryong/design-system'),
  snackbar: { error: jest.fn() },
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace, push: mockPush }),
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(mockSearch),
}));
jest.mock('swr', () => ({
  ...jest.requireActual('swr'),
  useSWRConfig: () => ({ mutate: jest.fn() }),
}));
jest.mock('@/features/review/api/submitReview');
jest.mock('@/features/review/api/uploadReviewImages');
jest.mock('@/shared/utils/version');
jest.mock('@/shared/lib/ga4', () => ({ trackEvent: jest.fn() }));
jest.mock('../../../public/icons/icon-camera.svg', () => () => null);
jest.mock('../../../public/icons/icon-check.svg', () => () => null);
jest.mock('../../../public/icons/icon-mood-good.svg', () => () => null);
jest.mock('../../../public/icons/icon-star-empty-lg.svg', () => () => null);
jest.mock('../../../public/icons/icon-star-filled-lg.svg', () => () => null);

const createForm = () => (
  <ReviewWriteForm
    foodCourt={FOOD_COURT.KYONGSUL}
    foodId={7}
    menuName='돈까스'
    price={6000}
    menuImage={null}
  />
);

const renderForm = () => {
  const result = render(createForm());
  // 같은 element면 React가 리렌더를 건너뛰어서 매번 새로 만들어요
  rerenderForm = () => result.rerender(createForm());
  return result;
};

// 첫 단계에서 별점과 키워드를 고르고 다음 단계로 넘어가요
const goToDetailStep = async (
  user: ReturnType<typeof userEvent.setup>,
  rating = 3,
) => {
  await user.click(screen.getByRole('radio', { name: `${rating}점` }));
  await user.click(screen.getByRole('button', { name: '싱거워요' }));
  await user.click(screen.getByRole('button', { name: '다음' }));
};

const trackedEvents = (name: string) =>
  (trackEvent as jest.Mock).mock.calls.filter(([event]) => event === name);

const submittedFormData = () =>
  (submitReview as jest.Mock).mock.calls[0][1] as FormData;

describe('ReviewWriteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearch = '';
    mockPush.mockImplementation((url: string) => {
      mockSearch = url.split('?')[1] ?? '';
      rerenderForm();
    });
    (submitReview as jest.Mock).mockResolvedValue({ success: true });
    (uploadReviewImages as jest.Mock).mockResolvedValue([]);
    (isPhotoReviewEnabled as jest.Mock).mockReturnValue(false);
  });

  it('별점을 고르지 않은 상태로 시작한다', () => {
    renderForm();

    expect(screen.queryAllByRole('radio', { checked: true })).toHaveLength(0);
  });

  it('별점과 키워드를 모두 골라야 다음 단계로 넘어갈 수 있다', async () => {
    const user = userEvent.setup();
    renderForm();
    const nextButton = screen.getByRole('button', { name: '다음' });

    expect(nextButton).toBeDisabled();

    await user.click(screen.getByRole('button', { name: '싱거워요' }));
    expect(nextButton).toBeDisabled();

    await user.click(screen.getByRole('radio', { name: '4점' }));
    expect(nextButton).toBeEnabled();

    await user.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?step=detail`);
    expect(
      await screen.findByRole('button', { name: '리뷰 등록하기' }),
    ).toBeInTheDocument();
  });

  it('키워드 없이 상세 단계 주소로 들어오면 첫 단계가 보인다', () => {
    mockSearch = 'step=detail';
    renderForm();

    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument();
  });

  it('후기는 선택이라 비워도 등록할 수 있고 글자 수를 보여준다', async () => {
    const user = userEvent.setup();
    renderForm();
    await goToDetailStep(user);

    const submitButton = await screen.findByRole('button', {
      name: '리뷰 등록하기',
    });
    await waitFor(() => expect(submitButton).toBeEnabled());
    expect(
      screen.getByText(
        (_, el) => el?.tagName === 'P' && el.textContent === '0 / 100',
      ),
    ).toBeInTheDocument();

    await user.type(screen.getByRole('textbox'), '맛있어요');
    expect(
      screen.getByText(
        (_, el) => el?.tagName === 'P' && el.textContent === '4 / 100',
      ),
    ).toBeInTheDocument();
  });

  it('입력한 별점, 키워드, 내용을 제출하고 상세 화면으로 돌아간다', async () => {
    const user = userEvent.setup();
    renderForm();

    await goToDetailStep(user, 5);
    await user.type(await screen.findByRole('textbox'), '맛있어요');
    await user.click(screen.getByRole('button', { name: '리뷰 등록하기' }));

    await waitFor(() => expect(submitReview).toHaveBeenCalled());
    const formData = submittedFormData();
    expect(formData.get('foodId')).toBe('7');
    expect(formData.get('foodCourt')).toBe(FOOD_COURT.KYONGSUL);
    expect(formData.get('rating')).toBe('5');
    expect(formData.get('saltLevel')).toBe('LOW');
    expect(formData.get('spicyLevel')).toBeNull();
    expect(formData.get('content')).toBe('맛있어요');
    await waitFor(() =>
      expect(mockReplace).toHaveBeenCalledWith('/review/ks/7'),
    );
  });

  it('첨부한 사진을 업로드하고 key를 함께 제출한다', async () => {
    (isPhotoReviewEnabled as jest.Mock).mockReturnValue(true);
    (uploadReviewImages as jest.Mock).mockResolvedValue(['tmp/a.webp']);
    global.fetch = jest.fn().mockResolvedValue({
      blob: () => Promise.resolve(new Blob(['a'], { type: 'image/webp' })),
    });
    const user = userEvent.setup();
    const { container } = renderForm();
    await goToDetailStep(user);

    await waitFor(() =>
      expect(container.querySelector('input[type="file"]')).not.toBeNull(),
    );
    await user.upload(
      container.querySelector('input[type="file"]') as HTMLInputElement,
      new File(['a'], 'a.webp', { type: 'image/webp' }),
    );
    expect(await screen.findByAltText('첨부한 사진 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '리뷰 등록하기' }));

    await waitFor(() => expect(submitReview).toHaveBeenCalled());
    expect((uploadReviewImages as jest.Mock).mock.calls[0][0]).toHaveLength(1);
    expect(submittedFormData().getAll('imageKeys')).toEqual(['tmp/a.webp']);
  });

  it('제출에 실패하면 스낵바를 띄우고 입력값을 유지한다', async () => {
    (submitReview as jest.Mock).mockResolvedValue({
      success: false,
      error: '리뷰 등록에 실패했습니다',
    });
    const user = userEvent.setup();
    renderForm();
    await goToDetailStep(user);

    await user.type(await screen.findByRole('textbox'), '맛있어요');
    await user.click(screen.getByRole('button', { name: '리뷰 등록하기' }));

    await waitFor(() =>
      expect(snackbar.error).toHaveBeenCalledWith('리뷰 등록에 실패했습니다'),
    );
    expect(screen.getByRole('textbox')).toHaveValue('맛있어요');
    expect(mockReplace).not.toHaveBeenCalled();
  });

  describe('GA4 리뷰 작성 Funnel', () => {
    it('작성 시작부터 등록 성공까지 같은 attempt_id와 referrer로 한 번씩 기록한다', async () => {
      mockSearch = 'referrer=home_recent';
      const user = userEvent.setup();
      renderForm();

      expect(trackedEvents('review_start')).toHaveLength(1);
      const [, startParams] = trackedEvents('review_start')[0];
      expect(startParams).toEqual({
        referrer: 'home_recent',
        flow_version: 'revamp_v1',
        attempt_id: expect.any(String),
      });

      await goToDetailStep(user);
      expect(mockPush).toHaveBeenCalledWith(
        `${mockPathname}?referrer=home_recent&step=detail`,
      );
      expect(trackedEvents('review_step1_complete')).toEqual([
        ['review_step1_complete', startParams],
      ]);

      await user.click(
        await screen.findByRole('button', { name: '리뷰 등록하기' }),
      );

      await waitFor(() =>
        expect(trackedEvents('review_submit_success')).toHaveLength(1),
      );
      expect(trackedEvents('review_submit_success')[0][1]).toEqual(
        expect.objectContaining({
          ...startParams,
          duration_sec: expect.any(Number),
          keyword_count: 1,
          photo_count: 0,
        }),
      );
      expect(trackedEvents('review_start')).toHaveLength(1);
    });

    it('리뷰 목록에서 들어오면 menu_detail_review_list로 기록한다', () => {
      mockSearch = 'referrer=menu_detail_review_list';
      renderForm();

      expect(trackedEvents('review_start')[0][1]).toEqual(
        expect.objectContaining({ referrer: 'menu_detail_review_list' }),
      );
    });

    it('referrer 쿼리가 없으면 menu_detail로 기록한다', () => {
      renderForm();

      expect(trackedEvents('review_start')[0][1]).toEqual(
        expect.objectContaining({ referrer: 'menu_detail' }),
      );
    });

    it('등록 실패는 error_type과 함께 기록하고 성공 이벤트는 남기지 않는다', async () => {
      (submitReview as jest.Mock).mockResolvedValue({
        success: false,
        error: '리뷰 등록에 실패했습니다',
      });
      const user = userEvent.setup();
      renderForm();
      await goToDetailStep(user);
      await user.click(
        await screen.findByRole('button', { name: '리뷰 등록하기' }),
      );

      await waitFor(() =>
        expect(trackedEvents('review_submit_error')).toHaveLength(1),
      );
      expect(trackedEvents('review_submit_error')[0][1]).toEqual(
        expect.objectContaining({
          referrer: 'menu_detail',
          error_type: 'server',
          attempt_id: trackedEvents('review_start')[0][1].attempt_id,
        }),
      );
      expect(trackedEvents('review_submit_success')).toHaveLength(0);
    });
  });
});
