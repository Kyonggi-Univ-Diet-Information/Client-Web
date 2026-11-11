import { FoodCourt } from '@/shared/api';

export type ReviewKeywordKey =
  | 'saltLevel'
  | 'spicyLevel'
  | 'portionLevel'
  | 'valueLevel';

// 서버가 내려주는 키워드 단계예요
export type ReviewKeywordLevel = 'LOW' | 'MID' | 'HIGH';

// 값이 없는 기존 리뷰는 null이에요
export type ReviewKeywords = Record<ReviewKeywordKey, ReviewKeywordLevel | null>;

export type Review = Partial<ReviewKeywords> & {
  id: number;
  rating: number;
  title: string;
  content: string;
  memberName: string;
  createdAt: string;
  updatedAt: string;
  myReview: boolean;
  images?: { id: number; url: string }[];
};

export type RecentReview = Pick<
  Review,
  'memberName' | 'rating' | 'title' | 'content' | 'createdAt' | 'myReview'
> &
  Partial<ReviewKeywords> & {
  foodId: number;
  reviewId: number;
  restaurantType: FoodCourt;
};

export type ReviewPost = Pick<Review, 'rating' | 'title' | 'content'> &
  Partial<ReviewKeywords> & {
    imageKeys?: string[];
  };

export type ReviewSort = 'recent' | 'rating-desc' | 'rating-asc';

export type Rating = {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
};

export interface ReviewWithMetadata extends Review {
  likedCount: number;
  isLiked: boolean;
  isMyReview: boolean;
}

export type FetchReviewBaseRes = {
  id: number;
  memberDTO: {
    profileId: null;
    email: string;
    password: null;
    name: string;
    profileUrl: null;
    createdAt: string;
    updatedAt: null;
  };
  createdAt: string;
};

export type KyongsulFoodReviewRes = FetchReviewBaseRes & {
  kyongsulFoodReviewId: number;
};

export type SallyBoxFoodReviewRes = FetchReviewBaseRes & {
  sallyBoxFoodReviewId: number;
};

export type EsquareFoodReviewRes = FetchReviewBaseRes & {
  esquareFoodReviewId: number;
};

export type FetchReviewLikedRes =
  | KyongsulFoodReviewRes
  | SallyBoxFoodReviewRes
  | EsquareFoodReviewRes;

export interface ReportReason {
  type: string;
  description: string;
}
