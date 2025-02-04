package com.bungeobbang.backend.agenda.dto.request;

import com.bungeobbang.backend.common.type.CategoryType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record AgendaCreationRequest(
        @NotBlank(message = "제목은 공백일 수 없습니다.")
        @Size(max = 20, message = "제목은 최대 20글자까지 입력할 수 있습니다.")
        String title,

        @NotNull(message = "카테고리는 필수 입력입니다.")
        CategoryType categoryType,

        @NotNull(message = "시작 날짜는 필수 입력입니다.")
        LocalDate startDate,

        @NotNull(message = "종료 날짜는 필수 입력입니다.")
        LocalDate endDate,

        @NotBlank(message = "내용은 공백일 수 없습니다.")
        @Size(max = 500, message = "내용은 최대 500글자까지 입력할 수 있습니다.")
        String content,

        @Size(max = 5, message = "이미지는 최대 5개까지 첨부할 수 있습니다.")
        List<String> images
) {
}
