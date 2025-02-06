import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { ChatSendField } from '@/components/Chat/ChatSendField';
import * as S from './styles';
import { OpinionStep } from './components/OpinionStep';
import { CategoryStep } from './components/CategoryStep';
import { ChatStep } from './components/ChatStep';
import api from '@/utils/api';
import { Dialog } from '@/components/Dialog';

const OpinionCategoryPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedOpinion, setSelectedOpinion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

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
    console.log('전송할 데이터:', messageData);

    try {
      const response = await api.post('/student/opinions', messageData);
      console.log('메시지 전송 결과', response);
      const opinionId = response.data.opinionId;
      response.status === 200 && navigate('/opinion/chat/' + opinionId);
    } catch (error) {
      console.error('메시지 전송 실패', error);
      navigate('/opinion/chat/' + opinionId);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (files: FileList) => {
    // 파일 크기 체크
    const oversizedFiles = Array.from(files).filter((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length > 0) {
      setShowDialog(true);
      return;
    }

    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => {
      const combined = [...prev, ...newImages];
      return combined.slice(0, 5);
    });
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
      {showDialog && (
        <Dialog
          body="10MB 이하의 이미지만 업로드할 수 있습니다."
          onConfirm={() => setShowDialog(false)}
          onDismiss={() => setShowDialog(false)}
          confirmButton={{
            text: '확인',
            children: '확인',
            backgroundColor: '#1F87FF',
            textColor: '#FFFFFF',
          }}
        />
      )}
    </S.Container>
  );
};

export default OpinionCategoryPage;
