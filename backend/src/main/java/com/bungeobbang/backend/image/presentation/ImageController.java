package com.bungeobbang.backend.image.presentation;

import com.bungeobbang.backend.image.dto.request.ImageDeleteRequest;
import com.bungeobbang.backend.image.dto.response.ImageResponse;
import com.bungeobbang.backend.image.service.ImageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @Operation(summary = "이미지 업로드")
    @PostMapping
    public ResponseEntity<ImageResponse> uploadImages(@RequestPart List<MultipartFile> images) {
        return ResponseEntity.ok(imageService.save(images));
    }

    @Operation(summary = "이미지 삭제")
    @DeleteMapping
    public ResponseEntity<Void> deleteImages(@RequestBody ImageDeleteRequest request) {
        imageService.delete(request.images());
        return ResponseEntity.noContent().build();
    }
}
