import React from 'react';

const Timer = () => {
  return (
    <div className="timer">
      <span>2024.11.22. 오후 17:38</span>
      <div className="network">
        <span>접속 상태</span>
        <div>
          <img alt="network icon" />
        </div>
      </div>
    </div>
  );
};

export default Timer;
