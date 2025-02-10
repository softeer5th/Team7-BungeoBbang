package com.bungeobbang.backend.image.service;


import com.bungeobbang.backend.common.exception.ImageException;
import com.bungeobbang.backend.image.domain.ImageFile;
import com.bungeobbang.backend.image.dto.response.ImageResponse;
import com.bungeobbang.backend.image.infrastrcture.S3ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.bungeobbang.backend.common.exception.ErrorCode.*;


@Service
@RequiredArgsConstructor
public class ImageService {
    private static final int MAX_IMAGE_LIST_SIZE = 10;
    private static final int EMPTY_IMAGE_LIST_SIZE = 0;
    private final S3ImageService s3ImageService;

    public ImageResponse save(List<MultipartFile> images) {
        validateSizeOfImages(images.size());
        List<ImageFile> imageFiles = images.stream()
                .map(ImageFile::new)
                .toList();
        List<String> imageNames = uploadImages(imageFiles);
        return new ImageResponse(imageNames);
    }

    public void delete(List<String> imageNames) {
        s3ImageService.deleteImages(imageNames);
    }

    private void validateSizeOfImages(int size) {
        if (size > MAX_IMAGE_LIST_SIZE)
            throw new ImageException(EXCEED_IMAGE_LIST_SIZE);
        if (size == EMPTY_IMAGE_LIST_SIZE)
            throw new ImageException(EMPTY_IMAGE_LIST);
    }

    private List<String> uploadImages(List<ImageFile> imageFiles) {
        List<String> imageNames = s3ImageService.uploadImages(imageFiles);
        if (imageFiles.size() != imageNames.size())
            throw new ImageException(INVALID_IMG_PATH);
        return imageNames;
    }
}
