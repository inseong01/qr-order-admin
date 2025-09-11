import { useAtomValue, useSetAtom } from 'jotai';

import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';

import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import styles from './../index.module.css';
import { MenuImageInputProps } from '../types';
import {
  imageFileAtom,
  imageFileErrorAtom,
  imageLoadedStateAtom,
  ImageLoadedStateType,
  setImageLoadedAtom,
} from '../store/atom';
import { SUPABASE_STORAGE_BASE_URL } from '../const';

export function MenuImageInput({ mode, imageUrl = '', onChange }: MenuImageInputProps) {
  const menuImage = useAtomValue(imageFileAtom);
  const imageLoadedState = useAtomValue(imageLoadedStateAtom);
  const imageFileError = useAtomValue(imageFileErrorAtom);
  const setImageLoaded = useSetAtom(setImageLoadedAtom);

  const handleImgLoad = (state: ImageLoadedStateType) => {
    return () => setImageLoaded(state);
  };

  return (
    <label className={styles.imgInput} htmlFor='img_url'>
      <span className={styles.inputTitle}>{mode === 'create' ? '사진 첨부' : '사진 변경'}</span>

      <div className={styles.imgBox}>
        {mode === 'update' ? (
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
        ) : (
          <>
            <div className={styles.iconBox}>
              <img src={LIGHT_PICTURE_ICON} alt='사진 아이콘' />
            </div>

            <AttachmentStatus attached={!!menuImage} />
          </>
        )}
      </div>

      <input
        type='file'
        id='img_url'
        name='img_url'
        hidden
        onChange={onChange}
        accept='image/png, image/jpeg, image/webp'
      />

      <FormInputCaption hasError={Boolean(imageFileError)} text={imageFileError} />
    </label>
  );
}

function ImageStatus({ state }: { state: 'pending' | 'success' | 'rejected' }) {
  if (state === 'pending') return <p>이미지 불러오는 중...</p>;
  if (state === 'rejected') return <p>이미지를 불러오지 못했습니다.</p>;
  return null;
}

function AttachmentStatus({ attached }: { attached: boolean }) {
  return <span>{attached ? '첨부되었습니다.' : '사진을 첨부해주세요'}</span>;
}
