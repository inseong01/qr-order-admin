import { useAtomValue, useSetAtom } from 'jotai';

import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';

import { FormInputCaption } from '@/components/ui/exception';

import styles from './index.module.css';
import { AttachmentStatus, ImageStatus } from './common';
import { CreateImageInputProps, MenuImageInputProps, UpdateImageInputProps } from '../../types';
import {
  imageFileAtom,
  imageFileErrorAtom,
  imageLoadedStateAtom,
  ImageLoadedStateType,
  setImageLoadedAtom,
} from '../../store/atom';
import { SUPABASE_STORAGE_BASE_URL } from '../../const';

export function MenuImageInput({ mode, imageUrl = '', onChange }: MenuImageInputProps) {
  const menuImage = useAtomValue(imageFileAtom);
  const imageFileError = useAtomValue(imageFileErrorAtom);

  return (
    <label className={styles.imgInput} htmlFor='img_url'>
      {/* 중앙 제목 */}
      <span className={styles.inputTitle}>{mode === 'create' ? '사진 첨부' : '사진 변경'}</span>

      {/* 이미지 출력창 */}
      <div className={styles.imgBox}>
        {mode === 'create' ? (
          <CreateImageInput menuImage={menuImage} />
        ) : (
          <UpdateImageInput imageUrl={imageUrl} menuImage={menuImage} />
        )}
      </div>

      {/* 숨겨진 이미지 입력창 */}
      <input
        type='file'
        id='img_url'
        name='img_url'
        hidden
        onChange={onChange}
        accept='image/png, image/jpeg, image/webp'
      />

      {/* 이미지 입력 오류창 */}
      <FormInputCaption hasError={Boolean(imageFileError)} text={imageFileError} />
    </label>
  );
}

function CreateImageInput({ menuImage }: CreateImageInputProps) {
  return (
    <>
      <div className={styles.iconBox}>
        <img src={LIGHT_PICTURE_ICON} alt='사진 아이콘' />
      </div>

      <AttachmentStatus attached={!!menuImage} />
    </>
  );
}

function UpdateImageInput({ imageUrl, menuImage }: UpdateImageInputProps) {
  const imageLoadedState = useAtomValue(imageLoadedStateAtom);
  const setImageLoaded = useSetAtom(setImageLoadedAtom);

  const handleImgLoad = (state: ImageLoadedStateType) => {
    return () => setImageLoaded(state);
  };

  return (
    <>
      <img
        src={`${SUPABASE_STORAGE_BASE_URL}/${imageUrl}`}
        alt='음식 섬네일'
        onLoad={handleImgLoad('success')}
        onError={handleImgLoad('rejected')}
        hidden={imageLoadedState !== 'success' || Boolean(menuImage)}
      />

      {menuImage ? <AttachmentStatus attached /> : <ImageStatus state={imageLoadedState} />}
    </>
  );
}
