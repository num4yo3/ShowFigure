const boxStyleDefault = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  width: "100%",
  height: "500px",
  // backgroundColor: "silver",
  outline: "solid 1px grey"
};

export const FigureBox = (props) => {
  const title = "Sample Plot";
  return (
    <div style={{ ...boxStyleDefault }}>
      <div style={{ width: "100%", textAlign: "center" }}>{title}</div>
      {props.children}
    </div>
  );
};
