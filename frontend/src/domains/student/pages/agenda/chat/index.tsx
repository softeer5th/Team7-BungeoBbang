import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import ChatPage from './chat-page';

const AgendaChatPage = () => {
  // const MAX_CHAT_DATA = 10;
  const { roomId } = useParams();

  const [searchParams] = useSearchParams();

  const isEnd = searchParams.get('isEnd') === 'true';
  const isParticipate = searchParams.get('isParticipate') === 'true';
  const lastChatId = useLocation().state?.lastChatId;

  console.log('lastchat??', lastChatId);
  // const [chatData, setChatData] = useState<ChatData[]>([]);

  // const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>({
  //   title: '',
  //   adminName: '총학생회',
  // });

  // const lastUpChatId = useRef<string | null>(lastChatId);
  // const lastDownChatId = useRef<string | null>(lastChatId);
  // const isInitialLoading = useRef<boolean>(true);
  // const isUpDirection = useRef<boolean>(false);
  // const isLive = useRef<boolean>(false);

  // const { elementRef, scrollToTop, scrollToBottom, remainCurrentScroll } = useScroll<HTMLDivElement>();

  // const getInitialChatData = async () => {
  //   try {
  //     const [response, chatInfo] = await Promise.all([
  //       api.get(`/student/agendas/${roomId}/chat`, {
  //         params: {
  //           chatId: lastUpChatId.current,
  //           scroll: 'INITIAL',
  //         },
  //       }),
  //       api.get(`/student/agendas/${roomId}`),
  //     ]);
  //     console.log('responsesseee', response);
  //     const formattedData = formatChatData(response.data, false);
  //     setChatData(formattedData);
  //     setChatRoomInfo({
  //       title: chatInfo.data.title,
  //       adminName: chatInfo.data.adminName,
  //     });

  //     isInitialLoading.current = false;

  //   } catch (error) {
  //     console.error('fail to get chat data', error);
  //   }
  // };

  // const getMoreUpChatData = async () => {
  //   try {
  //     isUpDirection.current = true;
  //     const response = await api.get(`/student/agendas/${roomId}/chat`, {
  //       params: {
  //         chatId: lastUpChatId.current,
  //         scroll: 'UP',
  //       },
  //     });

  //     const formattedData = formatChatData(response.data, false);

  //     setChatData((prev: ChatData[]) => {
  //       if (response.data.length < MAX_CHAT_DATA) {
  //         setHasUpMore(false);
  //       }
  //       return [...formattedData, ...prev];
  //     });
  //   } catch (error) {
  //     console.error('fail to get chat data', error);
  //   }
  // };

  // const getMoreDownChatData = async () => {
  //   try {
  //     const response = await api.get(`/student/agendas/${roomId}/chat`, {
  //       params: {
  //         chatId: lastDownChatId.current,
  //         scroll: 'DOWN',
  //       },
  //     });

  //     const formattedData = formatChatData(response.data,false);

  //     setChatData((prev: ChatData[]) => {
  //       if (response.data.length < MAX_CHAT_DATA) {
  //         setHasDownMore(false);
  //       }
  //       return [...prev, ...formattedData];
  //     });
  //   } catch (error) {
  //     console.error('fail to get chat data', error);
  //   }
  // };

  // const { setTriggerUpItem, setTriggerDownItem, getHasDownMore, setHasUpMore, setHasDownMore } =
  //   useInfiniteScroll({
  //     initialFetch: getInitialChatData,
  //     fetchUpMore: getMoreUpChatData,
  //     fetchDownMore: getMoreDownChatData,
  //   });

  // useLayoutEffect(() => {
  //   // console.log('getchasdata', chatData);
  //   if (!elementRef.current )return;

  //   if(isInitialLoading.current) {
  //     elementRef.current.style.visibility = 'hidden'; // 숨기기
  //     scrollToTop();
  //     return;
  //   }

  //   // elementRef.current!.scrollTop = elementRef.current.scrollHeight;
  //   // return;
  //   if (isUpDirection.current === true) {
  //     // scrollToBottom();
  //   elementRef.current.style.visibility = 'hidden'; // 숨기기
  //     console.log("hide");

  //     remainCurrentScroll();

  //     isUpDirection.current = false;
  //     return;
  //   }

  //   // console.log('isLive', isLive);
  //   if (isLive.current) {
  //     elementRef.current.style.visibility = 'hidden'; // 숨기기
  //     // console.log("beforeeee", elementRef.current.scrollHeight);
  //     scrollToBottom();
  //     return;
  //   }

  //   // elementRef.current.style.visibility = 'visible';

  // }, [chatData]);

  // useEffect(() => {
  //    if (isLive.current) {
  //     // console.log("beforeeee", elementRef.current.scrollHeight);
  //     scrollToBottom();
  //   }
  // }, [chatData]);

  return (
    <ChatPage
      // ref = {elementRef}
      roomId={Number(roomId)}
      isEnd={isEnd}
      isParticipate={isParticipate}
      lastChatId={lastChatId}
      // chatData={chatData}
      // chatRoomInfo={chatRoomInfo}
    />
  );
};

export default AgendaChatPage;
