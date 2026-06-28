'use server';

import type { FetchReportReasonsResponse } from '@/entities/review/api/api.model';
import type { ReportReason } from '@/entities/review/api/api.type';

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';



interface ReportReasonApiResponse {
  result: ReportReason[];
}

export const fetchReportReasons = async (): Promise<FetchReportReasonsResponse> => {
  try {
    const response = await Http.getDirect<ReportReasonApiResponse>({
      request: ENDPOINT.REVIEW_REPORT.REASONS,
      cache: 'force-cache',
    });

    return response.result;
  } catch (error) {
    console.error('Failed to fetch report reasons:', error);
    return [];
  }
};
