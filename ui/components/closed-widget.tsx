import React from 'react';

const ClosedWidget = () => {
  const handleClick = () => {};

  return (
    <button className="closedWidget" onClick={handleClick}>
      <span>열기</span>
      <div>
        <img alt="open icon" />
      </div>
    </button>
  );
};

export default ClosedWidget;
