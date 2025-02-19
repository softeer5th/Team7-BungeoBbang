import { BorderType } from '@/components/border/BorderProps';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TextField } from '@/components/text-field/TextField';
import { TabBar } from '@/components/tab-bar/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'Components/TabBar',
  component: TabBar,
  argTypes: {
    backgroundColor: { control: 'color' },
    selectedItembackgroundColor: { control: 'color' },
    indicatorColor: { control: 'object' },
    textColor: { control: 'boolean' },
    selectedTextColor: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

// ✅ 동적으로 값이 변경되는 Input (useArgs 적용)
export const Default: Story = {
  args: {
    currentDestination: 'opinion',
    items: [
      {
        itemId: 'agenda',
        title: '말해요',
      },
      {
        itemId: 'agenda',
        title: '말해요',
      },
    ],
    placeholder: 'text message...',
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
    focusable: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    return <TextField {...args} value={value} onChange={handleChange} />;
  },
};

export const WithError: Story = {
  args: {
    value: 'Primary Button',
    placeholder: 'text message...',
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL,
    },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    return (
      <TextField
        {...args}
        value={value}
        placeholder="input email..."
        onChange={handleChange}
        errorText="invalid email"
      />
    );
  },
};

// ✅ Border가 있는 Input
export const WithBorder: Story = {
  args: {
    value: 'Primary Button',
    placeholder: 'text message...',
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
    border: {
      borderWidth: '5px',
      borderColor: 'red',
      disabledBorderColor: 'blue',
      borderRadius: '0px',
      borderType: BorderType.ALL,
    },
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    return (
      <TextField
        {...args} // ✅ 다른 props 유지
        value={value}
        onChange={handleChange} // ✅ 값 변경 이벤트 적용
      />
    );
  },
};
