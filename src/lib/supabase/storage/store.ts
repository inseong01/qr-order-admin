import supabase from '..';

export const BUCKET = 'qr-order-img';
export const STORE = 'store_2';

type GetImageByFileNameProps = {
  fileName: string;
};

/**
 * Supabase 스토리지에서 이미지 공개 URL 가져오는 함수
 */
function getImageByFileName({ fileName }: GetImageByFileNameProps) {
  const itemPath = `${BUCKET}/${fileName}`;
  return supabase.storage.from(BUCKET).getPublicUrl(itemPath);
}

type UploadImageByFileNameProps = {
  file: File;
  fileId: string;
};

/**
 * Supabase 스토리지에 이미지를 업로드 하는 함수
 */
function uploadImage({ file, fileId }: UploadImageByFileNameProps) {
  return supabase.storage.from(BUCKET).upload(STORE + '/menu_' + fileId, file);
}

type UpdateImageByFileNameProps = {
  file: File;
  fileId: string;
};

/**
 * Supabase 스토리지에 이미지를 업데이트 하는 함수
 */
function updateImage({ file, fileId }: UpdateImageByFileNameProps) {
  return supabase.storage.from(BUCKET).update(STORE + '/menu_' + fileId, file);
}

type DeleteImageByFileNameProps = {
  fileId: string;
};

/**
 * Supabase 스토리지에서 하나 이상의 이미지 삭제 함수
 */
function deleteImageByFileName({ fileId }: DeleteImageByFileNameProps) {
  const filePath = STORE + `/menu_${fileId}`;
  return supabase.storage.from(BUCKET).remove([filePath]);
}

export { getImageByFileName, uploadImage, updateImage, deleteImageByFileName };
