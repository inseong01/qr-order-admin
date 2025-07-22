export const childMotion = {
  clicked: {
    y: 0,
    opacity: 1,
  },
  notClicked: {
    y: 10,
    opacity: 0,
  },
};

export const parentsMotion = {
  clicked: {
    transition: {
      staggerChildren: 0.05,
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
