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
  const title = "Title";
  return (
    <div style={{ ...boxStyleDefault }}>
      <div style={{ width: "100%", textAlign: "center" }}>{title}</div>
      <div style={{ width: "90%", height: "90%" }}>{props.children}</div>
    </div>
  );
};
