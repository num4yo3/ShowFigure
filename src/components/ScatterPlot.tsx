import { AddPosR, pickDataRange } from "./DataRange";
import { Symbol } from "./MarkerList";

type position = {
  x: number;
  y: number;
};
type params = {
  pos: position;
  posR: position;
};

type dataset = {
  data: position[];
  name: string;
  symbol: string;
  color: string;
};

type moddataset = {
  data: params[];
  name: string;
  symbol: string;
  color: string;
};

const Scatter = (props: { data: params; symbol: string; color: string }) => {
  const { data, symbol, color } = props;
  const defaultStyle: { [key: string]: string } = {
    position: "absolute",
    left: data.posR.x * 100 + "%",
    bottom: data.posR.y * 100 + "%"
  };

  return (
    <div style={{ ...defaultStyle }}>
      <Symbol symbol={symbol} color={color} />
    </div>
  );
};

export const Plot = (props: { dataset: moddataset }) => {
  const { dataset } = props;
  const symbol = dataset.symbol;
  const color = dataset.color;
  return (
    <>
      {dataset.data.map((item, index) => (
        <Scatter key={index} data={item} symbol={symbol} color={color} />
      ))}
    </>
  );
};

export const ScatterPlots = (props: {
  dataset: dataset[];
  range: { x: { min: number; max: number }; y: { min: number; max: number } };
}) => {
  const { dataset, range } = props;
  const dataRange = pickDataRange(dataset.map((item) => item.data));
  const modData = dataset.map((item) => ({
    data: AddPosR(item.data, dataRange),
    name: item.name,
    symbol: item.symbol,
    color: item.color
  }));

  const xAxis = range.x;
  const yAxis = range.y;

  //プロットの大きさを軸に合わせて調整
  const dWidth = dataRange.x.max - dataRange.x.min;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = xAxis.max - xAxis.min;
  const aHeight = yAxis.max - yAxis.min;

  const adjustPlot = {
    top: -((dataRange.y.max - yAxis.max) / aHeight) * 100 + "%",
    left: ((dataRange.x.min - xAxis.min) / aWidth) * 100 + "%",
    width: (dWidth / aWidth) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%"
  };

  return (
    <div style={{ position: "relative", ...adjustPlot }}>
      {modData.map((value, index) => (
        <Plot key={index} dataset={value} />
      ))}
    </div>
  );
};
