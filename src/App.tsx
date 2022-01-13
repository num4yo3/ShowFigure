import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";

export default function App() {
  const data = [
    { x: 0, y: 0 },
    { x: 1, y: 10 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 12 },
    { x: 5, y: 25 },
    { x: 6, y: 36 },
    { x: 7, y: 30 },
    { x: 8, y: 44 },
    { x: 9, y: 81 },
    { x: 10, y: 71 },
    { x: 11, y: 55 }
  ];

  return (
    <>
      <FigureBox>
        <FigureContents
          data={[...data]}
          range={{ xMin: 0, xMax: 15, yMin: 0, yMax: 100 }}
        />
      </FigureBox>
    </>
  );
}
