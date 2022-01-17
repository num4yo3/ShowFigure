type position = {
  x: number;
  y: number;
};
type params = {
  pos: position;
  posR: position;
};

type legend = {
  name: string;
  symbol: string;
  color: string;
};

type dataset = {
  data: position[];
  name: string;
  symbol: string;
  color: string;
};

const symbolList = {
  circle: {
    width: "100%",
    height: "100%",
    borderRadius: "50%"
  },
  square: {
    width: "100%",
    height: "100%"
  }
};

const colorList = {
  red: {
    color: "rgb(255,0,0)",
    backgroundColor: "rgba(255,0,0,0.6)",
    outline: "solid 1px"
  },
  orange: {
    color: "rgb(250,150,0)",
    backgroundColor: "rgba(250,150,0,0.6)",
    outline: "solid 1px"
  },
  yellow: {
    color: "rgb(250,220,0)",
    backgroundColor: "rgba(250,250,0,0.6)",
    outline: "solid 1px"
  },
  green: {
    color: "rgb(100,200,50)",
    backgroundColor: "rgba(100,200,50,0.6)",
    outline: "solid 1px"
  },
  blue: {
    color: "rgb(0,0,255)",
    backgroundColor: "rgba(0,0,255,0.6)",
    outline: "solid 1px"
  },
  violet: {
    color: "rgb(200,0,255)",
    backgroundColor: "rgba(200,0,255,0.6)",
    outline: "solid 1px"
  }
};

const Symbol = (props: {
  symbol: string;
  color?: string;
  translate?: boolean;
}) => {
  const { symbol, color, translate } = props;
  const defStyle = symbolList[symbol];
  const defColor = colorList[color];

  return (
    <div
      style={{
        width: "7px",
        height: "7px",
        transform: translate ? "translateX(-3px) translateY(4px)" : "none"
      }}
    >
      <div style={{ ...defStyle, ...defColor }} />
    </div>
  );
};
Symbol.defaultProps = { translate: true };

const Scatter = (props: { data: params; symbol: string; color: string }) => {
  const { data, symbol, color } = props;
  const defaultStyle = {
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

const Legend = (props: { value: legend }) => {
  const { value } = props;
  const defaultStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    padding: "0.1rem",
    color: "rgb(100,100,100)",
    border: "solid 1px"
  };
  return (
    <div style={{ ...defaultStyle }}>
      <div style={{ margin: "0 0.4rem" }}>
        <Symbol symbol={value.symbol} color={value.color} translate={false} />
      </div>
      {": " + value.name}
    </div>
  );
};

export const ScatterPlot = (props: { dataset: dataset }) => {
  const { data, symbol, color } = props;
  return (
    <>
      {data.map((item, index) => (
        <Scatter key={index} data={{ ...item }} symbol={symbol} color={color} />
      ))}
    </>
  );
};

export const SetLegend = (props: { listLegend: legend[] }) => {
  const { listLegend } = props;
  return (
    <div style={{ display: "flex", padding: "4px" }}>
      {listLegend.map((item, index) => (
        <Legend key={index} value={item} />
      ))}
    </div>
  );
};
