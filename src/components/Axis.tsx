type axisData = {
  value: string;
  posR: number;
};

// 目盛りリストの作成
export const makeTickList = (props: {
  min: number;
  max: number;
  interval: number;
}) => {
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
    width: "3rem",
    transform: "translateX(-1.5rem) translateY(0.5rem)",
    textAlign: "center",
    fontSize: "0.7rem",
    outline: "dotted 1px"
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

export const SetAxis = (props: { tickList: axisData[]; direction: string }) => {
  const { tickList, direction } = props;
  if (direction === "h") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {tickList.map((item, index) => (
          <HorizontalTick key={index} data={item} />
        ))}
      </div>
    );
  } else if (direction === "v") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {tickList.map((item, index) => (
          <VerticalTick key={index} data={item} />
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export const SetGuide = (props: {
  tickList: axisData[];
  direction: string;
}) => {
  const { tickList, direction } = props;
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
