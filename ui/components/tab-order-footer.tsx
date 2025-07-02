import React from 'react';

const TabOrderFooter = () => {
  const handleMenuClick = () => {};
  const handleTableClick = () => {};
  const handleOrderClick = () => {};

  return (
    <footer className="tabOrderFooter">
      <button onClick={handleMenuClick}>메뉴</button>
      <button onClick={handleTableClick}>좌석</button>
      <button onClick={handleOrderClick}>주문내역</button>
    </footer>
  );
};

export default TabOrderFooter;
