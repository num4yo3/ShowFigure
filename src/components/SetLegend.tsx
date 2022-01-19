import { Symbol } from "./MarkerList";

type legend = {
  name: string;
  symbol: string;
  color: string;
};

const Legend = (props: { value: legend }) => {
  const { value } = props;
  const defaultStyle: { [key: string]: string } = {
    display: "flex",
    alignItems: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    padding: "0.1rem 0.5rem",
    color: "rgb(100,100,100)"
    // border: "solid 1px"
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
