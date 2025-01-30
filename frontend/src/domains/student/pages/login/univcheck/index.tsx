import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"

const universities = ["서울대학교", "연세대학교", "고려대학교", "성균관대학교", "한양대학교"]

const UniversitySelection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState<string>("")
  const navigate = useNavigate()

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university)
    setIsOpen(false)
  }

  const handleNext = () => {
    if (selectedUniversity) {
      navigate("/next-step") // 다음 단계로 이동
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>←</S.BackButton>
        <S.Title>재학중인 대학교를 선택해주세요.</S.Title>
        <S.Subtitle>제휴를 맺은 학교의 재학생만 가입할 수 있어요.</S.Subtitle>
      </S.Header>

      <S.SelectButton onClick={() => setIsOpen(true)}>{selectedUniversity || "대학교 선택"}</S.SelectButton>

      <S.BottomSheet isOpen={isOpen}>
        <S.BottomSheetHeader>
          <S.BottomSheetTitle>대학교 선택</S.BottomSheetTitle>
          <S.CloseButton onClick={() => setIsOpen(false)}>×</S.CloseButton>
        </S.BottomSheetHeader>
        <S.UniversityList>
          {universities.map((university) => (
            <S.UniversityItem key={university} onClick={() => handleUniversitySelect(university)}>
              {university}
            </S.UniversityItem>
          ))}
        </S.UniversityList>
      </S.BottomSheet>

      <S.NextButton disabled={!selectedUniversity} onClick={handleNext}>
        다음
      </S.NextButton>
    </S.Container>
  )
}

export default UniversitySelection
