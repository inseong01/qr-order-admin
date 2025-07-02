import React from 'react';

type FooterProps = {
  activeTab: 'menu' | 'table' | 'order';
};

const Footer = ({ activeTab }: FooterProps) => {
  const handleMenuClick = () => {};
  const handleTableClick = () => {};
  const handleOrderClick = () => {};

  const getClassName = () => {
    switch (activeTab) {
      case 'menu':
        return 'tabMenuFooter';
      case 'table':
        return 'tabTableFooter';
      case 'order':
        return 'tabOrderFooter';
      default:
        return '';
    }
  };

  return (
    <footer className={getClassName()}>
      <button onClick={handleMenuClick}>메뉴</button>
      <button onClick={handleTableClick}>좌석</button>
      <button onClick={handleOrderClick}>주문내역</button>
    </footer>
  );
};

export default Footer;
