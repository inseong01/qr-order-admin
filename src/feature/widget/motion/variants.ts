/* widget button */
export const widgetBox = {
  clicked: {},
  notClicked: {},
};

export const topSpanBar = {
  clicked: {
    rotateZ: 45,
    y: 6,
  },
  notClicked: {
    rotateZ: 0,
    y: 0,
  },
};

export const middleSpanBar = {
  clicked: {
    opacity: 0,
  },
  notClicked: {
    opacity: 1,
  },
};

export const bottomSpanBar = {
  clicked: {
    rotateZ: -45,
    y: -7,
  },
  notClicked: {
    rotateZ: 0,
    y: 0,
  },
};

/* widget-categories */
export const categories = {
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

export const categoryMotion = {
  clicked: {
    y: 0,
    opacity: 1,
  },
  notClicked: {
    y: 10,
    opacity: 0,
  },
};

/* widget-option */
export const optionListMotion = {
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

export const optionMotion = {
  clicked: {
    x: 0,
    opacity: 1,
  },
  notClicked: {
    x: 10,
    opacity: 0,
  },
};
