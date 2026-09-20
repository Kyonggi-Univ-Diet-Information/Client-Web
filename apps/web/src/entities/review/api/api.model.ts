import type { FoodCourt } from '@/shared/api';

import type { Rating, RecentReview, ReportReason, Review } from './api.type';


export type FetchRecentReviewResponse = RecentReview[];

export interface FetchReviewRatingRequest {
  type: FoodCourt;
  foodId: number;
}

export type FetchReviewRatingResponse = Rating;

export type FetchReportReasonsResponse = ReportReason[];

export interface FetchReviewPagedRequest {
  type: FoodCourt;
  foodId: number;
  page?: number;
}

export type FetchReviewPagedResponse = Review[];

export interface RemoveReviewFavRequest {
  reviewId: number;
  type: FoodCourt;
}

export interface RemoveReviewFavResponse {
  success: boolean;
  error?: string;
}

export interface FetchReviewFavedRequest {
  type: FoodCourt;
}

export interface SubmitReviewRequest {
  foodId: number;
  rating: number;
  title: string;
  content: string;
  type: FoodCourt;
}

export interface SubmitReviewResponse {
  success: boolean;
  error?: string;
}

export interface SubmitReviewBlockRequest {
  reviewId: number;
  foodId: number;
  type: FoodCourt;
}

export interface SubmitReviewBlockResponse {
  success: boolean;
  error?: string;
}

export interface SubmitReviewFavRequest {
  reviewId: number;
  type: FoodCourt;
}

export interface SubmitReviewFavResponse {
  success: boolean;
  error?: string;
}

export interface RemoveReviewRequest {
  reviewId: number;
  foodId: number;
  type: FoodCourt;
}

export interface RemoveReviewResponse {
  success: boolean;
  error?: string;
}

export interface FetchReviewFavCountRequest {
  type: FoodCourt;
  reviewId: number;
}

export type FetchReviewFavCountResponse = number;

export interface FetchReviewCountRequest {
  type: FoodCourt;
  foodId: number;
}

export type FetchReviewCountResponse = number;

export interface FetchReviewRatingAverageRequest {
  type: FoodCourt;
  foodId: number;
}

export type FetchReviewRatingAverageResponse = number | null;

export interface SubmitReviewReportRequest {
  reviewId: number;
  type: FoodCourt;
  reasonType: string;
}

export interface SubmitReviewReportResponse {
  success: boolean;
  error?: string;
}
