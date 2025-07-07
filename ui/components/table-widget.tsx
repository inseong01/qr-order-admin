import React from 'react';

const TableWidget = () => {
  const handleClose = () => {};
  const handleCreateTable = () => {};
  const handleEditTable = () => {};
  const handleDeleteTable = () => {};

  return (
    <div className="tableWidget">
      <button className="close" onClick={handleClose}>
        <div>
          <img src="" alt="icon" />
        </div>
        <span>닫기</span>
      </button>
      <ul>
        <li onClick={handleCreateTable}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>좌석 생성</span>
        </li>
        <li onClick={handleEditTable}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>좌석 수정</span>
        </li>
        <li onClick={handleDeleteTable}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>좌석 삭제</span>
        </li>
      </ul>
    </div>
  );
};

export default TableWidget;