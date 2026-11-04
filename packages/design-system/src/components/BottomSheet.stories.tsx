import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import BottomSheet from './BottomSheet';

const meta: Meta = {
  title: 'Components/BottomSheet',
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
        <Button onClick={() => setOpen(true)}>바텀시트 열기</Button>
        {open && (
          <BottomSheet onClose={() => setOpen(false)}>
            <div className="px-5 pb-4">
              <p className="text-lg font-semibold mb-2">정렬 기준</p>
              <div className="flex flex-col gap-3">
                <button type="button" className="text-left py-2 text-grey-900">최신순</button>
                <button type="button" className="text-left py-2 text-grey-900">별점순</button>
              </div>
            </div>
          </BottomSheet>
        )}
      </>
    );
  },
};
