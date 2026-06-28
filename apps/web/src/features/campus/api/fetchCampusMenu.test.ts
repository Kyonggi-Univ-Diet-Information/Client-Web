


import type { CampusMenu } from '@/entities/campus/api/api.type';

import { ENDPOINT, FOOD_COURT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';

import { fetchCampusMenu } from './fetchCampusMenu';

// Http 모듈 모킹
jest.mock('@/shared/api/api-handlers');

describe('fetchCampusMenu', () => {
  const mockCampusMenuData: CampusMenu[] = [
    {
      id: 1,
      name: '김치찌개',
      nameEn: 'Kimchi Stew',
      price: 5000,
      subRestaurant: 'MANKWON',
    },
    {
      id: 2,
      name: '돈까스',
      nameEn: 'Pork Cutlet',
      price: 6000,
      subRestaurant: 'MANKWON',
    },
    {
      id: 3,
      name: '파스타',
      nameEn: 'Pasta',
      price: 7000,
      subRestaurant: 'SYONG',
    },
  ];

  beforeEach(() => {
    // 각 테스트 전에 모킹 초기화
    jest.clearAllMocks();
  });

  it('캠퍼스 메뉴를 성공적으로 가져와서 레스토랑별로 그룹화한다', async () => {
    (Http.get as jest.Mock).mockResolvedValue(mockCampusMenuData);

    const result = await fetchCampusMenu();

    expect(Http.get).toHaveBeenCalledWith({
      request: ENDPOINT.MENU.MENU_ALL(FOOD_COURT.KYONGSUL),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 3600 },
    });

    expect(result).toEqual({
      MANKWON: [
        {
          id: 1,
          name: '김치찌개',
          nameEn: 'Kimchi Stew',
          price: 5000,
          subRestaurant: 'MANKWON',
        },
        {
          id: 2,
          name: '돈까스',
          nameEn: 'Pork Cutlet',
          price: 6000,
          subRestaurant: 'MANKWON',
        },
      ],
      SYONG: [
        {
          id: 3,
          name: '파스타',
          nameEn: 'Pasta',
          price: 7000,
          subRestaurant: 'SYONG',
        },
      ],
    });
  });

  it('빈 배열을 받으면 빈 객체를 반환한다', async () => {
    // Given: Http.get이 빈 배열을 반환
    (Http.get as jest.Mock).mockResolvedValue([]);

    // When: fetchCampusMenu 함수를 호출
    const result = await fetchCampusMenu();

    // Then: 빈 객체가 반환되어야 함
    expect(result).toEqual({});
  });

  it('API 호출 실패 시 에러를 throw한다', async () => {
    // Given: Http.get이 에러를 throw하도록 설정
    const mockError = new Error('Network Error');
    (Http.get as jest.Mock).mockRejectedValue(mockError);

    // When & Then: 함수 호출 시 에러가 발생해야 함
    await expect(fetchCampusMenu()).rejects.toThrow('Network Error');
  });
});
