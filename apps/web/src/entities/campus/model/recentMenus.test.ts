import { addRecentMenu, getRecentMenus } from './recentMenus';

const menu = (foodId: number) => ({
  foodCourt: 'KYONGSUL' as const,
  foodId,
  name: `메뉴${foodId}`,
});

describe('recentMenus', () => {
  beforeEach(() => localStorage.clear());

  it('최신순으로 최대 3개까지 저장하고, 다시 본 메뉴는 맨 앞으로 옮긴다', () => {
    [1, 2, 3, 4].forEach(id => addRecentMenu(menu(id)));
    addRecentMenu(menu(2));

    expect(getRecentMenus().map(m => m.foodId)).toEqual([2, 4, 3]);
  });
});
