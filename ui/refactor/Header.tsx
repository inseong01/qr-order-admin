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

const TabOrderHeader = () => {
  const handleCategoryClick = (category: string) => {};

  return (
    <header className="tabOrderHeader">
      <nav>
        <ul>
          <li onClick={() => handleCategoryClick('received')}>접수</li>
          <li onClick={() => handleCategoryClick('completed')}>완료</li>
        </ul>
      </nav>
      <div className="status">
        <span>2024.11.22. 오후 17:38</span>
        <span>접속 상태</span>
      </div>
    </header>
  );
};

const TabTableHeader = () => {
  const handleCategoryClick = (category: string) => {};

  return (
    <header className="tabTableHeader">
      <nav>
        <ul>
          <li onClick={() => handleCategoryClick('all')}>전체</li>
        </ul>
      </nav>
      <div className="status">
        <span>2024.11.22. 오후 17:38</span>
        <span>접속 상태</span>
      </div>
    </header>
  );
};

export { TabMenuHeader, TabOrderHeader, TabTableHeader };