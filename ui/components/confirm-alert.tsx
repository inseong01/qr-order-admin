import React from 'react';

const ConfirmAlert = () => {
  const handleConfirm = () => {};
  const handleCancel = () => {};

  return (
    <div className="confirmAlert">
      <div className="top">
        <span>삭제하시겠습니까?</span>
      </div>
      <div className="bottom">
        <button className="left" onClick={handleCancel}>
          아니요
        </button>
        <button className="right" onClick={handleConfirm}>
          예
        </button>
      </div>
    </div>
  );
};

export default ConfirmAlert;
