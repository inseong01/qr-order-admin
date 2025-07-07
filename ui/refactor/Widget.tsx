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

const MenuWidget = () => {
  const handleClose = () => {};
  const handleAddCategory = () => {};
  const handleEditCategory = () => {};

  return (
    <div className="menuWidget">
      <button className="close" onClick={handleClose}>
        <div>
          <img src="" alt="icon" />
        </div>
        <span>닫기</span>
      </button>
      <ul>
        <li onClick={handleAddCategory}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>분류 추가</span>
        </li>
        <li onClick={handleEditCategory}>
          <div>
            <img src="" alt="icon" />
          </div>
          <span>분류 수정</span>
        </li>
      </ul>
    </div>
  );
};

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
          <span>좌석 삭��</span>
        </li>
      </ul>
    </div>
  );
};

export { ClosedWidget, MenuWidget, TableWidget };