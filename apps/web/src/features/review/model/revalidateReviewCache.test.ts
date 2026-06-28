import { revalidatePath, revalidateTag } from 'next/cache';



import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { memberKeys, menuKeys, reviewKeys } from '@/shared/lib/queryKey';

import {
  revalidateReviewCache,
  revalidateReviewFavCache,
} from './revalidateReviewCache';

jest.mock('next/cache', () => ({
  revalidateTag: jest.fn(),
  revalidatePath: jest.fn(),
}));

describe('revalidateReviewCache', () => {
  const mockType = FOOD_COURT.KYONGSUL;
  const mockFoodId = 123;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 관련 모든 캐시 태그를 revalidate한다', () => {
    revalidateReviewCache({ type: mockType, foodId: mockFoodId });

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.byFood.tag(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.count.tag(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.averageRating.tag(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.ratingCount.tag(mockType, mockFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(memberKeys.reviews.tag(0));
    expect(revalidateTag).toHaveBeenCalledWith(menuKeys.top.tag());
    expect(revalidateTag).toHaveBeenCalledWith(reviewKeys.recent.tag());

    expect(revalidatePath).toHaveBeenCalledWith(
      ENDPOINT.REVIEW_R.PAGED(mockType, mockFoodId),
    );
  });

  it('특정 페이지가 지정되면 해당 페이지만 revalidate한다', () => {
    const specificPage = 2;

    revalidateReviewCache({
      type: mockType,
      foodId: mockFoodId,
      specificPage,
    });

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.paged.tag(mockType, mockFoodId, specificPage),
    );
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('여러 음식점 타입에서 정상 작동한다', () => {
    const eSquareType = FOOD_COURT.E_SQUARE;
    const eSquareFoodId = 456;

    revalidateReviewCache({ type: eSquareType, foodId: eSquareFoodId });

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.byFood.tag(eSquareType, eSquareFoodId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.count.tag(eSquareType, eSquareFoodId),
    );
  });

  it('revalidateTag가 정확히 7번 호출된다 (specificPage 없을 때)', () => {
    revalidateReviewCache({ type: mockType, foodId: mockFoodId });

    expect(revalidateTag).toHaveBeenCalledTimes(7);
    expect(revalidatePath).toHaveBeenCalledTimes(1);
  });

  it('revalidateTag가 정확히 8번 호출된다 (specificPage 있을 때)', () => {
    revalidateReviewCache({
      type: mockType,
      foodId: mockFoodId,
      specificPage: 1,
    });

    expect(revalidateTag).toHaveBeenCalledTimes(8);
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe('revalidateReviewFavCache', () => {
  const mockType = FOOD_COURT.KYONGSUL;
  const mockReviewId = 999;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('좋아요 관련 모든 캐시 태그를 revalidate한다', () => {
    revalidateReviewFavCache(mockType, mockReviewId);

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.favedCount.tag(mockType, mockReviewId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(reviewKeys.faved.tag(mockType));
    expect(revalidateTag).toHaveBeenCalledWith(memberKeys.favReviews.tag(0));
    expect(revalidateTag).toHaveBeenCalledTimes(3);
  });

  it('여러 음식점 타입에서 정상 작동한다', () => {
    const dormType = FOOD_COURT.DORMITORY;
    const dormReviewId = 555;

    revalidateReviewFavCache(dormType, dormReviewId);

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.favedCount.tag(dormType, dormReviewId),
    );
    expect(revalidateTag).toHaveBeenCalledWith(reviewKeys.faved.tag(dormType));
  });

  it('다른 reviewId에서도 정상 작동한다', () => {
    const differentReviewId = 12345;

    revalidateReviewFavCache(mockType, differentReviewId);

    expect(revalidateTag).toHaveBeenCalledWith(
      reviewKeys.favedCount.tag(mockType, differentReviewId),
    );
  });

  it('revalidatePath는 호출되지 않는다', () => {
    revalidateReviewFavCache(mockType, mockReviewId);

    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
