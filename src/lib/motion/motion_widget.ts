// 위젯 

export const iconBoxVariant = {
  clicked: {},
  notClicked: {},
};

export const firstSpanVariant = {
  clicked: {
    rotateZ: 45,
    y: 6,
  },
  notClicked: {
    rotateZ: 0,
    y: 0,
  },
};

export const middleSpanVariant = {
  clicked: {
    opacity: 0,
  },
  notClicked: {
    opacity: 1,
  },
};

export const lastSpanVariant = {
  clicked: {
    rotateZ: -45,
    y: -7,
  },
  notClicked: {
    rotateZ: 0,
    y: 0,
  },
};
