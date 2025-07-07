import React from 'react';

const MenuWidget = () => {
  const handleClose = () => {};
  const handleAddCategory = () => {};
  const handleEditCategory = () => {};

  return (
    <div className="menuWidget">
      <button className="close" onClick={handleClose}>
        <div>
          <img src="" alt="icon" />
        </div>
        <span>닫기</span>
      </button>
      <ul>
        <li onClick={handleAddCategory}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>분류 추가</span>
        </li>
        <li onClick={handleEditCategory}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>분류 수정</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuWidget;