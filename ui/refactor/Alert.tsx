import React from 'react';

type AlertProps = {
  type: 'confirm' | 'modal' | 'table';
};

const Alert = ({ type }: AlertProps) => {
  const handleConfirm = () => {};
  const handleCancel = () => {};

  if (type === 'confirm') {
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
  }

  if (type === 'modal') {
    return (
      <div className="modalAlert">
        <span>추가되었습니다.</span>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="tableAlert">
        <div className="list1">
          <div className="top">
            <span>테이블 1</span>
          </div>
          <div className="bottom">
            <span>요청사항: 물 n개, 앞치마 n개, 직원호출</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Alert;
