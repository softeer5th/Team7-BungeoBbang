import { useState } from 'react';
import api from '@/utils/api';
import { AUTH_CONFIG } from '@/config/auth';
import imageCompression from 'browser-image-compression';

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

  const convertHeicToJpeg = async (file: File): Promise<File> => {
    if (file.type === 'image/heic' || file.type === 'image/heif') {
      try {
        const heic2any = (await import('heic2any')).default;
        const jpegBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        });

        // Blob[] 타입 처리
        const finalBlob = Array.isArray(jpegBlob) ? jpegBlob[0] : jpegBlob;

        return new File([finalBlob], file.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg',
        });
      } catch (error) {
        console.error('HEIC 변환 실패:', error);
        return file;
      }
    }
    return file;
  };

  const compressImage = async (file: File): Promise<File> => {
    try {
      // HEIC/HEIF 형식 변환
      const convertedFile = await convertHeicToJpeg(file);

      // 이미지 압축 옵션
      const options = {
        maxSizeMB: maxSize,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
        fileType: 'image/jpeg',
      };

      return await imageCompression(convertedFile, options);
    } catch (error) {
      console.error('이미지 압축 실패:', error);
      return file;
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();

    try {
      // 이미지 변환 및 압축 처리
      const processedFiles = await Promise.all(
        files.map(async (file) => {
          console.log('원본 파일 정보:', {
            name: file.name,
            type: file.type,
            size: file.size,
          });
          const processed = await compressImage(file);
          console.log('처리된 파일 정보:', {
            name: processed.name,
            type: processed.type,
            size: processed.size,
          });
          return processed;
        }),
      );

      processedFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrls = response.data.names.map(
        (name: string) => `${AUTH_CONFIG.API.S3_URL}/${name}`,
      );

      console.log('이미지 업로드 성공:', imageUrls);
      return imageUrls;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return [];
    }
  };

  const handleImageDelete = (index: number) => {
    index === -1 ? setImages([]) : setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (files: FileList) => {
    try {
      const fileArray = Array.from(files);
      console.log(
        '업로드 시도하는 파일들:',
        fileArray.map((f) => ({
          name: f.name,
          type: f.type,
          size: f.size,
        })),
      );

      const oversizedFiles = fileArray.filter((file) => file.size > maxSize * 1024 * 1024);

      if (oversizedFiles.length > 0) {
        setShowSizeDialog(true);
        return;
      }

      const uploadedUrls = await uploadImages(fileArray);
      setImages((prev) => {
        const combined = [...prev, ...uploadedUrls];
        return combined.slice(0, maxCount);
      });
    } catch (error) {
      console.error('이미지 업로드 처리 중 에러:', error);
    }
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
