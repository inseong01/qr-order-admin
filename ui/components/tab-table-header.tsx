import React from 'react';

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

export default TabTableHeader;