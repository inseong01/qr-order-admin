import React from 'react';

type MenuProps = {
  type: 'add' | 'list';
};

const Menu = ({ type }: MenuProps) => {
  const handleClick = () => {};

  if (type === 'add') {
    return (
      <div className="addMenu" onClick={handleClick}>
        <span>상품 추가</span>
        <div>
          <img alt="add icon" />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="listMenu" onClick={handleClick}>
        <span>음식 1</span>
        <span className="price">10,000원</span>
      </div>
    );
  }

  return null;
};

export default Menu;
