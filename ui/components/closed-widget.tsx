import React from 'react';

const ClosedWidget = () => {
  const handleClick = () => {};

  return (
    <div className="closedWidget">
      <button onClick={handleClick}>
        <div>
          <img src="" alt="icon" />
        </div>
        <span>열기</span>
      </button>
    </div>
  );
};

export default ClosedWidget;