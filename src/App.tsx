import { FigureBox } from "./components/FigureBox";
import { PlotArea } from "./components/PlotArea";
import { Label, VLabel } from "./components/Axis";

export default function App() {
  const scale: number[] = [0, 10, 20, 30, 40, 50];
  const vscale: number[] = [0, 10, 20, 30, 40, 50];
  return (
    <>
      <FigureBox>
        <PlotArea>
          <VLabel scale={scale} />
          <Label scale={scale} />
        </PlotArea>
      </FigureBox>
    </>
  );
}
