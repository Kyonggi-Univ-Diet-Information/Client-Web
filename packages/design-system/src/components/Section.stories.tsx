import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import Card from './Card';
import Section from './Section';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => (
    <Section>
      <Section.Header
        title="오늘의 추천"
        subtitle="인기 메뉴를 확인하세요"
        action={<Button size="sm" variant="ghost">더보기</Button>}
      />
      <Section.Content>
        <Card>
          <Card.Header>돈까스 정식</Card.Header>
          <Card.Content><span className="text-sm">5,000원</span></Card.Content>
        </Card>
        <Card>
          <Card.Header>비빔밥</Card.Header>
          <Card.Content><span className="text-sm">4,500원</span></Card.Content>
        </Card>
      </Section.Content>
    </Section>
  ),
};
