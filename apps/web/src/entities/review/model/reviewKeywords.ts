import type {
  ReviewKeywordKey,
  ReviewKeywordLevel,
  ReviewKeywords,
} from '../api/api.type';

export const REVIEW_KEYWORD_GROUPS: {
  key: ReviewKeywordKey;
  title: string;
  question: string;
  // 목록에서 "간이 짜요"처럼 문장으로 읽히게 라벨 앞에 붙는 말이에요
  displayPrefix: string;
  options: { level: ReviewKeywordLevel; label: string }[];
}[] = [
  {
    key: 'saltLevel',
    title: '간',
    question: '간은 어때요?',
    displayPrefix: '간이 ',
    options: [
      { level: 'LOW', label: '싱거워요' },
      { level: 'MID', label: '잘 맞아요' },
      { level: 'HIGH', label: '짜요' },
    ],
  },
  {
    key: 'spicyLevel',
    title: '맵기',
    question: '맵기는 어때요?',
    displayPrefix: '',
    options: [
      { level: 'LOW', label: '안 매워요' },
      { level: 'MID', label: '매콤해요' },
      { level: 'HIGH', label: '매워요' },
    ],
  },
  {
    key: 'portionLevel',
    title: '양',
    question: '양은 어때요?',
    displayPrefix: '양이 ',
    options: [
      { level: 'LOW', label: '적어요' },
      { level: 'MID', label: '딱 좋아요' },
      { level: 'HIGH', label: '많아요' },
    ],
  },
  {
    key: 'valueLevel',
    title: '가성비',
    question: '가성비는 어때요?',
    displayPrefix: '가성비 ',
    options: [
      { level: 'LOW', label: '아쉬워요' },
      { level: 'MID', label: '괜찮아요' },
      { level: 'HIGH', label: '좋아요' },
    ],
  },
];

export const REVIEW_KEYWORD_LEVELS: ReviewKeywordLevel[] = [
  'LOW',
  'MID',
  'HIGH',
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
  REVIEW_KEYWORD_GROUPS.flatMap(({ key, displayPrefix, options }) => {
    const label = options.find(o => o.level === keywords[key])?.label;
    return label ? [`${displayPrefix}${label}`] : [];
  });
