import React from 'react';

const TabOrderHeader = () => {
  const handleReceivedClick = () => {};
  const handleCompletedClick = () => {};

  return (
    <header className="tabOrderHeader">
      <nav>
        <a onClick={handleReceivedClick}>접수 0</a>
        <a onClick={handleCompletedClick}>완료 0</a>
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

export default TabOrderHeader;
