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

const ModalAlert = () => {
  return (
    <div className="modalAlert">
      <p>추가되었습니다.</p>
    </div>
  );
};

const TableAlert = () => {
  return (
    <div className="tableAlert">
      <div className="detailed">
        <h3>테이블 1</h3>
        <p>요청사항: 물 n개, 앞치마 n개, 직원호출</p>
      </div>
    </div>
  );
};

export { ConfirmAlert, ModalAlert, TableAlert };