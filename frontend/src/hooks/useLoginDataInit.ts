// src/hooks/useLoginDataInit.ts
import { useEffect } from 'react';
import api from '@/utils/api';
import { useCacheStore } from '@/store/cacheStore';
import { useAlarmStore } from '@/store/alarmStore';
import {
  OpinionServerData,
  AgendaServerData,
  mapOpinionResponseToChatPreviewData,
  mapAgendaResponseToChatPreviewData,
} from '@/domains/student/pages/my/util/AgendaChatRoomMapper';
import { ChatPreviewData } from '@/domains/student/pages/my/data/ChatPreviewData';

export const useLoginDataInit = () => {
  const setCache = useCacheStore((state) => state.setCache);
  const setHasNewMessage = useAlarmStore((state) => state.setHasNewMessage);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // My Opinions 데이터 가져오기
        const opinionsResponse = await api.get('/student/opinions/my');
        const myOpinions = opinionsResponse.data.map((data: OpinionServerData) =>
          mapOpinionResponseToChatPreviewData(data),
        );

        // My Agendas 데이터 가져오기
        const agendasResponse = await api.get('/student/agendas/my');
        const myAgendas = agendasResponse.data.map((data: AgendaServerData) =>
          mapAgendaResponseToChatPreviewData(data),
        );

        // 캐시에 데이터 저장 (5분 유효)
        setCache('my-opinions', myOpinions, 5 * 60 * 1000);
        setCache('my-agendas', myAgendas, 5 * 60 * 1000);

        // 새 메시지 알림 상태 설정
        const hasNewChat =
          myOpinions.some((opinion: ChatPreviewData) => opinion.hasNewChat) ||
          myAgendas.some((agenda: ChatPreviewData) => agenda.hasNewChat);

        setHasNewMessage(hasNewChat);
      } catch (error) {
        console.error('초기 데이터 로딩 중 오류 발생:', error);
      }
    };

    fetchInitialData();
  }, [setCache, setHasNewMessage]);
};
