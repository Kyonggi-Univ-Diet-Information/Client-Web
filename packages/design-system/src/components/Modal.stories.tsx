import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import Modal from './Modal';

const meta: Meta = {
  title: 'Components/Modal',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        {open && (
          <Modal onClose={() => setOpen(false)}>
            <Modal.Header title="공지사항" subtitle="중요한 안내 사항이에요" />
            <p className="text-sm text-grey-600">모달 내용이 들어갑니다.</p>
            <Modal.Footer>
              <Button size="sm" onClick={() => setOpen(false)}>확인</Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  },
};
