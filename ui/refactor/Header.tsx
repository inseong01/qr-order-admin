import React from 'react';
import Timer from './Util';

type HeaderProps = {
  type: 'menu' | 'table' | 'order';
};

const Header = ({ type }: HeaderProps) => {
  const handleMainMenuClick = () => {};
  const handleSideMenuClick = () => {};
  const handleBeverageMenuClick = () => {};
  const handleDefaultZoneClick = () => {};
  const handleReceivedClick = () => {};
  const handleCompletedClick = () => {};

  const renderNav = () => {
    switch (type) {
      case 'menu':
        return (
          <nav>
            <a onClick={handleMainMenuClick}>메인 메뉴</a>
            <a onClick={handleSideMenuClick}>사이드</a>
            <a onClick={handleBeverageMenuClick}>음료</a>
          </nav>
        );
      case 'table':
        return (
          <nav>
            <a onClick={handleDefaultZoneClick}>기본 구역</a>
          </nav>
        );
      case 'order':
        return (
          <nav>
            <a onClick={handleReceivedClick}>접수 0</a>
            <a onClick={handleCompletedClick}>완료 0</a>
          </nav>
        );
      default:
        return null;
    }
  };

  return (
    <header className={`tab${type.charAt(0).toUpperCase() + type.slice(1)}Header`}>
      {renderNav()}
      <Timer />
    </header>
  );
};

export default Header;
