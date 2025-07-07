import React from 'react';

const TabMenuFooter = () => {
  const handleTabClick = (tab: string) => {};

  return (
    <footer className="tabMenuFooter">
      <nav>
        <ul>
          <li className="active" onClick={() => handleTabClick('menu')}>
            메뉴
          </li>
          <li onClick={() => handleTabClick('table')}>좌석</li>
          <li onClick={() => handleTabClick('order')}>주문</li>
        </ul>
      </nav>
    </footer>
  );
};

export default TabMenuFooter;