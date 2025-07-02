import React, { useState } from 'react';

type WidgetProps = {
  type: 'menu' | 'table';
};

const Widget = ({ type }: WidgetProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleAddCategory = () => {};
  const handleEditCategory = () => {};

  const handleCreateTable = () => {};
  const handleEditTable = () => {};
  const handleDeleteTable = () => {};

  if (!isOpen) {
    return (
      <button className="closedWidget" onClick={handleOpen}>
        <span>열기</span>
        <div>
          <img alt="open icon" />
        </div>
      </button>
    );
  }

  if (type === 'menu') {
    return (
      <div className="menuWidget">
        <button className="closeButton" onClick={handleClose}>
          <div>
            <img alt="close icon" />
          </div>
          <span>닫기</span>
        </button>
        <div className="category" onClick={handleAddCategory}>
          <div>
            <img alt="category icon" />
          </div>
          <span>분류 추가</span>
        </div>
        <div className="category" onClick={handleEditCategory}>
          <div>
            <img alt="category icon" />
          </div>
          <span>분류 수정</span>
        </div>
      </div>
    );
  }

  if (type === 'table') {
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
  }

  return null;
};

export default Widget;
