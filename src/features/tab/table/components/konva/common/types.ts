type Line = {
  points: number[];
};

type Bottom = {
  y: number;
  line: Line;
  priceText: {
    width: number;
  };
};

export type TableMeta = {
  x: number;
  y: number;
  rec: {
    width: number;
    height: number;
  };
  tableText: {
    width: number;
  };
  bottom: Bottom;
};
