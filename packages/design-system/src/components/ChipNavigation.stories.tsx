import type { Meta, StoryObj } from '@storybook/react';
import ChipNavigation from './ChipNavigation';

const meta: Meta<typeof ChipNavigation> = {
  title: 'Components/ChipNavigation',
  component: ChipNavigation,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChipNavigation>;

const tabs = [
  { key: 'all', label: '전체', href: '?tab=all' },
  { key: 'korean', label: '한식', href: '?tab=korean' },
  { key: 'western', label: '양식', href: '?tab=western' },
  { key: 'chinese', label: '중식', href: '?tab=chinese' },
  { key: 'japanese', label: '일식', href: '?tab=japanese' },
];

export const Point: Story = {
  args: { tabs, currentTabKey: 'all', variant: 'point' },
};

export const Black: Story = {
  args: { tabs, currentTabKey: 'korean', variant: 'black' },
};

export const Small: Story = {
  args: { tabs, currentTabKey: 'all', variant: 'point', size: 'small' },
};
