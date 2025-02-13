import * as S from './styles';
import { useTheme } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useImageUpload } from '@/hooks/useImageUpload';
import { ImageFileSizeDialog } from '@/components/Dialog/ImageFileSizeDialog';
import { mapToChatCreateData } from '../util/ChatCreateMapper';

export interface ChatCreateData {
  roomId?: number | null;
  title: string;
  category: ChatCategoryType | null;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  images: string[];
}

const CreateAgendaPage = () => {
  const NEW_CHAT = '-1';

  const { roomId } = useParams(); // 모든 URL 파라미터 가져오기

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

  let previousImage: string[] = [];

  const { images, showSizeDialog, handleImageUpload, closeSizeDialog } = useImageUpload(10, 5);

  function checkValidation(): boolean {
    const { title, category, startDate, endDate, description } = chatValue;
    return !!(title && category && startDate && endDate && description);
  }

  const getPrevAgendaInfo = async () => {
    try {
      const response = await api.get(`/admin/agendas/${roomId}`);
      const data = mapToChatCreateData(response.data);
      setChatValue(data);
      previousImage = data.images;
    } catch (error) {
      console.error('failed to load previous chat room data', error);
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
        images: images,
      };

      await api.post('/admin/agendas', body);
      navigate(-1);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  }

  async function editChatValue() {
    try {
      const body = {
        title: chatValue.title,
        categoryType: chatValue.category?.type,
        content: chatValue.description,
        images: chatValue.images,
      };

      await api.patch(`/admin/agendas/${roomId}`, body);
    } catch (error) {
      console.error('Failed to send data:', error);
    }
  }

  useEffect(() => {
    setChatValue((prev) => ({
      ...prev,
      images: [...previousImage, ...images],
    }));
  }, [images]);

  useEffect(() => {
    if (roomId && roomId !== NEW_CHAT) {
      getPrevAgendaInfo();
    }
  }, []);

  useEffect(() => {
    setIsValidate(checkValidation());
  }, [chatValue]);

  return (
    <S.Container>
      <S.TopAppBar>
        <ArrowLeftIcon
          stroke={theme.colors.grayScale90}
          width="24px"
          height="24px"
          onClick={() => navigate(-1)}
        />
        <S.TitleWrapper>
          <S.TitleText variant="heading3">새 채팅방</S.TitleText>
        </S.TitleWrapper>
        <S.RegisterTextButton
          variant="heading3"
          textColor={isValidate ? theme.colors.sementicMain : theme.colors.grayScale40}
          onClick={() => {
            if (!isValidate) return;

            if (roomId === NEW_CHAT) {
              submitChatValue();
            } else {
              editChatValue();
            }

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
            disabled={roomId !== NEW_CHAT}
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

        <S.ImageContainer>
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
          <S.ImageList>
            {chatValue.images.map((image, index) => {
              return (
                <S.ImageItem>
                  <S.DeleteIconBox
                    onClick={() => {
                      setChatValue((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index), // ✅ 괄호 수정
                      }));
                    }}
                  >
                    <DeleteIcon width="16px" height="16px" stroke={theme.colors.grayScaleWhite} />
                  </S.DeleteIconBox>
                  <S.ImageBox
                    src={`https://temp-onu.s3.ap-northeast-2.amazonaws.com/${image}`}
                  ></S.ImageBox>
                </S.ImageItem>
              );
            })}
          </S.ImageList>
        </S.ImageContainer>
      </S.BodyContainer>

      <BottomSheet
        isOpen={isCategoryBottomSheetOpen}
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

      <BottomSheet
        isOpen={isDurationBottomSheetOpen}
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

      {showSizeDialog && (
        <ImageFileSizeDialog onConfirm={closeSizeDialog} onDismiss={closeSizeDialog} />
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
