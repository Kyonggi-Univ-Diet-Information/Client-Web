import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button Component', () => {
  it('기본 버튼이 올바르게 렌더링된다', () => {
    render(<Button>클릭하세요</Button>);

    const button = screen.getByRole('button', { name: '클릭하세요' });
    expect(button).toBeInTheDocument();
  });

  it('클릭 이벤트가 정상적으로 동작한다', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>클릭</Button>);

    const button = screen.getByRole('button', { name: '클릭' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled 상태일 때 클릭이 동작하지 않는다', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        비활성화
      </Button>,
    );

    const button = screen.getByRole('button', { name: '비활성화' });
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  describe('variant 속성', () => {
    it('default variant를 적용한다', () => {
      render(<Button variant='default'>기본</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary');
    });

    it('destructive variant를 적용한다', () => {
      render(<Button variant='destructive'>삭제</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive');
    });

    it('outline variant를 적용한다', () => {
      render(<Button variant='outline'>외곽선</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border');
    });

    it('ghost variant를 적용한다', () => {
      render(<Button variant='ghost'>고스트</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent');
    });

    it('kakao variant를 적용한다', () => {
      render(<Button variant='kakao'>카카오</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#fee500]');
    });
  });

  describe('size 속성', () => {
    it('default size를 적용한다', () => {
      render(<Button size='default'>기본 크기</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('sm size를 적용한다', () => {
      render(<Button size='sm'>작은 크기</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8');
    });

    it('lg size를 적용한다', () => {
      render(<Button size='lg'>큰 크기</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10');
    });

    it('icon size를 적용한다', () => {
      render(<Button size='icon'>아이콘</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-9');
    });
  });

  it('커스텀 className을 적용한다', () => {
    render(<Button className='custom-class'>커스텀</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('asChild 속성으로 자식 컴포넌트를 래핑한다', () => {
    render(
      <Button asChild>
        <a href='/test'>링크 버튼</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: '링크 버튼' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('data-slot 속성이 올바르게 설정된다', () => {
    render(<Button>테스트</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-slot', 'button');
  });

  it('여러 속성을 동시에 적용한다', () => {
    render(
      <Button variant='destructive' size='lg' className='mt-4'>
        여러 속성
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive', 'h-10', 'mt-4');
  });
});
