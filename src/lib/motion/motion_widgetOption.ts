// 위젯 메뉴 옵션

export const optionList = {
  clicked: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  notClicked: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

export const option = {
  clicked: {
    x: 0,
    opacity: 1,
  },
  notClicked: {
    x: 10,
    opacity: 0,
  },
};