import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";

type dataset = {
  data: { x: number; y: number }[];
  name: string;
  symbol: string;
  color: string;
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
    { x: 7, y: 49 }
  ];
  const dataset1: dataset = {
    data: data1,
    name: "MosBarger",
    symbol: "circle",
    color: "blue"
  };

  const dataset2: dataset = {
    data: data2,
    name: "Macdnald",
    symbol: "circle",
    color: "red"
  };
  const range: {
    x: { min?: number; max?: number; tick?: number; label?: string };
    y: { min?: number; max?: number; tick?: number; label?: string };
  } = {
    x: { min: 0, max: 40, tick: 10, label: "x [m]" },
    y: { min: 0, max: 65, tick: 10, label: "y [m/s]" }
  };
  return (
    <>
      <FigureBox>
        <FigureContents dataset={[dataset1, dataset2]} range={range} />
      </FigureBox>
    </>
  );
}
