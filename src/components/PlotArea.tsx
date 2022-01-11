const plotAreaStyleDefault = {
  width: "95%",
  height: "85%",
  backgroundColor: "white"
};

export const PlotArea = (props) => {
  return <div style={{ ...plotAreaStyleDefault }}>{props.children}</div>;
};
