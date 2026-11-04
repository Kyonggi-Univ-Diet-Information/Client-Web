import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

const meta: Meta = {
  title: 'Components/Avatar',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const WithImage: Story = {
  render: () => (
    <Avatar className="size-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <Avatar className="size-12">
      <AvatarImage src="" alt="" />
      <AvatarFallback>기룡</AvatarFallback>
    </Avatar>
  ),
};
