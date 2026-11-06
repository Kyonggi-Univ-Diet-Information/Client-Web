import { snackbar } from '@kiryong/design-system';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { submitReview } from '@/features/review/api/submitReview';
import { uploadReviewImages } from '@/features/review/api/uploadReviewImages';

import { FOOD_COURT } from '@/shared/api';
import { isPhotoReviewEnabled } from '@/shared/utils/version';

import ReviewWriteForm from './ReviewWriteForm';

const mockReplace = jest.fn();

jest.mock('@kiryong/design-system', () => ({
  ...jest.requireActual('@kiryong/design-system'),
  snackbar: { error: jest.fn() },
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));
jest.mock('swr', () => ({
  ...jest.requireActual('swr'),
  useSWRConfig: () => ({ mutate: jest.fn() }),
}));
jest.mock('@/features/review/api/submitReview');
jest.mock('@/features/review/api/uploadReviewImages');
jest.mock('@/shared/utils/version');
jest.mock('../../../public/icons/icon-camera.svg', () => () => null);
jest.mock('../../../public/icons/icon-mood-good.svg', () => () => null);
jest.mock('../../../public/icons/icon-star-empty.svg', () => () => null);
jest.mock('../../../public/icons/icon-star-filled.svg', () => () => null);

const renderForm = () =>
  render(
    <ReviewWriteForm
      foodCourt={FOOD_COURT.KYONGSUL}
      foodId={7}
      menuName='돈까스'
      price={6000}
      menuImage={null}
    />,
  );

const submittedFormData = () =>
  (submitReview as jest.Mock).mock.calls[0][1] as FormData;

describe('ReviewWriteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (submitReview as jest.Mock).mockResolvedValue({ success: true });
    (uploadReviewImages as jest.Mock).mockResolvedValue([]);
    (isPhotoReviewEnabled as jest.Mock).mockReturnValue(false);
  });

  it('공백만 입력하면 등록할 수 없고 글자를 입력하면 등록할 수 있다', async () => {
    const user = userEvent.setup();
    renderForm();
    const submitButton = screen.getByRole('button', { name: '리뷰 등록하기' });
    const textarea = screen.getByRole('textbox');

    expect(submitButton).toBeDisabled();

    await user.type(textarea, '   ');
    expect(submitButton).toBeDisabled();

    await user.type(textarea, '맛있어요');
    await waitFor(() => expect(submitButton).toBeEnabled());
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('입력한 별점과 내용을 제출하고 상세 화면으로 돌아간다', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('radio', { name: '5점' }));
    await user.type(screen.getByRole('textbox'), '맛있어요');
    await user.click(screen.getByRole('button', { name: '리뷰 등록하기' }));

    await waitFor(() => expect(submitReview).toHaveBeenCalled());
    const formData = submittedFormData();
    expect(formData.get('foodId')).toBe('7');
    expect(formData.get('foodCourt')).toBe(FOOD_COURT.KYONGSUL);
    expect(formData.get('rating')).toBe('5');
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

    await user.upload(
      container.querySelector('input[type="file"]') as HTMLInputElement,
      new File(['a'], 'a.webp', { type: 'image/webp' }),
    );
    expect(await screen.findByAltText('첨부한 사진 1')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox'), '맛있어요');
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

    await user.type(screen.getByRole('textbox'), '맛있어요');
    await user.click(screen.getByRole('button', { name: '리뷰 등록하기' }));

    await waitFor(() =>
      expect(snackbar.error).toHaveBeenCalledWith('리뷰 등록에 실패했습니다'),
    );
    expect(screen.getByRole('textbox')).toHaveValue('맛있어요');
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
