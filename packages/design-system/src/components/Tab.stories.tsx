import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tab from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tab>;

const options = [
  { value: 'breakfast', label: '아침' },
  { value: 'lunch', label: '점심' },
  { value: 'dinner', label: '저녁' },
];

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState('lunch');
    return <Tab options={options} value={value} onChange={setValue} size="sm" />;
  },
};

export const Medium: Story = {
  render: () => {
    const [value, setValue] = useState('lunch');
    return <Tab options={options} value={value} onChange={setValue} size="md" />;
  },
};
