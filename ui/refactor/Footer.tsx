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

export { TabMenuFooter, TabOrderFooter, TabTableFooter };