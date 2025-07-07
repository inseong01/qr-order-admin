import React from 'react';

const ConfirmAlert = () => {
  const handleConfirm = () => {};
  const handleCancel = () => {};

  return (
    <div className="confirmAlert">
      <p>삭제하시겠습니까?</p>
      <div>
        <button onClick={handleCancel}>아니요</button>
        <button onClick={handleConfirm}>예</button>
      </div>
    </div>
  );
};

export default ConfirmAlert;