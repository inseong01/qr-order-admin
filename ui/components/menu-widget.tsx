import React from 'react';

const MenuWidget = () => {
  const handleClose = () => {};
  const handleAddCategory = () => {};
  const handleEditCategory = () => {};

  return (
    <div className="menuWidget">
      <button className="closeButton" onClick={handleClose}>
        <div>
          <img alt="close icon" />
        </div>
        <span>닫기</span>
      </button>
      <div className="category" onClick={handleAddCategory}>
        <div>
          <img alt="category icon" />
        </div>
        <span>분류 추가</span>
      </div>
      <div className="category" onClick={handleEditCategory}>
        <div>
          <img alt="category icon" />
        </div>
        <span>분류 수정</span>
      </div>
    </div>
  );
};

export default MenuWidget;
