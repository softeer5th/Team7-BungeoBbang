export interface Chat {
  type: ChatType;
}

export interface ReceiveChatData extends Chat {
  chatId: string;
  memberId: number;
  name?: string;
  iconSrc?: string;
  iconBackgroundColor?: string;
  images?: string[];
  message: string;
  time: string;
  createdAt: string;
}

export interface SendChatData extends Chat {
  chatId: string;
  memberId: number;
  images?: string[];
  message: string;
  time: string;
  createdAt: string;
}

export interface InfoChatData extends Chat {
  message: string;
}

export interface MoreChatData extends Chat {
  text: string;
  iconSrc: string;
  onMoreClick: () => void;
}

export const ChatType = {
  RECEIVE: 'receive',
  SEND: 'send',
  INFO: 'info',
  MORE: 'more',
} as const;

export type ChatType = (typeof ChatType)[keyof typeof ChatType];

export type ChatData = ReceiveChatData | SendChatData | InfoChatData | MoreChatData;
