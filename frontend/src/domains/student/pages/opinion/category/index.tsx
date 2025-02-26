import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { ChatSendField } from '@/components/Chat/ChatSendField';
import * as S from './styles';
import { OpinionStep } from './components/OpinionStep';
import { CategoryStep } from './components/CategoryStep';
import { ChatStep } from './components/ChatStep';
import api from '@/utils/api';
import { useSocketManager } from '@/hooks/useSocketManager';
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog';
import { Dialog } from '@/components/Dialog/Dialog';

import { ChatOpinionType } from '@/types/ChatOpinionType';
import { useCacheStore } from '@/store/cacheStore';

const OpinionCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const socketManager = useSocketManager();

  const [selectedOpinion, setSelectedOpinion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showProfanityDialog, setShowProfanityDialog] = useState(false);

  const { images, showSizeDialog, handleImageDelete, handleImageUpload, closeSizeDialog } =
    useImageUpload(10, 5);

  const handleBack = () => {
    !selectedOpinion ? navigate(-1) : setSelectedOpinion('');
    setSelectedCategory('');
    setSelectedOpinion('');
  };

  const handleOpinionSelect = (chipId: string) => {
    setSelectedOpinion(chipId);
  };

  const handleCategorySelect = (chipId: string) => {
    setSelectedCategory(chipId);
  };

  const handleSendMessage = async () => {
    const messageData = {
      opinionType: selectedOpinion,
      categoryType: selectedCategory,
      content: message,
      images: images,
    };

    try {
      const response = await api.post('/student/opinions', messageData);
      if (response.data.opinionId) {
        socketManager('OPINION', 'START', response.data.opinionId, 'STUDENT');
        const invalidateQueries = useCacheStore.getState().invalidateQueries;
        invalidateQueries('admin-opinions');
        invalidateQueries('my-opinions');
        navigate('/opinion/chat/' + response.data.opinionId, {
          state: {
            from: 'opinion',
            title: ChatOpinionType[selectedOpinion as keyof typeof ChatOpinionType].label,
          },
        });
      }
    } catch (error: any) {
      console.error('메시지 전송 실패:', error);
      if (error.response?.status === 400) {
        setShowProfanityDialog(true);
      }
    }
  };

  let currentStep;
  if (!selectedOpinion) {
    currentStep = <OpinionStep onOpinionSelect={handleOpinionSelect} />;
  } else if (!selectedCategory) {
    currentStep = (
      <CategoryStep onCategorySelect={handleCategorySelect} selectedOpinion={selectedOpinion} />
    );
  } else {
    currentStep = <ChatStep />;
  }

  return (
    <S.Container>
      <TopAppBar
        leftIconSrc="/src/assets/icons/arrow-left.svg"
        onLeftIconClick={handleBack}
        backgroundColor="#FFFFFF"
      />

      {currentStep}

      <ChatSendField
        initialText={message}
        onChange={setMessage}
        onSendMessage={handleSendMessage}
        images={images}
        onImageDelete={handleImageDelete}
        onImageUpload={handleImageUpload}
        maxLength={500}
        sendDisabled={!selectedCategory}
        textDisabled={!selectedCategory}
        imageDisabled={!selectedCategory}
      />
      {showSizeDialog && (
        <ImageFileSizeDialog onConfirm={closeSizeDialog} onDismiss={closeSizeDialog} />
      )}
      {showProfanityDialog && (
        <Dialog
          body="금칙어가 포함되어 있습니다."
          onConfirm={() => setShowProfanityDialog(false)}
          onDismiss={() => {}}
          confirmButton={{
            text: '확인',
            backgroundColor: '#1F87FF',
            textColor: '#FFFFFF',
          }}
        />
      )}
    </S.Container>
  );
};

export default OpinionCategoryPage;
