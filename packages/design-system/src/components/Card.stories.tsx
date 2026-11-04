import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>오늘의 메뉴</Card.Header>
      <Card.Content>
        <span className="text-sm text-grey-600">제1학생식당</span>
        <span className="text-sm">돈까스 정식 5,000원</span>
      </Card.Content>
    </Card>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Card href="/campus/1">
      <Card.Header>링크 카드</Card.Header>
      <Card.Content>
        <span className="text-sm text-grey-600">클릭하면 이동해요</span>
      </Card.Content>
    </Card>
  ),
};
