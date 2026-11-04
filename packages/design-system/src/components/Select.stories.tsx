import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './Select';

const meta: Meta = {
  title: 'Components/Select',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mon">월요일</SelectItem>
          <SelectItem value="tue">화요일</SelectItem>
          <SelectItem value="wed">수요일</SelectItem>
          <SelectItem value="thu">목요일</SelectItem>
          <SelectItem value="fri">금요일</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};
