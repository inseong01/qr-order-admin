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
async function uploadImage({ file, fileId }: UploadImageByFileNameProps) {
  const { data, error } = await supabase.storage.from(BUCKET).upload(STORE + '/menu_' + fileId, file);

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

type UpdateImageByFileNameProps = {
  file: File;
  fileId: string;
};

/**
 * Supabase 스토리지에 이미지를 업데이트 하는 함수
 */
async function updateImage({ file, fileId }: UpdateImageByFileNameProps) {
  const { data, error } = await supabase.storage.from(BUCKET).update(STORE + '/menu_' + fileId, file);

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}

type DeleteImageByFileNameProps = {
  filePath: string[];
};

/**
 * Supabase 스토리지에서 하나 이상의 이미지 삭제 함수
 */
async function deleteImageByFileName({ filePath }: DeleteImageByFileNameProps) {
  const { data, error } = await supabase.storage.from(BUCKET).remove(filePath);

  if (error) {
    error.message && console.error(error.message);
    throw new Error(error.message);
  }

  if (!data.length) {
    console.error('Delete failed: No images matched the condition.');
    throw new Error('Unable to delete the image.');
  }

  return data;
}

export { getImageByFileName, uploadImage, updateImage, deleteImageByFileName };
