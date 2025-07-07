import React from 'react';

const TabOrderFooter = () => {
  const handleTabClick = (tab: string) => {};

  return (
    <footer className="tabOrderFooter">
      <nav>
        <ul>
          <li onClick={() => handleTabClick('menu')}>메뉴</li>
          <li onClick={() => handleTabClick('table')}>좌석</li>
          <li className="active" onClick={() => handleTabClick('order')}>
            주문
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default TabOrderFooter;