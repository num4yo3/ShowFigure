import { FigureBox } from "./components/FigureBox";
import { CandleChartComponent } from "./components/CandleChartComponent";
// import { makeAxisRange } from "./components/SetAxis";
import moment from "moment";
import { ScatterPlots } from "./components/ScatterPlot";

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
    { Date: "2022-01-04", Open: 10, High: 40, Low: 4, Close: 20, Volume: 1000 },
    {
      Date: "2022-01-05",
      Open: 25,
      High: 45,
      Low: 12,
      Close: 34,
      Volume: 1000
    },
    {
      Date: "2022-01-06",
      Open: 23,
      High: 42,
      Low: 21,
      Close: 38,
      Volume: 1000
    },
    {
      Date: "2022-01-07",
      Open: 41,
      High: 54,
      Low: 35,
      Close: 37,
      Volume: 1000
    },
    {
      Date: "2022-01-11",
      Open: 38,
      High: 43,
      Low: 30,
      Close: 31,
      Volume: 1000
    },
    {
      Date: "2022-01-12",
      Open: 43,
      High: 49,
      Low: 30,
      Close: 43,
      Volume: 1000
    },
    {
      Date: "2022-01-13",
      Open: 41,
      High: 53,
      Low: 23,
      Close: 25,
      Volume: 1000
    },
    {
      Date: "2022-01-14",
      Open: 31,
      High: 43,
      Low: 19,
      Close: 22,
      Volume: 1000
    },
    {
      Date: "2022-01-17",
      Open: 29,
      High: 40,
      Low: 23,
      Close: 38,
      Volume: 1000
    },
    {
      Date: "2022-01-18",
      Open: 44,
      High: 63,
      Low: 44,
      Close: 61,
      Volume: 1000
    },
    {
      Date: "2022-01-19",
      Open: 68,
      High: 78,
      Low: 65,
      Close: 76,
      Volume: 1000
    },
    {
      Date: "2022-01-20",
      Open: 68,
      High: 79,
      Low: 68,
      Close: 72,
      Volume: 1000
    },
    {
      Date: "2022-01-21",
      Open: 79,
      High: 86,
      Low: 64,
      Close: 71,
      Volume: 1000
    },
    {
      Date: "2022-01-24",
      Open: 68,
      High: 79,
      Low: 57,
      Close: 65,
      Volume: 1000
    },
    {
      Date: "2022-01-25",
      Open: 67,
      High: 71,
      Low: 52,
      Close: 68,
      Volume: 1000
    },
    {
      Date: "2022-01-26",
      Open: 65,
      High: 73,
      Low: 59,
      Close: 72,
      Volume: 1000
    },
    {
      Date: "2022-01-27",
      Open: 75,
      High: 80,
      Low: 52,
      Close: 61,
      Volume: 1000
    },
    {
      Date: "2022-01-28",
      Open: 61,
      High: 67,
      Low: 57,
      Close: 62,
      Volume: 1000
    },
    {
      Date: "2022-01-31",
      Open: 62,
      High: 63,
      Low: 51,
      Close: 57,
      Volume: 1000
    },
    {
      Date: "2022-02-01",
      Open: 59,
      High: 74,
      Low: 54,
      Close: 59,
      Volume: 1000
    },
    {
      Date: "2022-02-02",
      Open: 56,
      High: 57,
      Low: 40,
      Close: 45,
      Volume: 1000
    },
    {
      Date: "2022-02-03",
      Open: 51,
      High: 61,
      Low: 46,
      Close: 58,
      Volume: 1000
    },
    {
      Date: "2022-02-04",
      Open: 49,
      High: 71,
      Low: 49,
      Close: 60,
      Volume: 1000
    },
    {
      Date: "2022-02-07",
      Open: 65,
      High: 69,
      Low: 56,
      Close: 57,
      Volume: 1000
    },
    {
      Date: "2022-02-08",
      Open: 59,
      High: 69,
      Low: 41,
      Close: 43,
      Volume: 1000
    },
    {
      Date: "2022-02-09",
      Open: 45,
      High: 53,
      Low: 38,
      Close: 46,
      Volume: 1000
    },
    {
      Date: "2022-02-10",
      Open: 47,
      High: 50,
      Low: 40,
      Close: 41,
      Volume: 1000
    },
    {
      Date: "2022-02-14",
      Open: 37,
      High: 37,
      Low: 31,
      Close: 32,
      Volume: 1000
    },
    {
      Date: "2022-02-15",
      Open: 30,
      High: 30,
      Low: 23,
      Close: 26,
      Volume: 1000
    },
    {
      Date: "2022-02-16",
      Open: 12,
      High: 23,
      Low: 11,
      Close: 14,
      Volume: 1000
    },
    {
      Date: "2022-02-17",
      Open: 21,
      High: 23,
      Low: 15,
      Close: 19,
      Volume: 1000
    },
    {
      Date: "2022-02-18",
      Open: 26,
      High: 27,
      Low: 19,
      Close: 26,
      Volume: 1000
    },
    {
      Date: "2022-02-21",
      Open: 21,
      High: 33,
      Low: 20,
      Close: 22,
      Volume: 1000
    },
    {
      Date: "2022-02-22",
      Open: 21,
      High: 28,
      Low: 16,
      Close: 24,
      Volume: 1000
    },
    {
      Date: "2022-02-24",
      Open: 24,
      High: 25,
      Low: 13,
      Close: 15,
      Volume: 1000
    },
    { Date: "2022-02-25", Open: 22, High: 24, Low: 4, Close: 21, Volume: 1000 },
    {
      Date: "2022-02-28",
      Open: 36,
      High: 42,
      Low: 33,
      Close: 41,
      Volume: 1000
    },
    {
      Date: "2022-03-01",
      Open: 41,
      High: 43,
      Low: 40,
      Close: 41,
      Volume: 1000
    },
    {
      Date: "2022-03-02",
      Open: 44,
      High: 53,
      Low: 44,
      Close: 49,
      Volume: 1000
    },
    {
      Date: "2022-03-03",
      Open: 43,
      High: 50,
      Low: 41,
      Close: 44,
      Volume: 1000
    },
    {
      Date: "2022-03-04",
      Open: 43,
      High: 47,
      Low: 38,
      Close: 45,
      Volume: 1000
    },
    {
      Date: "2022-03-07",
      Open: 47,
      High: 54,
      Low: 32,
      Close: 48,
      Volume: 1000
    },
    {
      Date: "2022-03-08",
      Open: 49,
      High: 50,
      Low: 31,
      Close: 39,
      Volume: 1000
    },
    {
      Date: "2022-03-09",
      Open: 43,
      High: 58,
      Low: 38,
      Close: 57,
      Volume: 1000
    },
    {
      Date: "2022-03-10",
      Open: 61,
      High: 69,
      Low: 61,
      Close: 68,
      Volume: 1000
    },
    {
      Date: "2022-03-11",
      Open: 71,
      High: 77,
      Low: 69,
      Close: 76,
      Volume: 1000
    },
    {
      Date: "2022-03-14",
      Open: 82,
      High: 82,
      Low: 75,
      Close: 78,
      Volume: 1000
    },
    {
      Date: "2022-03-15",
      Open: 76,
      High: 86,
      Low: 74,
      Close: 72,
      Volume: 1000
    },
    {
      Date: "2022-03-16",
      Open: 68,
      High: 76,
      Low: 61,
      Close: 68,
      Volume: 1000
    },
    {
      Date: "2022-03-17",
      Open: 69,
      High: 74,
      Low: 66,
      Close: 72,
      Volume: 1000
    },
    { Date: "2022-03-18", Open: 71, High: 79, Low: 59, Close: 71, Volume: 1000 }
  ];
  // const range: {
  //   x: { min?: number; max?: number; tick?: number; label?: string };
  //   y: { min?: number; max?: number; tick?: number; label?: string };
  // } = {
  //   x: { min: -10, max: 80, tick: 10, label: "distance [m]" },
  //   y: { max: 150, tick: 20, label: "velocity [m/s]" }
  // };
  // const axisRange = makeAxisRange([data1, data2, data3], range);
  const axisRange = {
    x: {
      duration: 50,
      tick: 10,
      label: ""
    },
    y: { min: 0, max: 100, tick: 10, label: "" }
  };
  return (
    <>
      <FigureBox>
        <CandleChartComponent dataset={data4} axisRange={axisRange} />
      </FigureBox>
    </>
  );
}
