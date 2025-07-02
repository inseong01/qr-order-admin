import React from 'react';

const TableWidget = () => {
  const handleClose = () => {};
  const handleCreateTable = () => {};
  const handleEditTable = () => {};
  const handleDeleteTable = () => {};

  return (
    <div className="tableWidget">
      <button className="closeButton" onClick={handleClose}>
        <div>
          <img alt="close icon" />
        </div>
        <span>닫기</span>
      </button>
      <div className="category" onClick={handleCreateTable}>
        <div>
          <img alt="category icon" />
        </div>
        <span>좌석 생성</span>
      </div>
      <div className="category" onClick={handleEditTable}>
        <div>
          <img alt="category icon" />
        </div>
        <span>좌석 수정</span>
      </div>
      <div className="category" onClick={handleDeleteTable}>
        <div>
          <img alt="category icon" />
        </div>
        <span>좌석 삭제</span>
      </div>
    </div>
  );
};

export default TableWidget;
