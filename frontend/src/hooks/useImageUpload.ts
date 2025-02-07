// src/hooks/useImageUpload.ts
import { useState } from 'react';
import api from '@/utils/api';

interface UseImageUploadReturn {
  images: string[];
  showSizeDialog: boolean;
  handleImageDelete: (index: number) => void;
  handleImageUpload: (files: FileList) => Promise<void>;
  closeSizeDialog: () => void;
}

export const useImageUpload = (
  maxSize: number = 10,
  maxCount: number = 5,
): UseImageUploadReturn => {
  const [images, setImages] = useState<string[]>([]);
  const [showSizeDialog, setShowSizeDialog] = useState(false);

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

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
    showSizeDialog,
    handleImageDelete,
    handleImageUpload,
    closeSizeDialog,
  };
};
