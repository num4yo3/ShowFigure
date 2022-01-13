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
    { x: 57, y: 30 },
    { x: 68, y: 44 },
    { x: 79, y: 61 },
    { x: 82, y: 71 },
    { x: 102, y: 55 }
  ];

  return (
    <>
      <FigureBox>
        <FigureContents
          data={[...data]}
          // range={{ xMin: 0, xMax: 50, yMin: 20, yMax: 70 }}
        />
      </FigureBox>
    </>
  );
}
