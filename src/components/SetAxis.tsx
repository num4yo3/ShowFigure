import { LabelX, LabelY } from "./SetLabel";
import { pickDataRange } from "./DataRange";

type axisData = {
  value: string;
  posR: number;
};

// 目盛りリストの作成
export const makeTickList = (props: {
  min: number;
  max: number;
  tick?: number;
}) => {
  const dtick: number = props.tick || 1;
  const width: number = props.max - props.min;
  const maxint: number = Math.floor(props.max / dtick);
  const minint: number = Math.floor(props.min / dtick);
  const num: number = maxint - minint;
  let list: axisData[] = [];
  let tick: axisData = { value: "", posR: 0 };

  if (props.min % dtick === 0) {
    tick = {
      value: `${minint * dtick}`,
      posR: 0
    };
  }
  list.push(tick);
  for (let i = 1; i <= num; i++) {
    tick = {
      value: `${(minint + i) * dtick}`,
      posR: ((minint + i) * dtick - props.min) / width
    };
    list.push(tick);
  }
  return list;
};

export const HorizontalTick = (props: { data: axisData }) => {
  const { data } = props;
  const defstyle = {
    position: "absolute",
    left: data.posR * 100 + "%",
    top: "0",
    width: "3rem",
    transform: "translateX(-1.5rem) translateY(0.5rem)",
    textAlign: "center",
    fontSize: "0.7rem"
    // outline: "dotted 1px"
  };
  return <div style={{ ...defstyle }}>{data.value}</div>;
};

export const VerticalTick = (props: { data: axisData }) => {
  const { data } = props;
  const defstyle = {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    left: "0",
    top: (1 - data.posR) * 100 + "%",
    width: "80%",
    height: "1rem",
    transform: "translateX(0rem) translateY(-0.5rem)",
    fontSize: "0.7rem"
    // outline: "dotted 1px"
  };
  return <div style={{ ...defstyle }}>{data.value}</div>;
};

export const HorizontalGuide = (props: { data: axisData }) => {
  const { data } = props;
  const defstyle = {
    position: "absolute",
    left: data.posR * 100 + "%",
    top: "0",
    width: "0%",
    height: "100%",
    borderLeft: "solid 1px rgba(0,0,0,0.2)"
  };
  return <div style={{ ...defstyle }} />;
};

export const VerticalGuide = (props: { data: axisData }) => {
  const { data } = props;
  const defstyle = {
    position: "absolute",
    left: "0",
    top: (1 - data.posR) * 100 + "%",
    width: "100%",
    height: "0%",
    borderTop: "solid 1px rgba(0,0,0,0.2)"
  };
  return <div style={{ ...defstyle }} />;
};

export const SetAxis = (props: {
  axis: { min: number; max: number; tick?: number; label?: string };
  direction: string;
}) => {
  const { axis, direction } = props;
  const tickList = makeTickList(axis);

  if (direction === "h") {
    return (
      <>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {tickList.map((item, index) => (
            <HorizontalTick key={index} data={item} />
          ))}
        </div>
        <LabelX label={axis.label} />
      </>
    );
  } else if (direction === "v") {
    return (
      <>
        <LabelY label={axis.label} />
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {tickList.map((item, index) => (
            <VerticalTick key={index} data={item} />
          ))}
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
};

export const SetGuide = (props: {
  axis: { min: number; max: number; tick?: number; label?: string };
  direction: string;
}) => {
  const { axis, direction } = props;
  const tickList = makeTickList(axis);

  if (direction === "h") {
    return (
      <>
        {tickList.map((item, index) => (
          <HorizontalGuide key={index} data={item} />
        ))}
      </>
    );
  } else if (direction === "v") {
    return (
      <>
        {tickList.map((item, index) => (
          <VerticalGuide key={index} data={item} />
        ))}
      </>
    );
  } else {
    return <div></div>;
  }
};

export const makeAxisRange = (
  dataset: { x: number; y: number }[][],
  range: {
    x: {
      min?: number;
      max?: number;
      tick?: number;
      label?: string;
    };
    y: {
      min?: number;
      max?: number;
      tick?: number;
      label?: string;
    };
  }
) => {
  const xrange = { min: range.x.min, max: range.x.max };
  const yrange = { min: range.y.min, max: range.y.max };
  const pickedRange = pickDataRange(dataset, xrange, yrange);
  // プロット範囲
  const axisRange: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  } = {
    x: { ...pickedRange.x, ...range.x },
    y: { ...pickedRange.y, ...range.y }
  };
  return axisRange;
};
