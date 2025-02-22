import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TabBar } from '@/components/tab-bar/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  argTypes: {
    backgroundColor: { control: 'color' },
    selectedItembackgroundColor: { control: 'color' },
    indicatorColor: { control: 'color' },
    textColor: { control: 'color' },
    selectedTextColor: { control: 'color' },
  },
  tags:['autodocs']
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const TabBarDefault: Story = {
  args: {
    currentDestination: 'opinion',
    items: [
      {
        itemId: 'opinion',
        title: '말해요',
      },
      {
        itemId: 'agenda',
        title: '답해요',
      },
    ],
    backgroundColor: '#FFFFFF',
    selectedItembackgroundColor: '#FFFFFF',
    indicatorColor: '#1F87FF',
    textColor: '#C6C6C6',
    selectedTextColor: '#1F87FF',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ ...args, currentDestination: newValue });
    };

    return <TabBar {...args} currentDestination={value} onItemClick={handleChange} />;
  },
};
