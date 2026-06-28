export const SET = {
  SET: 'SET',
  COMBO: 'COMBO',
} as const;

const CATEGORY_TO_TEXT_BASE = {
  MEALS: '식사',
  STREET: '분식',
  SOBA: '소바',
  KATSU: '카츠',
  CHICKEN: '치킨',
  JJIGAE: '찌개',
  SOUP: '탕',
  ICE_CREAM: '아이스크림',
  COFFEE_BEVERAGE: '커피/음료',
  CUTLET: '돈까스',
  SIDE: '사이드',
  STEAK: '스테이크',
  NOODLE: '면',
  BOWL: '덮밥',
  CURRY: '커리',
  TTEOKBOKKI: '떡볶이',
  UDON: '우동',
  BURGER: '버거',
  TACO: '타코',
  SET: '세트',
  COMBO: '콤보',
  STEW: '찌개',
  RICE_NOODLE: '쌀국수',
  PASTA: '파스타',
  PACK: '팩',
  RICE: '밥',
  SANDWICH: '샌드위치',
  DRINK: '커피/음료',
  PHO: '쌀국수',
  ETC: '기타',
  BANHMI: '반미',
  SHRIMP: '새우',
  PORK_CUTLET: '돈까스',
  SOMEN: '모밀',
  GUOUI: '꿔이',
  COLD_NOODLE: '냉면',
} as const;

export const CATEGORY_TO_TEXT: Record<string, string> = new Proxy(
  CATEGORY_TO_TEXT_BASE,
  {
    get: (target, prop: string) => {
      return target[prop as keyof typeof target] ?? '기타';
    },
  },
);

const CATEGORY_TO_TEXT_EN_BASE = {
  MEALS: 'Meals',
  STREET: 'Street Food',
  SOBA: 'Soba',
  KATSU: 'Katsu',
  CHICKEN: 'Chicken',
  JJIGAE: 'Jjigae',
  SOUP: 'Soup',
  ICE_CREAM: 'Ice Cream',
  COFFEE_BEVERAGE: 'Coffee/Beverage',
  CUTLET: 'Cutlet',
  SIDE: 'Side',
  STEAK: 'Steak',
  NOODLE: 'Noodle',
  BOWL: 'Bowl',
  CURRY: 'Curry',
  TTEOKBOKKI: 'Tteokbokki',
  UDON: 'Udon',
  BURGER: 'Burger',
  TACO: 'Taco',
  SET: 'Set',
  COMBO: 'Combo',
  STEW: 'Stew',
  RICE_NOODLE: 'Rice Noodle',
  PASTA: 'Pasta',
  PACK: 'Pack',
  RICE: 'Rice',
  SANDWICH: 'Sandwich',
  DRINK: 'Drink',
  PHO: 'Pho',
  ETC: 'Etc',
  BANHMI: 'Banh Mi',
  SHRIMP: 'Shrimp',
  PORK_CUTLET: 'Pork Cutlet',
  SOMEN: 'Somen',
  GUOUI: 'Guoui',
  COLD_NOODLE: 'Cold Noodle',
} as const;

export const CATEGORY_TO_TEXT_EN: Record<string, string> = new Proxy(
  CATEGORY_TO_TEXT_EN_BASE,
  {
    get: (target, prop: string) => {
      return target[prop as keyof typeof target] ?? 'Etc';
    },
  },
);
