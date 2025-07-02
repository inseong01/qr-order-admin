import React from 'react';

const TabTableHeader = () => {
  const handleDefaultZoneClick = () => {};

  return (
    <header className="tabTableHeader">
      <nav>
        <a onClick={handleDefaultZoneClick}>기본 구역</a>
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

export default TabTableHeader;
