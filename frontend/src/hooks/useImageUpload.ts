import { useState } from 'react';
import api from '@/utils/api';
import { AUTH_CONFIG } from '@/config/auth';

interface UseImageUploadReturn {
  images: string[];
  setInitialImages: (images: string[]) => void;
  showSizeDialog: boolean;
  handleImageDelete: (index: number) => void;
  handleImageUpload: (files: FileList) => Promise<void>;
  closeSizeDialog: () => void;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  fileName: string;
}

export const useImageUpload = (
  maxSize: number = 10,
  maxCount: number = 5,
): UseImageUploadReturn => {
  const [images, setImages] = useState<string[]>([]);
  const [showSizeDialog, setShowSizeDialog] = useState(false);

  const setInitialImages = (newImages: string[]) => {
    setImages(newImages);
  };

  const getSignedUrl = async (file: File): Promise<PresignedUrlResponse> => {
    const response = await api.post('/api/images/presigned', {
      contentType: file.type,
    });
    return response.data;
  };

  const uploadToS3 = async (file: File, signedUrl: string) => {
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: { 'Content-Type': file.type },
    });
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        try {
          const { presignedUrl, fileName } = await getSignedUrl(file);
          await uploadToS3(file, presignedUrl);

          return `${AUTH_CONFIG.API.S3_URL}/${fileName}`;
        } catch (error) {
          console.error(`파일 업로드 실패: ${file.name}`, error);
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);

      const successfulUploads = results.filter((url): url is string => url !== null);

      console.log('이미지 업로드 성공:', successfulUploads);
      return successfulUploads;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return [];
    }
  };

  const handleImageDelete = (index: number) => {
    index === -1 ? setImages([]) : setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (files: FileList) => {
    const oversizedFiles = Array.from(files).filter((file) => file.size > maxSize * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      setShowSizeDialog(true);
      return;
    }

    const uploadedUrls = await uploadImages(Array.from(files));
    setImages((prev) => {
      const combined = [...prev, ...uploadedUrls];
      return combined.slice(0, maxCount);
    });
  };

  const closeSizeDialog = () => setShowSizeDialog(false);

  return {
    images,
    setInitialImages,
    showSizeDialog,
    handleImageDelete,
    handleImageUpload,
    closeSizeDialog,
  };
};
