export const LabelX = (props) => {
  const { label } = props;

  const style = {
    textAlign: "center",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "rgb(100, 100, 100)"
  };
  return <div style={style}>{label}</div>;
};

export const LabelY = (props) => {
  const { label } = props;
  const style = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    top: "55%",
    width: "1rem",
    height: "1rem",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "rgb(100, 100, 100)",
    transform: "rotate(-90deg)",
    transformOrigin: "0 0"
  };
  return <div style={style}>{label}</div>;
};
