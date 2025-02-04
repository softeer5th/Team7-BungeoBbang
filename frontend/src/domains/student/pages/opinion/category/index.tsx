import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopAppBar } from '@/components/TopAppBar';
import { ChatSendField } from '@/components/Chat/ChatSendField';
import * as S from './styles';
import { OpinionStep } from './components/OpinionStep';
import { CategoryStep } from './components/CategoryStep';
import { ChatStep } from './components/ChatStep';

const OpinionCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOpinion, setSelectedOpinion] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const opinions = [
    { itemId: '1', text: '개선되면 좋겠어요' },
    { itemId: '2', text: '필요해요' },
    { itemId: '3', text: '제안할게요' },
    { itemId: '4', text: '궁금해요' },
    { itemId: '5', text: '힘들어요' },
    { itemId: '6', text: '피곤해요' },
  ];

  const categories = [
    { itemId: '1', text: '학사' },
    { itemId: '2', text: '시설 환경' },
    { itemId: '3', text: '예산' },
    { itemId: '4', text: '동아리' },
    { itemId: '5', text: '행사' },
    { itemId: '6', text: '정보 통신' },
  ];

  useEffect(() => {
    return () => {
      images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

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

  const handleSendMessage = () => {
    // 내용들 api 로 쏘고, chatroom 으로 navigate
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => {
      // 최대 5개까지만 허용
      const combined = [...prev, ...newImages];
      return combined.slice(0, 5);
    });
  };

  let currentStep;
  if (!selectedOpinion) {
    currentStep = <OpinionStep opinions={opinions} onOpinionSelect={handleOpinionSelect} />;
  } else if (!selectedCategory) {
    currentStep = (
      <CategoryStep
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedOpinion={selectedOpinion}
      />
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
    </S.Container>
  );
};

export default OpinionCategoryPage;
