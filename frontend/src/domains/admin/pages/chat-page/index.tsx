import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import {
  ChatData,
  ChatType,
  InfoChatData,
  // MoreChatData,
  ReceiveChatData,
  SendChatData,
} from './ChatData.tsx';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
// import { getDefaultBorderStyle } from '@/components/border/getBorderType.tsx';
// import { BorderType } from '@/components/border/BorderProps.tsx';

interface ChatPageProps {
  chatData: ChatData[];
  chatRoomInfo: ChatRoomInfo;
  onUpLastItemChange?: (lastItemRef: HTMLDivElement, lastItemId: string) => void;
  onDownLastItemChange?: (lastItemRef: HTMLDivElement, lastItemId: string) => void;
}

export interface ChatRoomInfo {
  title: string;
  adminName: string;
}

const ChatPage = forwardRef<HTMLDivElement, ChatPageProps>(
  (
    { chatData, chatRoomInfo, onUpLastItemChange = () => {}, onDownLastItemChange = () => {} },
    ref,
  ) => {
    const navigate = useNavigate();

    const FIRST_REMAIN_ITEMS = 1;
    const LAST_REMAIN_ITEMS = 3;

    let upLastItemId: string = '';
    let downLatItemId: string = '';

    return (
      <S.Container>
        <TopAppBar
          leftIconSrc="/src/assets/icons/arrow-left.svg"
          title={chatRoomInfo.title}
          rightIconSrc="/src/assets/icons/information-circle-contained.svg"
          onLeftIconClick={() => {
            navigate(-1);
          }}
          onRightIconClick={() => {}}
        />
        <S.ChatList ref={ref}>
          {chatData.map((chat, chatIndex) => {
            const isUpTriggerItem = chatIndex === FIRST_REMAIN_ITEMS;
            const isDownTriggerItem = chatIndex === chatData.length - LAST_REMAIN_ITEMS;

            // console.log('chat', chat, isUpTriggerItem, isDownTriggerItem);
            if (chat.type === ChatType.RECEIVE) {
              const chatData = chat as ReceiveChatData;
              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLatItemId = chatData.chatId;

              return (
                <ReceiverChat
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem
                      ? (el) => {
                          if (el) {
                            onUpLastItemChange(el, upLastItemId);
                          }
                        }
                      : isDownTriggerItem
                        ? (el) => {
                            if (el) {
                              onDownLastItemChange(el, downLatItemId);
                            }
                          }
                        : null
                  }
                  receiverName={chatData.name}
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                />
              );
            } else if (chat.type === ChatType.SEND) {
              const chatData = chat as SendChatData;
              if (upLastItemId.length === 0) upLastItemId = chatData.chatId;
              downLatItemId = chatData.chatId;

              return (
                <SenderChat
                  chatId={chatData.chatId}
                  ref={
                    isUpTriggerItem
                      ? (el) => {
                          if (el) {
                            onUpLastItemChange(el, upLastItemId);
                          }
                        }
                      : isDownTriggerItem
                        ? (el) => {
                            if (el) {
                              onDownLastItemChange(el, downLatItemId);
                            }
                          }
                        : null
                  }
                  message={chatData.message}
                  images={chatData.images}
                  timeText={chatData.time}
                />
              );
            } else if (chat.type === ChatType.INFO) {
              const chatData = chat as InfoChatData;
              return <TextBadge text={chatData.message} />;
            }
            return null;
          })}
        </S.ChatList>

        <ChatSendField />
      </S.Container>
    );
  },
);

export default ChatPage;
