import React from 'react';

const AddMenu = () => {
  const handleClick = () => {};

  return (
    <div className="addMenu" onClick={handleClick}>
      <span>상품 추가</span>
      <div>
        <img alt="add icon" />
      </div>
    </div>
  );
};

export default AddMenu;
