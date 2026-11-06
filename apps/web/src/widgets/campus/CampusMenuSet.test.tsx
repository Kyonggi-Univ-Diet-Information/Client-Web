import { render, screen } from '@testing-library/react';

import { fetchCampusMenuHasSet } from '@/features/campus/api/fetchCampusMenuHasSet';

import { FOOD_COURT } from '@/shared/api';

import CampusMenuSet from './CampusMenuSet';

jest.mock('@/features/campus/api/fetchCampusMenuHasSet');

const renderMenuSet = async () =>
  render(
    await CampusMenuSet({ type: FOOD_COURT.KYONGSUL, baseFoodId: 1 }),
  );

describe('CampusMenuSet', () => {
  it('세트 메뉴가 없으면 구분선을 포함해 아무것도 그리지 않는다', async () => {
    (fetchCampusMenuHasSet as jest.Mock).mockResolvedValue([]);

    const { container } = await renderMenuSet();

    expect(container).toBeEmptyDOMElement();
  });

  it('세트 메뉴 조회에 실패해도 아무것도 그리지 않는다', async () => {
    (fetchCampusMenuHasSet as jest.Mock).mockRejectedValue(new Error('fail'));

    const { container } = await renderMenuSet();

    expect(container).toBeEmptyDOMElement();
  });

  it('세트 메뉴가 있으면 구분선과 함께 목록을 그린다', async () => {
    (fetchCampusMenuHasSet as jest.Mock).mockResolvedValue([
      { id: 1, name: '돈까스 세트', price: 8000 },
    ]);

    const { container } = await renderMenuSet();

    expect(screen.getByText('돈까스 세트')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('border-t-6');
  });
});
