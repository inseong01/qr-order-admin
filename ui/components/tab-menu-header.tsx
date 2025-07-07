import React from 'react';

const TabMenuHeader = () => {
  const handleCategoryClick = (category: string) => {};

  return (
    <header className="tabMenuHeader">
      <nav>
        <ul>
          <li onClick={() => handleCategoryClick('main')}>메인 메뉴</li>
          <li onClick={() => handleCategoryClick('side')}>사이드</li>
          <li onClick={() => handleCategoryClick('drink')}>음료</li>
        </ul>
      </nav>
      <div className="status">
        <span>2024.11.22. 오후 17:38</span>
        <span>접속 상태</span>
      </div>
    </header>
  );
};

export default TabMenuHeader;