import type { ReviewKeywordKey, ReviewKeywords } from '../api/api.type';

// 서버가 내려주는 레벨 값(1~3)은 확정 스펙 확인 후 이 파일에서만 고치면 돼요
export const REVIEW_KEYWORD_GROUPS: {
  key: ReviewKeywordKey;
  title: string;
  question: string;
  options: { level: number; label: string }[];
}[] = [
  {
    key: 'saltLevel',
    title: '간',
    question: '간은 어때요?',
    options: [
      { level: 1, label: '싱거워요' },
      { level: 2, label: '잘 맞아요' },
      { level: 3, label: '짜요' },
    ],
  },
  {
    key: 'spicyLevel',
    title: '맵기',
    question: '맵기는 어때요?',
    options: [
      { level: 1, label: '안 매워요' },
      { level: 2, label: '매콤해요' },
      { level: 3, label: '매워요' },
    ],
  },
  {
    key: 'portionLevel',
    title: '양',
    question: '양은 어때요?',
    options: [
      { level: 1, label: '적어요' },
      { level: 2, label: '딱 좋아요' },
      { level: 3, label: '많아요' },
    ],
  },
  {
    key: 'valueLevel',
    title: '가성비',
    question: '가성비는 어때요?',
    options: [
      { level: 1, label: '아쉬워요' },
      { level: 2, label: '괜찮아요' },
      { level: 3, label: '좋아요' },
    ],
  },
];

export const EMPTY_REVIEW_KEYWORDS: ReviewKeywords = {
  saltLevel: null,
  spicyLevel: null,
  portionLevel: null,
  valueLevel: null,
};

export const getReviewKeywordLabels = (
  keywords: Partial<ReviewKeywords>,
): string[] =>
  REVIEW_KEYWORD_GROUPS.flatMap(({ key, title, options }) => {
    const label = options.find(o => o.level === keywords[key])?.label;
    return label ? [`${title} ${label}`] : [];
  });
