import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SegmentedControl from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

const options = [
  { value: 'campus', label: '학식' },
  { value: 'dorm', label: '기숙사' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('campus');
    return (
      <SegmentedControl
        options={options}
        value={value}
        onChange={setValue}
        className="w-64"
      />
    );
  },
};
