import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Snackbar, snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Components/Snackbar',
  component: Snackbar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Failure: Story = {
  render: () => (
    <>
      <Button onClick={() => snackbar.error('리뷰 삭제에 실패했습니다.')}>
        실패 스낵바
      </Button>
      <Snackbar />
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <Button onClick={() => snackbar.success('리뷰를 삭제했습니다.')}>
        성공 스낵바
      </Button>
      <Snackbar />
    </>
  ),
};
