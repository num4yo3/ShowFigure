import { Plot, SetHAxis } from "./Plot";
import styled from "styled-components";

type position = {
  x: number;
  y: number;
};

type params = {
  pos: position;
  posR: position;
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
  const modData: params[] = data.map((item) => ({
    pos: item,
    posR: {
      x: (item.x - range.xMin) / xWidth,
      y: (item.y - range.yMin) / yWidth
    }
  }));
  return modData;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  height: 80%;
  background-color: rgb(255, 255, 255);
`;

const VAxis = styled.div`
  width: 5%;
  height: 90%;
  background-color: rgb(240, 240, 240);
`;

const PlotBox = styled.div`
  width: 95%;
  height: 90%;
`;

const Space = styled.div`
  width: 5%;
  height: 10%;
  background-color: rgb(240, 240, 240);
`;

const HAxis = styled.div`
  width: 95%;
  height: 10%;
  background-color: rgb(240, 240, 240);
`;

export const FigureContents = (props: {
  data: position[];
  setAxisX: { init: number; interval: number };
}) => {
  const { data, setAxisX } = props;
  const range: range = setScaleAuto(data);
  const modData: params[] = AdjustPos(data, range);
  return (
    <Wrapper>
      <VAxis />
      <PlotBox>
        <Plot data={[...modData]} />
      </PlotBox>
      <Space />
      <HAxis>
        <SetHAxis data={[...modData]} setAxis={setAxisX} />
      </HAxis>
    </Wrapper>
  );
};
