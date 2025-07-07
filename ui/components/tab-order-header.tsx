import React from 'react';

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

export default TabOrderHeader;