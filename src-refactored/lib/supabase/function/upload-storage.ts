import supabase from '..';

/**
 * 이미지를 스토리지에 업로드하는 함수
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지 url
 */
export const uploadImage = async (file: File) => {
  const { data, error } = await supabase.storage.from('images').upload(`menu/${file.name}`, file);
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data.path;
};
