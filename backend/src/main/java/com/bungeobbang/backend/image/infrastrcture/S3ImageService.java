package com.bungeobbang.backend.image.infrastrcture;

import com.bungeobbang.backend.common.exception.ImageException;
import com.bungeobbang.backend.image.domain.ImageFile;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.bungeobbang.backend.common.exception.ErrorCode.*;

/**
 * ✅ AWS S3 이미지 관리 서비스
 * <p>
 * - S3에 이미지 업로드 및 삭제 기능을 제공합니다.
 * - 비동기 처리를 통해 성능을 최적화합니다.
 */
@Service
@RequiredArgsConstructor
public class S3ImageService {

    private final S3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * ✅ 여러 개의 이미지를 비동기적으로 업로드
     *
     * @param images 업로드할 이미지 리스트
     * @return 업로드된 이미지의 파일명 리스트
     */
    public List<String> uploadImages(List<ImageFile> images) {
        List<CompletableFuture<String>> imageUploadsFutures = images.stream()
                .map(image -> CompletableFuture.supplyAsync(() -> uploadImage(image)))
                .toList();

        return imageUploadsFutures.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList());
    }

    /**
     * ✅ 여러 개의 이미지를 비동기적으로 삭제
     *
     * @param images 삭제할 이미지 파일명 리스트
     */
    public void deleteImages(List<String> images) {
        List<CompletableFuture<Void>> imageDeleteFutures = images.stream()
                .map(image -> CompletableFuture.runAsync(() -> deleteImage(image)))
                .toList();

        imageDeleteFutures.forEach(CompletableFuture::join);
    }

    /**
     * ✅ S3에서 단일 이미지 삭제
     *
     * @param fileName 삭제할 이미지 파일명
     */
    public void deleteImage(String fileName) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(fileName)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
        } catch (S3Exception e) {
            throw new ImageException(IMAGE_DELETE_FAIL);
        }
    }

    /**
     * ✅ S3에 단일 이미지 업로드
     *
     * @param image 업로드할 이미지 파일
     * @return 업로드된 이미지의 파일명
     */
    private String uploadImage(ImageFile image) {

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(image.getUuidName())
                .contentType(image.getContentType())
                .build();
        try {
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image.getInputStream().readAllBytes()));
        } catch (S3Exception e) {
            throw new ImageException(INVALID_IMG_PATH);
        } catch (IOException e) {
            throw new ImageException(IMAGE_UPLOAD_FAIL);
        }
        return image.getUuidName();
    }
}
