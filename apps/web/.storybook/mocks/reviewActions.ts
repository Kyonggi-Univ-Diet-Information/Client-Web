// 스토리북에서 리뷰 서버 액션 대신 쓰는 목이에요
export const fetchReportReasons = async () => [
  { type: 'SPAM', description: '스팸/광고' },
  { type: 'ABUSE', description: '욕설/비방' },
];
export const removeReview = async () => ({ success: true });
export const removeReviewFav = async () => ({ success: true });
export const submitReviewBlock = async () => ({ success: true });
export const submitReviewFav = async () => ({ success: true });
export const submitReviewReport = async () => ({ success: true });
