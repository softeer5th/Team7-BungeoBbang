package com.bungeobbang.backend.image.domain;

import lombok.Getter;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Getter
public class ImageFile {
    private static final String EXTENSION_DELIMITER = ".";

    private final MultipartFile image;
    private final String uuidName;

    public ImageFile(MultipartFile image) {
        this.image = image;
        uuidName = uuidName(image);
    }

    public String uuidName(MultipartFile image) {
        return UUID.randomUUID()
                + EXTENSION_DELIMITER
                + StringUtils.getFilenameExtension(image.getOriginalFilename());
    }

    public String getContentType() {
        return image.getContentType();
    }

    public long getSize() {
        return image.getSize();
    }

    public InputStream getInputStream() throws IOException {
        return image.getInputStream();
    }

}
