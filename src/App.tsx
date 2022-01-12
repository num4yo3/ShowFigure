import { FigureBox } from "./components/FigureBox";
import { FigureContents } from "./components/FigureContents";
import { Label, VLabel } from "./components/Axis";

export default function App() {
  const scale: number[] = [0, 10, 20, 30, 40, 50];
  const vscale: number[] = [0, 10, 20, 30, 40, 50];
  return (
    <>
      <FigureBox>
        <FigureContents />
      </FigureBox>
    </>
  );
}
