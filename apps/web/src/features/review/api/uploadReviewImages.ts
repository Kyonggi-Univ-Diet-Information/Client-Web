import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

type PresignedUrl = { key: string; uploadUrl: string };

// 서버 액션 body 한도(1MB)를 넘기 쉬워서 클라이언트에서 S3로 직접 올려요. uploadUrl은 3분 안에 써야 해요
export async function uploadReviewImages(images: Blob[]): Promise<string[]> {
  if (images.length === 0) return [];

  const { result } = await Http.post<
    { contentTypes: string[] },
    { result: PresignedUrl[] }
  >(
    {
      request: ENDPOINT.REVIEW_CUD.IMAGE_PRESIGNED_URL,
      data: { contentTypes: images.map(image => image.type) },
      authorize: true,
    },
    { errorMessage: '사진 업로드에 실패했어요' },
  );

  await Promise.all(
    result.map(async ({ uploadUrl }, i) => {
      const res = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': images[i].type },
        body: images[i],
      });
      if (!res.ok) throw new Error('사진 업로드에 실패했어요');
    }),
  );

  return result.map(({ key }) => key);
}
