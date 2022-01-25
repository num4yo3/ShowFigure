import { PlotCandle } from "./Candle";
import moment from "moment";
type position = { x: number; y: number; xsize: number; ysize: number };

type candle = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

type data = {
  Date: string;
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

export const makeTickListCandle = (props: {
  dataset: data[];
  tick?: number;
}) => {
  const { dataset, tick } = props;
  const size = dataset.length;
  const dtick = tick || 1;
  const tickList = dataset
    .filter((item, index) => {
      return index % dtick === 0;
    })
    .map((item, index) => ({
      value: item.Date,
      posR: (index / size) * dtick
    }));
  return tickList;
};

export const HorizontalTickForDate = (props: {
  data: { value: string; posR: number };
  format: string;
  rotate?: number;
}) => {
  const { data, format, rotate } = props;
  const deg = rotate ? rotate : 0;
  const offset = rotate ? Math.sin((Math.abs(rotate) / 360) * 3.14) : 0;
  const defstyle = {
    position: "absolute",
    left: (data.posR - 0.0) * 100 + "%",
    textAlign: "center",
    whiteSpace: "nowrap",
    width: "4rem",
    height: "1rem",
    fontSize: "0.6rem",
    fontWeight: "bold",
    color: "rgb(100, 100, 100)",
    transform: `translateX(-2rem) translateY(${
      2 * offset
    }rem) rotate(${deg}deg)`,
    transformOrigin: "2rem 0.5rem"
  };
  return <div style={{ ...defstyle }}>{moment(data.value).format(format)}</div>;
};

export const DataRange = (data: data[]) => {
  const xmax = Math.max(
    ...data.map((item) => Number(moment(item.Date).format("X")))
  );
  const xmin = Math.min(
    ...data.map((item) => Number(moment(item.Date).format("X")))
  );
  const ymax = Math.max(...data.map((item) => item.High));
  const ymin = Math.min(...data.map((item) => item.Low));
  return { x: { min: xmin, max: xmax }, y: { min: ymin, max: ymax } };
};

export const AddPosR = (data: data[], range: range, spacer?: number) => {
  const xWidth: number = data.length;
  const yWidth: number = range.y.max - range.y.min;
  const modData: { data: candle; posR: position }[] = data.map(
    (item, index) => ({
      data: item,
      posR: {
        x: index / xWidth,
        y: 1 - (item.High - range.y.min) / yWidth,
        xsize: 1 / xWidth,
        ysize: (item.High - item.Low) / yWidth
      }
    })
  );

  return modData;
};

export const CandleChart = (props: {
  dataset: data[];
  range: {
    x: { duration: number; tick?: number; label?: string };
    y: { min: number; max: number; tick: number; label: string };
  };
}) => {
  const { dataset, range } = props;
  const dataRange: range = DataRange(dataset);
  const modData: { data: candle; posR: position }[] = AddPosR(
    dataset,
    dataRange
  );
  const yAxis = range.y;

  // プロットの大きさを軸に合わせて調整;
  const dWidth = dataset.length;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = range.x.duration;
  const aHeight = yAxis.max - yAxis.min;
  const adjustPlot = {
    top: -((dataRange.y.max - yAxis.max) / aHeight) * 100 + "%",
    right: (dWidth / aWidth - 1) * 75 + "%",
    width: (dWidth / (aWidth * 1.25)) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%"
  };
  const tickList = makeTickListCandle({ dataset: dataset, tick: range.x.tick });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%"
        // overflow: "hidden"
      }}
    >
      <div style={{ position: "relative", ...adjustPlot }}>
        <PlotCandle dataset={modData} colorType={0} />
        <div style={{ position: "relative", display: "flex", top: "107%" }}>
          {tickList.map((item, index) => (
            <HorizontalTickForDate
              key={index}
              data={item}
              format="'YY MMM DD"
              rotate={-70}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
