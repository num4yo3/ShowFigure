type axisSetter = {
  min: number;
  max: number;
  interval: number;
};
type axisData = {
  value: string;
  posR: number;
};

// 目盛りリストの作成
export const makeTickList = (props: axisSetter) => {
  const width: number = props.max - props.min;
  const maxint: number = Math.floor(props.max / props.interval);
  const minint: number = Math.floor(props.min / props.interval);
  const num: number = maxint - minint;
  let list: axisData[] = [];
  let tick: axisData = { value: "", posR: 0 };

  if (props.min % props.interval === 0) {
    tick = {
      value: `${minint * props.interval}`,
      posR: 0
    };
  }
  list.push(tick);
  for (let i = 1; i <= num; i++) {
    tick = {
      value: `${(minint + i) * props.interval}`,
      posR: ((minint + i) * props.interval - props.min) / width
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
    width: "4rem",
    transform: "translateX(-2rem) translateY(0.5rem)",
    textAlign: "center"
  };
  return <div style={{ ...defstyle }}>{data.value}</div>;
};

export const VerticalTick = (props: { data: axisData }) => {
  const { data } = props;
  const defstyle = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    left: "0",
    top: (1 - data.posR) * 100 + "%",
    height: "1rem",
    transform: "translateX(0rem) translateY(-0.5rem)"
  };
  return <div style={{ ...defstyle }}>{data.value}</div>;
};

export const SetHAxis = () => {
  const axis: axisData[] = makeTickList({ min: 27, max: 110, interval: 10 });
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {axis.map((item, index) => (
        <HorizontalTick key={index} data={item} />
      ))}
    </div>
  );
};

export const SetVAxis = () => {
  const axis: axisData[] = makeTickList({ min: 0, max: 90, interval: 10 });
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      {axis.map((item, index) => (
        <VerticalTick key={index} data={item} />
      ))}
    </div>
  );
};
