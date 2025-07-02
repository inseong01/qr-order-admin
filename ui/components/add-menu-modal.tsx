import React, { useState } from 'react';

const AddMenuModal = () => {
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
  const handleClose = () => {};

  return (
    <form className="addMenuModal" onSubmit={handleSubmit}>
      <h1>음식 추가</h1>
      <button type="button" className="closeButton" onClick={handleClose}>
        X
      </button>
      <div>
        <label htmlFor="add-menu-thumbnail">사진 ��부</label>
        <input type="file" id="add-menu-thumbnail" onChange={handleThumbnailChange} />
      </div>
      <div>
        <label htmlFor="add-menu-title">음식명</label>
        <input type="text" id="add-menu-title" placeholder="음식명 1" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="add-menu-category">분류</label>
        <input
          type="text"
          id="add-menu-category"
          placeholder="분류 1"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>
      <div>
        <label htmlFor="add-menu-price">가격</label>
        <input type="text" id="add-menu-price" placeholder="가격" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <label htmlFor="add-menu-status">판매 상태</label>
        <input
          type="text"
          id="add-menu-status"
          placeholder="신규/인기/품절"
          value={status}
          onChange={handleStatusChange}
        />
      </div>
      <button type="submit">���가하기</button>
    </form>
  );
};

export default AddMenuModal;
