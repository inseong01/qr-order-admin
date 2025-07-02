import React from 'react';

const TabMenuHeader = () => {
  const handleMainMenuClick = () => {};
  const handleSideMenuClick = () => {};
  const handleBeverageMenuClick = () => {};

  return (
    <header className="tabMenuHeader">
      <nav>
        <a onClick={handleMainMenuClick}>메인 메뉴</a>
        <a onClick={handleSideMenuClick}>사이드</a>
        <a onClick={handleBeverageMenuClick}>음료</a>
      </nav>
      <div className="status">
        <span>2024.11.22. 오후 17:38</span>
        <div className="network">
          <span>접속 상태</span>
          <div>
            <img alt="network icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TabMenuHeader;
