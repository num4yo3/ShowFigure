type position = {
  x: number;
  y: number;
};

type params = {
  pos: position /* 生データ */;
  posR: position /* 窓上での相対座標*/;
};

type range = {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
};

const pickRange = (
  poslist: position[],
  xRange?: { min?: number; max?: number },
  yRange?: { min?: number; max?: number }
) => {
  let list: position[] = poslist;
  if (xRange !== undefined) {
    if (xRange.min !== undefined)
      list = list.filter((pos) => pos.x >= xRange.min);

    if (xRange.max !== undefined)
      list = list.filter((pos) => pos.x <= xRange.max);
  }
  if (yRange !== undefined) {
    if (yRange.min !== undefined)
      list = list.filter((pos) => pos.y >= yRange.min);

    if (yRange.max !== undefined)
      list = list.filter((pos) => pos.y <= yRange.max);
  }
  return {
    x: {
      min: Math.min(...list.map((value) => value.x)),
      max: Math.max(...list.map((value) => value.x))
    },
    y: {
      min: Math.min(...list.map((value) => value.y)),
      max: Math.max(...list.map((value) => value.y))
    }
  };
};
// データの最小値, 最大値を返す
export const pickDataRange = (
  data: position[][],
  xRange?: { min?: number; max?: number },
  yRange?: { min?: number; max?: number }
) => {
  const range = data.map((item) => pickRange(item, xRange, yRange));
  return {
    x: {
      min: Math.min(...range.map((value) => value.x.min)),
      max: Math.max(...range.map((value) => value.x.max))
    },
    y: {
      min: Math.min(...range.map((value) => value.y.min)),
      max: Math.max(...range.map((value) => value.y.max))
    }
  };
};

// データ座標からプロット窓上での相対位置を計算
export const AddPosR = (data: position[], range: range) => {
  const xWidth: number = range.x.max - range.x.min;
  const yWidth: number = range.y.max - range.y.min;
  const modData: params[] = data.map((item) => ({
    pos: { x: item.x, y: item.y },
    posR: {
      x: (item.x - range.x.min) / xWidth,
      y: (item.y - range.y.min) / yWidth
    }
  }));

  return modData;
};
