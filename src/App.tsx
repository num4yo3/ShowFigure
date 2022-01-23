import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";
// import { makeAxisRange } from "./components/SetAxis";
// import moment from "moment";
import { ScatterPlots } from "./components/ScatterPlot";
import { Candle } from "./components/Candle";
import { DataRange, CandleChart } from "./components/CandleChart";

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
  const data3 = [
    { x: 10, y: -10 },
    { x: 15, y: 0 },
    { x: 20, y: 4 },
    { x: 25, y: 6 },
    { x: 30, y: 12 },
    { x: 35, y: 21 }
  ];
  const dataset1: dataset = {
    index: "1",
    data: data1,
    legend: {
      name: "MosBarger",
      symbol: "circle",
      color: "orange"
    }
  };

  const dataset2: dataset = {
    index: "2",
    data: data2,
    legend: {
      name: "Macdnald",
      symbol: "rtriangle",
      color: "black"
    }
  };

  const dataset3: dataset = {
    index: "3",
    data: data3,
    legend: {
      name: "Subway",
      symbol: "invtriangle",
      color: "blue"
    }
  };

  const data4 = [
    { Date: 1, Open: 10, High: 40, Low: 2, Close: 23, Volume: 1000 },
    { Date: 2, Open: 25, High: 45, Low: 12, Close: 34, Volume: 1000 },
    { Date: 3, Open: 23, High: 42, Low: 21, Close: 38, Volume: 1000 },
    { Date: 4, Open: 41, High: 56, Low: 35, Close: 37, Volume: 1000 },
    { Date: 5, Open: 38, High: 43, Low: 30, Close: 31, Volume: 1000 },
    { Date: 6, Open: 43, High: 49, Low: 30, Close: 43, Volume: 1000 },
    { Date: 7, Open: 41, High: 53, Low: 23, Close: 25, Volume: 1000 }
  ];
  // const range: {
  //   x: { min?: number; max?: number; tick?: number; label?: string };
  //   y: { min?: number; max?: number; tick?: number; label?: string };
  // } = {
  //   x: { min: -10, max: 80, tick: 10, label: "distance [m]" },
  //   y: { max: 150, tick: 20, label: "velocity [m/s]" }
  // };
  const dada = DataRange(data4);
  console.log(dada);
  // const axisRange = makeAxisRange([data1, data2, data3], range);
  const axisRange = {
    x: { min: 0, max: 10, tick: 1, label: " x axis [unit]" },
    y: { min: 0, max: 60, tick: 10, label: "y axis [unit]" }
  };
  // const today = moment("2022-1-19");
  // console.log(today.format("yy-MMM-DD(ddd)"));
  return (
    <>
      <FigureBox>
        <FigureContents legendList={[dataset1.legend]} axisRange={axisRange}>
          {/* <ScatterPlots dataset={[dataset1]} range={axisRange} /> */}
          <CandleChart dataset={data4} range={axisRange} />
        </FigureContents>
      </FigureBox>
    </>
  );
}
