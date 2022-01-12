import styled from "styled-components";

const Scatter = styled.div`
  position: absolute;
  left: ${(props) => props.pos.x * 100 + "%"};
  bottom: ${(props) => props.pos.y * 100 + "%"};
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  outline: solid 1px rgb(0, 0, 0);
  transform: translateX(-3px) translateY(3px);
`;
type position = {
  x: number;
  y: number;
};
type range = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const setScaleAuto = (poslist: position[]) => {
  const posx: number[] = poslist.map((value) => value.x);
  const posy: number[] = poslist.map((value) => value.y);
  return {
    xMin: Math.min(...posx),
    xMax: Math.max(...posx),
    yMin: Math.min(...posy),
    yMax: Math.max(...posy)
  };
};

const AdjustPos = (data: position[], range: range) => {
  const xWidth: number = range.xMax - range.xMin;
  const yWidth: number = range.yMax - range.yMin;
  const modData: position[] = data.map((item) => ({
    x: (item.x - range.xMin) / xWidth,
    y: (item.y - range.yMin) / yWidth
  }));
  return modData;
};

export const Plot = () => {
  const data: position[] = [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 16 },
    { x: 5, y: 25 },
    { x: 6, y: 36 },
    { x: 7, y: 49 },
    { x: 8, y: 64 },
    { x: 9, y: 81 }
  ];
  const range: range = setScaleAuto(data);
  const modData: position[] = AdjustPos(data, range);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        outline: "solid 1px rgb(100,100,100)"
      }}
    >
      {modData.map((item, index) => (
        <Scatter key={index} pos={{ ...item }} />
      ))}
    </div>
  );
};
