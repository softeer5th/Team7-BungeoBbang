import { BorderType } from '@/components/border/BorderProps';
import { CountTextField } from '@/components/text-field/CountTextField';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof CountTextField> = {
  title: 'Components/CountTextField',
  component: CountTextField,
  argTypes: {
    placeholderColor: { control: 'color' },
    textColor: { control: 'color' },
    border: { control: 'object' },
    disabled: { control: 'boolean' },
    rows: { control: 'number', min: 1, max: 10, step: 1 },
  },
  args: {
    value: '', // ✅ 기본값 빈 문자열로 설정
    maxLength: 20,
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CountTextField>;

// ✅ 동적으로 값이 변경되는 Input (useArgs 적용)
export const Default: Story = {
  args: {
    value: 'Hello World!',
    placeholder: 'text message...',
    maxLength: 20,
    placeholderColor: '#A8A8A8',
    textColor: '#262626',
    disabled: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    return <CountTextField {...args} value={value} onChange={handleChange} />;
  },
};

// ✅ Border가 있는 Input
export const WithBorder: Story = {
  args: {
    value: 'Hello World!',
    placeholder: 'text message...',
    maxLength: 20,
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

    return <CountTextField {...args} value={value} onChange={handleChange} />;
  },
};
