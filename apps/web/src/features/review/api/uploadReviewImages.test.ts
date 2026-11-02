import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { uploadReviewImages } from './uploadReviewImages';

jest.mock('@/shared/api/api-handlers');

describe('uploadReviewImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  it('presigned URL을 받아 S3에 PUT하고 key를 순서대로 돌려줘요', async () => {
    (Http.post as jest.Mock).mockResolvedValue({
      result: [
        { key: 'tmp/a.jpg', uploadUrl: 'https://s3/a' },
        { key: 'tmp/b.png', uploadUrl: 'https://s3/b' },
      ],
    });
    const jpeg = new Blob(['a'], { type: 'image/jpeg' });
    const png = new Blob(['b'], { type: 'image/png' });

    const keys = await uploadReviewImages([jpeg, png]);

    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        request: ENDPOINT.REVIEW_CUD.IMAGE_PRESIGNED_URL,
        data: { contentTypes: ['image/jpeg', 'image/png'] },
      }),
      expect.anything(),
    );
    expect(global.fetch).toHaveBeenCalledWith('https://s3/b', {
      method: 'PUT',
      headers: { 'Content-Type': 'image/png' },
      body: png,
    });
    expect(keys).toEqual(['tmp/a.jpg', 'tmp/b.png']);
  });

  it('사진이 없으면 요청하지 않아요', async () => {
    expect(await uploadReviewImages([])).toEqual([]);
    expect(Http.post).not.toHaveBeenCalled();
  });

  it('S3 업로드가 실패하면 에러를 던져요', async () => {
    (Http.post as jest.Mock).mockResolvedValue({
      result: [{ key: 'tmp/a.jpg', uploadUrl: 'https://s3/a' }],
    });
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    await expect(
      uploadReviewImages([new Blob(['a'], { type: 'image/jpeg' })]),
    ).rejects.toThrow('사진 업로드에 실패했어요');
  });
});
