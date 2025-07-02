import React from 'react';

const ListMenu = () => {
  const handleClick = () => {};

  return (
    <div className="listMenu" onClick={handleClick}>
      <span>음식 1</span>
      <span className="price">10,000원</span>
    </div>
  );
};

export default ListMenu;
