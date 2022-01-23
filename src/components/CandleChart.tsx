import { PlotCandle } from "./Candle";

type position = { x: number; y: number };

type candle = {
  Date: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

type data = {
  Date: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

type range = {
  x: { min: number; max: number };
  y: { min: number; max: number };
};

export const DataRange = (data: data[]) => {
  const xmax = Math.max(...data.map((item) => item.Date));
  const xmin = Math.min(...data.map((item) => item.Date));
  const ymax = Math.max(...data.map((item) => item.High));
  const ymin = Math.min(...data.map((item) => item.Low));
  return { x: { min: xmin, max: xmax }, y: { min: ymin, max: ymax } };
};

export const AddPosR = (data: data[], range: range) => {
  const xWidth: number = range.x.max - range.x.min;
  const yWidth: number = range.y.max - range.y.min;
  const modData: { data: candle; posR: position }[] = data.map((item) => ({
    data: item,
    posR: {
      x: (item.Date - range.x.min) / xWidth,
      y: (item.High - range.y.min) / yWidth
    }
  }));

  return modData;
};

export const CandleChart = (props: { dataset: data[]; range: range }) => {
  const { dataset, range } = props;
  const dataRange: range = DataRange(dataset);
  const modData: { data: candle; posR: position }[] = AddPosR(
    dataset,
    dataRange
  );
  console.log(modData);
  const xAxis = range.x;
  const yAxis = range.y;

  // プロットの大きさを軸に合わせて調整;
  const dWidth = dataRange.x.max - dataRange.x.min;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = xAxis.max - xAxis.min;
  const aHeight = yAxis.max - yAxis.min;

  const adjustPlot = {
    top: -((dataRange.y.max - yAxis.max) / aHeight) * 100 + "%",
    left: ((dataRange.x.min - xAxis.min) / aWidth) * 100 + "%",
    width: (dWidth / aWidth) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%",
    border: "solid 2px"
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        border: "dotted 2px"
      }}
    >
      <div style={{ position: "relative", ...adjustPlot }}>
        <PlotCandle dataset={modData} colorType={0} />
      </div>
    </div>
  );
};
