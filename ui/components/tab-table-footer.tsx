import React from 'react';

const TabTableFooter = () => {
  const handleTabClick = (tab: string) => {};

  return (
    <footer className="tabTableFooter">
      <nav>
        <ul>
          <li onClick={() => handleTabClick('menu')}>메뉴</li>
          <li className="active" onClick={() => handleTabClick('table')}>
            좌석
          </li>
          <li onClick={() => handleTabClick('order')}>주문</li>
        </ul>
      </nav>
    </footer>
  );
};

export default TabTableFooter;