import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import Dialog from './Dialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
        <Dialog
          open={open}
          title="리뷰를 삭제할까요?"
          description="삭제한 리뷰는 복구할 수 없어요."
          confirmText="삭제"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const WithoutDescription: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>열기</Button>
        <Dialog
          open={open}
          title="로그아웃 할까요?"
          confirmText="로그아웃"
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};
