import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
// import { ChangeEvent } from "react";
import { ChatSendField } from '@/components/Chat/ChatSendField';

const chatSendFieldMeta: Meta<typeof ChatSendField> = {
  title: 'Components/Chat/ChatSendField',
  component: ChatSendField,
  argTypes: {
    backgroundColor: { control: 'color' },
    textFieldBackgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    placeholderColor: { control: 'color' },
    sendButtonBackgroundColor: { control: 'color' },
    imageButtonBackgroundColor: { control: 'color' },
    sendDisabled: { control: 'boolean' },
    imageDisabled: { control: 'boolean' },
    maxLengthOfImages: { control: 'number' },
  },
  args: {
    placeholder: '메시지를 입력하세요...',
    disabledPlaceHolder: '텍스트를 입력할 수 없습니다.',
    maxLength: 500,
    backgroundColor: '#FFFFFF',
    textFieldBackgroundColor: '#FFFFFF',
    textFieldDisabledBackgroundColor: '#F4F4F4',
    sendButtonBackgroundColor: '#1F87FF',
    sendButtonDisabledBackgroundColor: '#E0E0E0',
    sendButtonIconColor: '#FFFFFF',
    sendButtonDisabledIconColor: '#F4F4F4',
    imageButtonBackgroundColor: '#E0E0E0',
    imageButtonDisabledBackgroundColor: '#E0E0E0',
    imageButtonIconColor: '#8D8D8D',
    imageButtonDisabledIconColor: '#F4F4F4',
    placeholderColor: '#1F87FF',
    disabledPlaceholderColor: '#C6C6C6',
    textColor: '#262626',
    disabledTextColor: '#C6C6C6',
  },
  tags: ['autodocs'],
};

export default chatSendFieldMeta;
type ChatSendFieldStory = StoryObj<typeof ChatSendField>;

const images = [
  'https://picsum.photos/300/200',
  'https://picsum.photos/300/200',
  'https://picsum.photos/300/200',
];

export const ChatDefault: ChatSendFieldStory = {
  args: {
    sendDisabled: false,
    imageDisabled: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleTextChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    return <ChatSendField {...args} initialText={value} onChange={handleTextChange} />;
  },
};

// ✅ 이미지가 포함된 입력 필드
export const WithImages: ChatSendFieldStory = {
  args: {
    placeholder: '메시지를 입력하세요...',
    sendDisabled: false,
    imageDisabled: false,
    images: images,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleTextChange = (newValue: string) => {
      updateArgs({ ...args, value: newValue });
    };

    const handleImageDelete = (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      updateArgs({ ...args, images: newImages });
    };

    return (
      <ChatSendField
        {...args}
        initialText={value}
        onChange={handleTextChange}
        onImageDelete={handleImageDelete}
      />
    );
  },
};

// ✅ 비활성화된 입력 필드
export const AllDisabled: ChatSendFieldStory = {
  args: {
    placeholder: '텍스트를 입력할 수 없습니다.',
    textDisabled: true,
    sendDisabled: true,
    imageDisabled: true,
  },
};
