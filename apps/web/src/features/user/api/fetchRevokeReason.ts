import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

interface RevokeReasonResponse {
  result: { type: string; description: string }[];
}

export const fetchRevokeReason = async (): Promise<RevokeReasonResponse> => {
  const data = await Http.getDirect<RevokeReasonResponse>({
    request: ENDPOINT.MEMBER.MEMBER_REVOKE_REASON,
    cache: 'force-cache',
  });
  return data;
};
