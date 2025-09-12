import supabase from '..';
import { BUCKET, STORE } from './const';
import { DeleteImageByFileNameProps, UploadImageByFileNameProps } from './types';

/**
 * Supabase 스토리지에 이미지를 업로드 하는 함수
 */
async function uploadImage({ file, filename }: UploadImageByFileNameProps) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(`${STORE}/${filename}`, file, { contentType: file.type });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Supabase 스토리지에서 하나 이상의 이미지 삭제 함수
 *
 *  @param filenams [Bucket]/[folder]/filename 요소 배열 구성 유의
 */
async function deleteImageByFileName({ filenames }: DeleteImageByFileNameProps) {
  const { data, error } = await supabase.storage.from(BUCKET).remove(filenames);

  if (error) {
    throw error;
  }

  if (!data.length) {
    console.error('Delete failed: No images matched the condition.');
    throw new Error('Unable to delete the image.');
  }

  return data;
}

export { uploadImage, deleteImageByFileName };
