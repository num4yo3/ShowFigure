import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";
import { makeAxisRange } from "./components/SetAxis";
import moment from "moment";
import { ScatterPlots } from "./components/ScatterPlot";
import { Circle, Square, Triangle } from "./components/MarkerList";

type dataset = {
  index: string;
  data: { x: number; y: number }[];
  legend: {
    name: string;
    symbol: string;
    color: string;
  };
};

export default function App() {
  const data1 = [
    { x: 10, y: 80 },
    { x: 20, y: 70 },
    { x: 30, y: 60 },
    { x: 40, y: 50 },
    { x: 50, y: 40 },
    { x: 60, y: 30 },
    { x: 70, y: 20 }
  ];
  const data2 = [
    { x: -3, y: 9 },
    { x: -2, y: 4 },
    { x: -1, y: 1 },
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
    { x: 5, y: 25 },
    { x: 6, y: 36 },
    { x: 7, y: 45 },
    { x: 8, y: 54 },
    { x: 9, y: 59 },
    { x: 10, y: 63 },
    { x: 11, y: 64.5 },
    { x: 12, y: 64 },
    { x: 13, y: 61 }
  ];
  const dataset1: dataset = {
    index: "1",
    data: data1,
    legend: {
      name: "MosBarger",
      symbol: "square",
      color: "blue"
    }
  };

  const dataset2: dataset = {
    index: "2",
    data: data2,
    legend: {
      name: "Macdnald",
      symbol: "circle",
      color: "red"
    }
  };
  const range: {
    x: { min?: number; max?: number; tick?: number; label?: string };
    y: { min?: number; max?: number; tick?: number; label?: string };
  } = {
    x: { min: -10, max: 80, tick: 10, label: "distance [m]" },
    y: { max: 150, tick: 20, label: "velocity [m/s]" }
  };

  const axisRange = makeAxisRange([data1, data2], range);
  // const today = moment("2022-1-19");
  // console.log(today.format("yy-MMM-DD(ddd)"));
  return (
    <>
      <svg height="50%" width="50px" viewBox="0 0 100 100"></svg>
      <div style={{ width: "50px" }}>
        <Circle color="red" />
        <Square color="blue" />
        <Triangle color="yellow" />
      </div>
      <FigureBox>
        <FigureContents
          legendList={[dataset1.legend, dataset2.legend]}
          axisRange={axisRange}
        >
          <ScatterPlots dataset={[dataset1]} range={axisRange} />
          <ScatterPlots dataset={[dataset2]} range={axisRange} />
        </FigureContents>
      </FigureBox>
    </>
  );
}
