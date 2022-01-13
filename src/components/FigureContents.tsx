import { ScatterPlot } from "./Plot";
import { SetHAxis, SetVAxis } from "./Axis";
import styled from "styled-components";

type position = {
  x: number;
  y: number;
};

type params = {
  pos: position /* 生データ */;
  posR: position /* 窓上での相対座標*/;
};

type range = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

// データの最小値, 最大値を返す
const pickDataRange = (poslist: position[]) => {
  const posx: number[] = poslist.map((value) => value.x);
  const posy: number[] = poslist.map((value) => value.y);
  return {
    xMin: Math.min(...posx),
    xMax: Math.max(...posx),
    yMin: Math.min(...posy),
    yMax: Math.max(...posy)
  };
};

// データ座標からプロット窓上での相対位置を計算
const AddPosR = (data: position[], range: range) => {
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
  range?: range;
  setAxisX?: { init: number; interval: number };
}) => {
  const { data } = props;
  // プロットする範囲をrangeで指定
  const range: range = props.range || pickDataRange(data);
  const modData: params[] = AddPosR(data, range);
  return (
    <Wrapper>
      <VAxis>
        <SetVAxis />
      </VAxis>
      <PlotBox>
        <ScatterPlot data={[...modData]} />
      </PlotBox>
      <Space />
      <HAxis>
        <SetHAxis />
      </HAxis>
    </Wrapper>
  );
};
