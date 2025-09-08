import { ChangeEvent } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { Menu } from '@/lib/supabase/tables/menu';
import LIGHT_PLUS_ICON from '@/assets/icon/light-plus.svg';
import LIGHT_PICTURE_ICON from '@/assets/icon/light-picture-icon.svg';
import { menuErrorFormAtom } from '@/components/ui/menu/store/atom';
import { FormInputBox, FormInputCaption } from '@/components/ui/exception';

import styles from './../index.module.css';
import { imageLoadedStateAtom, ImageLoadedStateType, setImageLoadedAtom } from '../store/atom';

type MenuModalHeaderProps = {
  title: string;
  onClose: () => void;
};

export function MenuModalHeader({ title, onClose }: MenuModalHeaderProps) {
  return (
    <div className={styles.header}>
      {/* 제목 */}
      <h2 className={styles.modalTitle}>{title}</h2>

      {/* 닫기 */}
      <button type='button' className={styles.close} onClick={onClose}>
        <img src={LIGHT_PLUS_ICON} alt='닫기' />
      </button>
    </div>
  );
}

type MenuImageInputProps = {
  mode: 'create' | 'update';
  imageUrl?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function MenuImageInput({ mode, imageUrl = '', onChange }: MenuImageInputProps) {
  const imageLoadedState = useAtomValue(imageLoadedStateAtom);
  const setImageLoaded = useSetAtom(setImageLoadedAtom);

  const handleImgLoad = (state: ImageLoadedStateType) => {
    return () => setImageLoaded(state);
  };

  return (
    <label className={styles.imgInput} htmlFor='img_url'>
      <span className={styles.inputTitle}>{mode === 'create' ? '사진 첨부' : '사진 변경'}</span>

      <div className={styles.imgBox}>
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt='음식 섬네일'
              onLoad={handleImgLoad('success')}
              onError={handleImgLoad('rejected')}
              hidden={imageLoadedState !== 'success'}
            />
            {/* TODO: 파일 첨부 여부 표시 */}
            {imageLoadedState === 'pending' && <p>이미지 불러오는 중...</p>}
            {imageLoadedState === 'rejected' && <p>이미지를 불러오지 못했습니다.</p>}
          </>
        ) : (
          <>
            <div className={styles.iconBox}>
              <img src={LIGHT_PICTURE_ICON} alt='사진 아이콘' />
            </div>

            <span>사진을 첨부해주세요</span>
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
    </label>
  );
}

type MenuFormFieldsProps = {
  inputValue: Menu;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  categories: { id: string; title: string }[] | undefined;
};

export function MenuFormFields({ inputValue, onInputChange, categories }: MenuFormFieldsProps) {
  const menuError = useAtomValue(menuErrorFormAtom);
  const nameErrorMsg = menuError.get('name') ?? '';
  const titleErrorMsg = menuError.get('title') ?? '';
  const priceErrorMsg = menuError.get('price') ?? '';
  const tagErrorMsg = menuError.get('tag') ?? '';

  return (
    <div className={styles.main}>
      {/* 음식명 */}
      <FormInputBox htmlFor='foodName'>
        <span className={styles.inputTitle}>음식명</span>

        <input
          type='text'
          id='foodName'
          placeholder='음식명을 입력해주세요.'
          name='name'
          onChange={onInputChange}
          value={inputValue.name}
          aria-invalid={Boolean(nameErrorMsg)}
          data-invalid={Boolean(nameErrorMsg)}
        />

        <FormInputCaption hasError={Boolean(nameErrorMsg)} text={nameErrorMsg} />
      </FormInputBox>

      {/* 분류 */}
      <FormInputBox htmlFor='category'>
        <span className={styles.inputTitle}>분류</span>

        <select
          className={styles.options}
          id='category'
          name='title'
          onChange={onInputChange}
          value={inputValue.menu_category.title}
          aria-invalid={Boolean(titleErrorMsg)}
          data-invalid={Boolean(titleErrorMsg)}
        >
          <option key={'default'} disabled>
            선택해주세요
          </option>

          {categories?.map(({ id, title }) => (
            <option key={id} value={title}>
              {title}
            </option>
          ))}
        </select>

        <FormInputCaption hasError={Boolean(titleErrorMsg)} text={titleErrorMsg} />
      </FormInputBox>

      {/* 가격 */}
      <FormInputBox htmlFor='price'>
        <span className={styles.inputTitle}>가격</span>

        <div className={styles.priceBox}>
          <input
            type='number'
            id='price'
            name='price'
            placeholder='가격을 입력해주세요.'
            onChange={onInputChange}
            value={inputValue.price}
            step={10}
            aria-invalid={Boolean(priceErrorMsg)}
            data-invalid={Boolean(priceErrorMsg)}
          />
          <span>원</span>
        </div>

        <FormInputCaption hasError={Boolean(priceErrorMsg)} text={priceErrorMsg} />
      </FormInputBox>
      {/* </label> */}

      {/* 판매 상태 */}
      <FormInputBox htmlFor='status'>
        <span className={styles.inputTitle}>판매 상태</span>

        <select
          className={styles.options}
          id='status'
          name='tag'
          onChange={onInputChange}
          value={inputValue.tag}
          aria-invalid={Boolean(tagErrorMsg)}
          data-invalid={Boolean(tagErrorMsg)}
        >
          <option value={'기본'}>기본</option>
          <option value={'신규'}>신규</option>
          <option value={'인기'}>인기</option>
          <option value={'품절'}>품절</option>
        </select>

        <FormInputCaption hasError={Boolean(tagErrorMsg)} text={tagErrorMsg} />
      </FormInputBox>
    </div>
  );
}
