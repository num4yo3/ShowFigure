const boxStyleDefault = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "70%",
  height: "400px",
  backgroundColor: "silver",
  outline: "solid 1px grey"
};

export const FigureBox = (props) => {
  const title = "Title";
  return (
    <div style={{ ...boxStyleDefault }}>
      <div style={{ width: "100%" }}>{title}</div>
      {props.children}
    </div>
  );
};
