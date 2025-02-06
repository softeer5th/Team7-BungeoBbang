import { useState, useEffect } from 'react';
import { ChevronLeft } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import api from '@/utils/api';

interface University {
  id: number;
  name: string;
  domain: string;
}
const UniversitySelection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [universityObject, setUniversityObject] = useState<University[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchUniversities = async () => {
      try {
        const response = await api.get('/api/universities');
        setUniversityObject(response.data);
      } catch (error) {
        alert(
          (error as { response?: { data: { message: string } } }).response?.data.message ||
            '대학교 정보를 불러오는데 실패했습니다. 다시 시도해주세요.',
        );

        navigate('/');
      }
    };

    FetchUniversities();
  }, [navigate]);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setIsOpen(false);
  };

  const handleNext = () => {
    if (selectedUniversity) {
      navigate('/email', {
        state: {
          university: selectedUniversity,
        },
      });
    }
  };

  return (
    <S.Container>
      <S.BackButton onClick={() => navigate(-1)}>
        <ChevronLeft size={24} color="#000" />
      </S.BackButton>
      <S.Title>재학중인 대학교를 선택해주세요.</S.Title>
      <S.Subtitle>제휴를 맺은 학교의 재학생만 가입할 수 있어요.</S.Subtitle>

      <S.SelectButton onClick={() => setIsOpen(true)}>
        {selectedUniversity?.name || '대학교 선택'}
      </S.SelectButton>

      {isOpen && (
        <S.Overlay onClick={() => setIsOpen(false)}>
          <S.BottomSheet
            isOpen={isOpen}
            onClick={(e) => e.stopPropagation()} // 바텀시트 내부 클릭 막기
          >
            <S.BottomSheetHeader>
              <S.BottomSheetTitle>대학교를 선택해주세요</S.BottomSheetTitle>
            </S.BottomSheetHeader>
            <S.UniversityList>
              {universityObject.map((university) => (
                <S.UniversityItem
                  key={university.id}
                  onClick={() => handleUniversitySelect(university)}
                  selected={selectedUniversity?.id === university.id}
                >
                  {university.name}
                </S.UniversityItem>
              ))}
            </S.UniversityList>
          </S.BottomSheet>
        </S.Overlay>
      )}

      <S.NextButton disabled={!selectedUniversity} onClick={handleNext}>
        다음
      </S.NextButton>
    </S.Container>
  );
};
export default UniversitySelection;
