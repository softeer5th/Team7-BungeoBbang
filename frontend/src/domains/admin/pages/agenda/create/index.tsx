import * as S from './styles';
import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '/src/assets/icons/arrow-left.svg?react';
import CameraIcon from '/src/assets/icons/camera.svg?react';
import DeleteIcon from '/src/assets/icons/close-2.svg?react';
import InfoIcon from '/src/assets/icons/information-circle-contained.svg?react';
import { CountTextField } from '@/components/text-field/CountTextField';
import { TextField } from '@/components/text-field/TextField';
import { ChatCategoryType } from '@/types/ChatCategoryType';
import BottomSheet from '@/components/BottomSheet';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { SubTitleText } from '../components/SubTitleText';
import { CategoryContent } from '../components/CategoryContent';
import { DurationContent } from '../components/DurationContent';

interface ChatCreateData {
  title: string;
  category: ChatCategoryType | null;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  images: string[];
}

const CreateAgendaPage = () => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  const theme = useTheme();
  const navigate = useNavigate();

  const [isCategoryBottomSheetOpen, setCategoryBottomSheetOpen] = useState(false);
  const [isDurationBottomSheetOpen, setDurationBottomSheetOpen] = useState(false);
  const [isValidate, setIsValidate] = useState(false);
  const [chatValue, setChatValue] = useState<ChatCreateData>({
    title: '',
    category: null,
    startDate: null,
    endDate: null,
    description: '',
    images: ['/src/assets/imgs/preview_img.png'],
  });

  function checkValidation(): boolean {
    const { title, category, startDate, endDate, description } = chatValue;
    return !!(title && category && startDate && endDate && description);
  }

  const handleImageUpload = async (files: FileList) => {
    const oversizedFiles = Array.from(files).filter((file) => file.size > MAX_FILE_SIZE);

    if (oversizedFiles.length > 0) {
      //   setShowDialog(true);
      return;
    }

    const uploadedUrls = await uploadImages(Array.from(files));
    setChatValue((prev: ChatCreateData) => {
      return { ...prev, images: uploadedUrls };
    });
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await api.post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.urls;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return [];
    }
  };

  async function submitChatValue() {
    try {
      const body = {
        title: chatValue.title,
        categoryType: chatValue.category?.type,
        startDate: chatValue.startDate?.toISOString().split('T')[0],
        endDate: chatValue.endDate?.toISOString().split('T')[0],
        content: chatValue.description,
        images: [],
      };

      await api.post('/admin/agendas', body);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  }

  useEffect(() => {
    setIsValidate(checkValidation());
  }, [chatValue]);

  return (
    <S.Container>
      <S.TopAppBar>
        <ArrowLeftIcon stroke={theme.colors.grayScale90} width="24px" height="24px" onClick = {() => navigate(-1)}/>
        <S.TitleWrapper>
          <S.TitleText variant="heading3">새 채팅방</S.TitleText>
        </S.TitleWrapper>
        <S.RegisterTextButton
          variant="heading3"
          textColor={isValidate ? theme.colors.sementicMain : theme.colors.grayScale40}
          onClick={() => {
            if (!isValidate) return;

            submitChatValue();
            navigate(-1);
          }}
        >
          등록
        </S.RegisterTextButton>
      </S.TopAppBar>
      <S.BodyContainer>
        <S.TitleContainer>
          <SubTitleText text="제목" />
          <CountTextField
            value={chatValue.title}
            maxLength={20}
            placeholder="의견을 받고 싶은 안건을 작성해주세요"
            onChange={(newTitle) =>
              setChatValue((prev: ChatCreateData) => ({ ...prev, title: newTitle }))
            }
          />
        </S.TitleContainer>

        <S.CategoryContainer>
          <SubTitleText text="카테고리" />
          <TextField
            value={chatValue.category?.label ?? ''}
            placeholder="카테고리를 선택해주세요"
            onClick={() => setCategoryBottomSheetOpen(true)}
          />
        </S.CategoryContainer>

        <S.DurationContainer>
          <SubTitleText text="기간 설정" />
          <TextField
            value={
              chatValue.startDate && chatValue.endDate
                ? `${formatDate(chatValue.startDate)} - ${formatDate(chatValue.endDate)}`
                : ''
            }
            placeholder="기간을 선택해주세요"
            onClick={() => setDurationBottomSheetOpen(true)}
          />
          <S.InfoTextContainer>
            <InfoIcon width="16px" height="16px" stroke={theme.colors.grayScale60} />
            <S.InfoText variant="caption2">
              설정한 날짜의 자정에 개설되며, 오늘 날짜는 즉시 개설됩니다.
            </S.InfoText>
          </S.InfoTextContainer>
        </S.DurationContainer>
        <SubTitleText text="내용" />
        <S.DescriptionContainer>
          <CountTextField
            rows={13}
            value={chatValue.description}
            maxLength={500}
            placeholder="내용을 입력해주세요."
            onChange={(newDescription) =>
              setChatValue((prev: ChatCreateData) => ({ ...prev, description: newDescription }))
            }
          />
        </S.DescriptionContainer>

        <S.ImageList>
          <S.ImageAddContainer>
            <CameraIcon
              width="32px"
              height="32px"
              fill={theme.colors.grayScale50}
              stroke={theme.colors.grayScale50}
            />
            <S.CountTextContainer>
              <S.CurrentImageCountText
                variant="heading4"
                textColor={
                  chatValue.images.length === 0
                    ? theme.colors.grayScale40
                    : theme.colors.sementicMain
                }
              >
                {chatValue.images.length}
              </S.CurrentImageCountText>
              <S.TotalImageCountText variant="heading4">/5</S.TotalImageCountText>
            </S.CountTextContainer>
            <S.HiddenFileInput
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  handleImageUpload(event.target.files);
                }
              }}
            />
          </S.ImageAddContainer>
          {chatValue.images.map((image) => {
            return (
              <S.ImageItem>
                <S.DeleteIconBox>
                  <DeleteIcon width="16px" height="16px" stroke={theme.colors.grayScaleWhite} />
                </S.DeleteIconBox>
                <S.ImageBox src={image}></S.ImageBox>
              </S.ImageItem>
            );
          })}
        </S.ImageList>
      </S.BodyContainer>

      {isCategoryBottomSheetOpen && (
        <BottomSheet
          onClose={() => {
            setCategoryBottomSheetOpen(false);
          }}
        >
          <CategoryContent
            selectedType={chatValue.category}
            onItemClick={(type: ChatCategoryType) => {
              setChatValue((prev) => ({ ...prev, category: type }));
              setCategoryBottomSheetOpen(false);
            }}
          />
        </BottomSheet>
      )}

      {isDurationBottomSheetOpen && (
        <BottomSheet
          onClose={() => {
            setDurationBottomSheetOpen(false);
          }}
        >
          <DurationContent
            currentDate={
              chatValue.startDate && chatValue.endDate && [chatValue.startDate, chatValue.endDate]
            }
            onDurationSelected={(start: Date, end: Date) => {
              setDurationBottomSheetOpen(false);
              setChatValue((prev: ChatCreateData) => ({ ...prev, startDate: start, endDate: end }));
            }}
          />
        </BottomSheet>
      )}
    </S.Container>
  );
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export default CreateAgendaPage;
