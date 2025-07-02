import React, { useState } from 'react';

const EditMenuModal = () => {
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
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {};
  const handleDelete = () => {};
  const handleClose = () => {};

  return (
    <form className="editMenuModal" onSubmit={handleUpdate}>
      <h1>음식 수정</h1>
      <button type="button" className="closeButton" onClick={handleClose}>
        X
      </button>
      <div>
        <label htmlFor="edit-menu-thumbnail">사진 첨부</label>
        <input type="file" id="edit-menu-thumbnail" onChange={handleThumbnailChange} />
      </div>
      <div>
        <label htmlFor="edit-menu-title">음식명</label>
        <input type="text" id="edit-menu-title" placeholder="음식명 1" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="edit-menu-category">분류</label>
        <input
          type="text"
          id="edit-menu-category"
          placeholder="분류 1"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div>
        <label htmlFor="edit-menu-price">가격</label>
        <input type="text" id="edit-menu-price" placeholder="가격" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <label htmlFor="edit-menu-status">판매 상태</label>
        <input
          type="text"
          id="edit-menu-status"
          placeholder="신규/인기/품절"
          value={status}
          onChange={handleStatusChange}
        />
      </div>
      <button type="button" className="deleteButton" onClick={handleDelete}>
        삭제하기
      </button>
      <button type="submit" className="updateButton">
        수정하기
      </button>
    </form>
  );
};

export default EditMenuModal;
