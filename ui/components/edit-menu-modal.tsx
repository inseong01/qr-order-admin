import React from 'react';

const EditMenuModal = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClose = () => {};
  const handleDelete = () => {};

  return (
    <form className="editMenuModal" onSubmit={handleSubmit}>
      <h2>음식 수정</h2>
      <button type="button" className="close" onClick={handleClose}>
        X
      </button>
      <div>
        <label htmlFor="thumbnail">사진 첨부</label>
        <input type="file" id="thumbnail" />
      </div>
      <div>
        <label htmlFor="foodName">음식명</label>
        <input type="text" id="foodName" defaultValue="음식명 1" />
      </div>
      <div>
        <label htmlFor="category">분류</label>
        <select id="category">
          <option>분류 1</option>
        </select>
      </div>
      <div>
        <label htmlFor="price">가격</label>
        <input type="text" id="price" defaultValue="가격" />
      </div>
      <div>
        <label htmlFor="status">판매 상태</label>
        <select id="status">
          <option>신규</option>
          <option>인기</option>
          <option>품절</option>
        </select>
      </div>
      <button type="button" onClick={handleDelete}>
        삭제하기
      </button>
      <button type="submit">수정하기</button>
    </form>
  );
};

export default EditMenuModal;