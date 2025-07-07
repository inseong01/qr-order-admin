import React from 'react';

const OrderCard = () => {
  const handleComplete = () => {};

  return (
    <div className="orderCard">
      <div className="header">
        <span className="orderNumber"># 3</span>
        <span className="time">00:00</span>
        <span className="elapsed">00분 경과</span>
        <span className="table">테이블 1</span>
      </div>
      <div className="main">
        <ul>
          <li>
            <span>메뉴 1</span>
            <span>x 1</span>
          </li>
          <li>
            <span>메뉴 1</span>
            <span>x 1</span>
          </li>
          <li>
            <span>메뉴 1</span>
            <span>x 1</span>
          </li>
          <li>
            <span>메뉴 1</span>
            <span>x 1</span>
          </li>
        </ul>
      </div>
      <div className="footer">
        <button onClick={handleComplete}>조리완료</button>
      </div>
    </div>
  );
};

export default OrderCard;
