type position = {
  x: number;
  y: number;
};
type params = {
  pos: position;
  posR: position;
};

const Scatter = (props: { data: params }) => {
  const data: params = props.data;
  const defaultStyle = {
    position: "absolute",
    left: data.posR.x * 100 + "%",
    bottom: data.posR.y * 100 + "%",
    width: "6px",
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "rgb(255, 255, 255)",
    outline: "solid 1px rgb(0, 0, 0)",
    transform: "translateX(-3px) translateY(3px)"
  };

  return <div style={{ ...defaultStyle }} />;
};

export const ScatterPlot = (props: { data: params[] }) => {
  const data: params[] = props.data;
  return (
    <>
      {data.map((item, index) => (
        <Scatter key={index} data={{ ...item }} />
      ))}
    </>
  );
};
