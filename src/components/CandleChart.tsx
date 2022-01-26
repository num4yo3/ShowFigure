import { PlotCandle } from "./Candle";
import moment from "moment";
import { HorizontalGuide } from "./SetAxis";
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
  min: number;
  max: number;
};

export const makeTickListForDate = (props: {
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

export const SetAxisForDate = (props: {
  tickList: { value: string; posR: number }[];
  format?: string;
  rotate?: number;
  offset: { top: string; right: string; width: string; height: string };
}) => {
  const { tickList, format, rotate, offset } = props;
  return (
    <div style={{ position: "relative", ...offset }}>
      {tickList.map((item, index) => (
        <HorizontalTickForDate
          key={index}
          data={item}
          format={format ? format : "'YY MMM DD"}
          rotate={rotate}
        />
      ))}
    </div>
  );
};
export const SetGuideForDate = (props: {
  tickList: { value: string; posR: number }[];
  offset: {
    top: string;
    right: string;
    width: string;
    height: string;
    transform: string;
  };
}) => {
  const { tickList, offset } = props;
  const tickstyle = {
    right: offset.right,
    width: offset.width,
    height: "100%",
    transform: offset.transform
  };
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div style={{ position: "relative", ...tickstyle }}>
        {tickList.map((item, index) => (
          <HorizontalGuide key={index} data={item} />
        ))}
      </div>
    </div>
  );
};
export const DataRangeY = (data: data[]) => {
  const ymax = Math.max(...data.map((item) => item.High));
  const ymin = Math.min(...data.map((item) => item.Low));
  return { min: ymin, max: ymax };
};

export const AddPosR = (data: data[], range: range) => {
  const xWidth: number = data.length;
  const yWidth: number = range.max - range.min;
  const modData: { data: candle; posR: position }[] = data.map(
    (item, index) => ({
      data: item,
      posR: {
        x: index / xWidth,
        y: 1 - (item.High - range.min) / yWidth,
        xsize: 1 / xWidth,
        ysize: (item.High - item.Low) / yWidth
      }
    })
  );

  return modData;
};

export const CandleChart = (props: {
  dataset: { data: candle; posR: position }[];
  offset: { top: string; right: string; width: string; height: string };
}) => {
  const { dataset, offset } = props;

  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div style={{ position: "relative", ...offset }}>
        <PlotCandle dataset={dataset} colorType={1} />
        <div
          style={{ position: "relative", display: "flex", top: "107%" }}
        ></div>
      </div>
    </div>
  );
};
