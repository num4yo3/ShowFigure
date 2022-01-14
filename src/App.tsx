import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";

export default function App() {
  const data = [
    { x: 10, y: 50 },
    { x: 15, y: 45 },
    { x: 22, y: 44 },
    { x: 27, y: 61 },
    { x: 34, y: 65 },
    { x: 35, y: 58 },
    { x: 46, y: 36 },
    { x: 17, y: 30 },
    { x: 68, y: 44 },
    { x: 79, y: 61 },
    { x: 82, y: 71 },
    { x: 100, y: 55 },
    { x: 101, y: 55 },
    { x: 102, y: 55 }
  ];

  return (
    <>
      <FigureBox>
        <FigureContents
          data={[...data]}
          range={{ xMin: 0, xMax: 100, yMin: 20, yMax: 100 }}
          xtick={10}
          ytick={5}
        />
      </FigureBox>
    </>
  );
}
