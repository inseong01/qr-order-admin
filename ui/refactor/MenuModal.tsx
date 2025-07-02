import React, { useState } from 'react';

type MenuModalProps = {
  isEditMode: boolean;
};

const MenuModal = ({ isEditMode }: MenuModalProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  const handleDelete = () => {};
  const handleClose = () => {};

  const idPrefix = isEditMode ? 'edit-menu' : 'add-menu';

  return (
    <form className={isEditMode ? 'editMenuModal' : 'addMenuModal'} onSubmit={handleSubmit}>
      <h1>{isEditMode ? '음식 수정' : '음식 추가'}</h1>
      <button type="button" className="closeButton" onClick={handleClose}>
        X
      </button>
      <div>
        <label htmlFor={`${idPrefix}-thumbnail`}>사진 첨부</label>
        <input type="file" id={`${idPrefix}-thumbnail`} onChange={handleThumbnailChange} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-title`}>음식명</label>
        <input
          type="text"
          id={`${idPrefix}-title`}
          placeholder="음식명 1"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-category`}>분류</label>
        <input
          type="text"
          id={`${idPrefix}-category`}
          placeholder="분류 1"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-price`}>가격</label>
        <input
          type="text"
          id={`${idPrefix}-price`}
          placeholder="가격"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-status`}>판매 상태</label>
        <input
          type="text"
          id={`${idPrefix}-status`}
          placeholder="신규/인기/품절"
          value={status}
          onChange={handleStatusChange}
        />
      </div>
      {isEditMode ? (
        <>
          <button type="button" className="deleteButton" onClick={handleDelete}>
            삭제하기
          </button>
          <button type="submit" className="updateButton">
            수정하기
          </button>
        </>
      ) : (
        <button type="submit">추가하기</button>
      )}
    </form>
  );
};

export default MenuModal;
