import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import styled from 'styled-components';
import { TabBarContainer } from '@/components/tab-bar/TabBarCotainer';

const meta: Meta<typeof TabBarContainer> = {
  title: 'Components/TabBar',
  component: TabBarContainer,
  argTypes: {
    contentBackgroundColor: { control: 'color' },
    tabBarBackgroundColor: { control: 'color' },
    selectedTabBarItembackgroundColor: { control: 'color' },
    indicatorColor: { control: 'color' },
    tabBarTextColor: { control: 'color' },
    tabBarSelectedTextColor: { control: 'color' },
    currentTabSelectedIndex: { control: 'number' },
  },
  args: {
    contentBackgroundColor: '#F4F4F4',
    tabBarBackgroundColor: '#FFFFFF',
    selectedTabBarItembackgroundColor: '#FFFFFF',
    indicatorColor: '#1F87FF',
    tabBarTextColor: '#C6C6C6',
    tabBarSelectedTextColor: '#1F87FF',
    currentTabSelectedIndex: 0,
  },
  tags: ['autodocs'],
};

export default meta;
type TabBarContainerStory = StoryObj<typeof TabBarContainer>;

const sampleTabItems = [
  { itemId: 'tab1', title: 'Tab 1' },
  { itemId: 'tab2', title: 'Tab 2' },
  { itemId: 'tab3', title: 'Tab 3' },
];

export const TabBarContainerDefault: TabBarContainerStory = {
  args: {
    currentTabSelectedIndex: 1,
  },

  render: function Render(args) {
    const [{ currentTabSelectedIndex }, updateArgs] = useArgs();

    const handleTabChange = (itemId: string) => {
      const newIndex = sampleTabItems.findIndex((tab) => tab.itemId === itemId);
      updateArgs({ currentTabSelectedIndex: newIndex });
    };

    return (
      <TabBarContainer
        {...args}
        tabItems={sampleTabItems}
        currentTabSelectedIndex={currentTabSelectedIndex}
        onTabItemClick={handleTabChange}
        contents={(index: number) => (
          <TabContent>📌 현재 선택된 탭: {sampleTabItems[index].title}</TabContent>
        )}
      />
    );
  },
};

const TabContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 18px;
  color: #1f87ff;
  background-color: #e0f2ff;
  border-radius: 8px;
  font-weight: bold;
`;
