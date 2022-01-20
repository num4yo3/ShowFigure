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
  },
  black: {
    color: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0.6)",
    outline: "solid 1px"
  },
  none: {
    color: "rgb(0,0,0)",
    backgroundColor: "rgba(0,0,0,0)",
    outline: "solid 1px"
  }
};

const SetCircle: React.FC<any> = ({ marker, children }) => {
  return marker === "circle" ? children : null;
};
const SetSquare: React.FC<any> = ({ marker, children }) => {
  return marker === "square" ? children : null;
};
const SetTriangle: React.FC<any> = ({ marker, children }) => {
  return marker === "triangle" ? children : null;
};
const SetRTriangle: React.FC<any> = ({ marker, children }) => {
  return marker === "rtriangle" ? children : null;
};
const SetLTriangle: React.FC<any> = ({ marker, children }) => {
  return marker === "ltriangle" ? children : null;
};
const SetInvTriangle: React.FC<any> = ({ marker, children }) => {
  return marker === "invtriangle" ? children : null;
};
const SetDiamond: React.FC<any> = ({ marker, children }) => {
  return marker === "diamond" ? children : null;
};

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
        strokeWidth="10"
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

export const RTriangle = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <polygon
        points="15,10 85,50 15,90"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};

export const LTriangle = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <polygon
        points="85,10 15,50 85,90"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};

export const InvTriangle = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <polygon
        points="50,90 90,20 10,20"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};

export const Diamond = (props: { color: string }) => {
  const { color } = props;
  const defcolor = colorList[color].color;
  const defbgcolor = colorList[color].backgroundColor;
  return (
    <svg viewBox="0 0 100 100">
      <polygon
        points="50,10 90,50 50,90 10,50"
        style={{
          fill: defbgcolor,
          stroke: defcolor,
          strokeWidth: 10
        }}
      />
    </svg>
  );
};

export const Marker = (props: { marker: string; color: string }) => {
  const { marker, color } = props;
  return (
    <>
      <SetCircle marker={marker}>
        <Circle color={color} />
      </SetCircle>
      <SetSquare marker={marker}>
        <Square color={color} />
      </SetSquare>
      <SetTriangle marker={marker}>
        <Triangle color={color} />
      </SetTriangle>
      <SetRTriangle marker={marker}>
        <RTriangle color={color} />
      </SetRTriangle>
      <SetLTriangle marker={marker}>
        <LTriangle color={color} />
      </SetLTriangle>
      <SetInvTriangle marker={marker}>
        <InvTriangle color={color} />
      </SetInvTriangle>
      <SetDiamond marker={marker}>
        <Diamond color={color} />
      </SetDiamond>
    </>
  );
};

export const Symbol = (props: {
  symbol: string;
  color?: string;
  translate?: boolean;
}) => {
  const { symbol, color, translate } = props;

  return (
    <div
      style={{
        width: "11px",
        height: "11px",
        transform: translate
          ? "translateX(-5px) translateY(-1px)"
          : "translateY(-1px)"
      }}
    >
      <Marker marker={symbol} color={color} />
    </div>
  );
};
// Symbol引数の初期値を設定
Symbol.defaultProps = { symbol: "circle", color: "red", translate: true };
