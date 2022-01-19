const markerList = {
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

export const Symbol = (props: {
  symbol: string;
  color?: string;
  translate?: boolean;
}) => {
  const { symbol, color, translate } = props;
  const defStyle: { [key: string]: string } = markerList[symbol];
  const defColor: { [key: string]: string } = colorList[color];

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
// Symbol引数の初期値を設定
Symbol.defaultProps = { symbol: "circle", color: "red", translate: true };

export const Circle = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={defcolor}
        stroke-width="10"
        fill={defbgcolor}
      />
    </svg>
  );
};

export const Square = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <rect
        x="13"
        y="13"
        width="74"
        height="74"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};

export const Triangle = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <polygon
        points="50,10 90,80 10,80"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};
