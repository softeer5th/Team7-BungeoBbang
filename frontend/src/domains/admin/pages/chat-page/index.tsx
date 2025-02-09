import * as S from './styles.ts';
import { TopAppBar } from '@/components/TopAppBar';
import { useEffect, useState } from 'react';
import {
  ChatData,
  ChatType,
  InfoChatData,
  MoreChatData,
  ReceiveChatData,
  SendChatData,
} from './ChatData.tsx';
import { ChatSendField } from '@/components/Chat/ChatSendField.tsx';
import { ReceiverChat } from '@/components/Chat/ReceiverChat.tsx';
import { SenderChat } from '@/components/Chat/SenderChat.tsx';
import { TextBadge } from '@/components/Chat/TextBadge.tsx';
import MoreChatButton from './MoreChatButton.tsx';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  //   const roomId = useParams();

  const [chatData, setChatData] = useState<ChatData[]>([]);

  const navigate = useNavigate();

  const mockData: ChatData[] = [
    {
      type: ChatType.MORE,
      text: '이전 답변',
      iconSrc: '/src/assets/icons/arrow-up.svg',
      onMoreClick: () => {},
    },
    {
      type: ChatType.INFO,
      message: '2025.01.14 화요일',
    },
    {
      type: ChatType.RECEIVE,
      name: '00대학교 총학생회',
      images: [
        '/src/assets/imgs/preview_img.png',
        '/src/assets/imgs/preview_img.png',
        '/src/assets/imgs/preview_img.png',
      ],
      message: `[국제캠퍼스 생활 불편 관련 건의함 안내]

안녕하세요, 총학생회입니다.
국제캠퍼스에서 생활 중 불편한 점이나 개선이 필요한 부분에 대해 여러분의 소중한 의견을 듣고자 합니다. 생활 환경을 개선하기 위한 다양한 아이디어와 제안을 받습니다.
건의사항을 남기실 때는 불편한 점의 위치와 개선 방법을 함께 적어주시면, 보다 구체적이고 효과적인 개선 방안을 제시하는 데 도움이 됩니다.
[건의 방법]
불편한 점이 발생한 위치
개선을 위한 제안 및 방법
여러분의 의견은 총학생회의 활동에 반영되어 더 나은 캠퍼스를 만드는 데 큰 도움이 됩니다. 많은 참여 부탁드립니다. 감사합니다!
총학생회 드림`,
      time: '10:30',
    },
    {
      type: ChatType.RECEIVE,
      name: '00대학교 총학생회',
      message: `안녕하세요, 총학생회입니다.

A동의 불편 사항에 대해 검토를 완료했으며, 현재 관련 부서와 논의하여 구체적인 개선 방안을 마련하고 있습니다.

추가로 궁금한 점이나 건의사항이 있으시다면 언제든 말씀해 주세요!`,
      time: '14:10',
    },
    {
      type: ChatType.INFO,
      message: '2025.01.15 수요일',
    },
    {
      type: ChatType.SEND,
      images: [
        '/src/assets/imgs/preview_img.png',
        '/src/assets/imgs/preview_img.png',
        '/src/assets/imgs/preview_img.png',
      ],
      message: `안녕하세요, 학생회에 문의드릴 게 있습니다. 저는 셔틀버스를 자주 이용하는 학생인데요, `,
      time: '13:20',
    },
    {
      type: ChatType.RECEIVE,
      name: '00대학교 총학생회',
      message: `안녕하세요, 귀한 의견 감사드립니다. 

말씀 주신 기숙사에서 A역 또는 B역으로 가는 노선 추가 요청은 다른 학생들에게도 큰 도움이 될 수 있을 것 같아요. 곧 셔틀버스 운영 관련 의견을 수렴할 예정입니다.

 말씀하신 노선 추가 요청도 검토할 수 있도록 내부적으로 논의해 보겠습니다. 추가적으로 설문조사 등을 통해 의견을 더 모을 예정이니 많은 참여 부탁드립니다!`,
      time: '15:10',
    },
  ];

  useEffect(() => {
    setChatData(mockData);
  }, []);

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        title="총학생회 국제캠퍼스 생활 불편 건의함"
        rightIconSrc="/src/assets/icons/information-circle-contained.svg"
        onLeftIconClick={() => {
          navigate(-1);
        }}
        onRightIconClick={() => {}}
      />
      <S.ChatList>
        {chatData.map((chat) => {
          if (chat.type === ChatType.RECEIVE) {
            const chatData = chat as ReceiveChatData;
            return (
              <ReceiverChat
                receiverName={chatData.name}
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
              />
            );
          } else if (chat.type === ChatType.SEND) {
            const chatData = chat as SendChatData;
            return (
              <SenderChat
                message={chatData.message}
                images={chatData.images}
                timeText={chatData.time}
              />
            );
          } else if (chat.type === ChatType.INFO) {
            const chatData = chat as InfoChatData;
            return <TextBadge text={chatData.message} />;
          } else if (chat.type === ChatType.MORE) {
            const chatData = chat as MoreChatData;
            return (
              <MoreChatButton
                text={chatData.text}
                iconSrc={chatData.iconSrc}
                onClick={chatData.onMoreClick}
              />
            );
          }
          return null;
        })}
      </S.ChatList>

      <ChatSendField />
    </S.Container>
  );
};

export default ChatPage;
