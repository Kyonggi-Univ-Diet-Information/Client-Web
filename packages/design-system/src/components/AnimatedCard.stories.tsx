import type { Meta, StoryObj } from '@storybook/react';
import AnimatedCard from './AnimatedCard';

const meta: Meta<typeof AnimatedCard> = {
  title: 'Components/AnimatedCard',
  component: AnimatedCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AnimatedCard>;

export const Ease: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map((i) => (
        <AnimatedCard key={i} index={i} animationType="ease" className="bg-grey-100 rounded-xl p-4">
          <p className="font-semibold">카드 {i + 1}</p>
          <p className="text-sm text-grey-600">ease 애니메이션</p>
        </AnimatedCard>
      ))}
    </div>
  ),
};

export const Spring: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map((i) => (
        <AnimatedCard key={i} index={i} animationType="spring" className="bg-grey-100 rounded-xl p-4">
          <p className="font-semibold">카드 {i + 1}</p>
          <p className="text-sm text-grey-600">spring 애니메이션</p>
        </AnimatedCard>
      ))}
    </div>
  ),
};
