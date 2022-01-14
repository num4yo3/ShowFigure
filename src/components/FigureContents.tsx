import { ScatterPlot } from "./Plot";
import { SetAxis, SetGuide, makeTickList } from "./Axis";
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

type axisData = {
  value: string;
  posR: number;
};

const pickDataFromRange = (
  poslist: position[],
  range?: { xMin?: number; xMax?: number; yMin?: number; yMax?: number }
) => {
  let list: position[] = poslist;
  if (range.xMin !== undefined) {
    list = list.filter((pos) => pos.x >= range.xMin);
  }
  if (range.xMax !== undefined) {
    list = list.filter((pos) => pos.x <= range.xMax);
  }
  if (range.yMin !== undefined) {
    list = list.filter((pos) => pos.y >= range.yMin);
  }
  if (range.yMax !== undefined) {
    list = list.filter((pos) => pos.y <= range.yMax);
  }
  return list;
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
  width: 90%;
  height: 80%;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  outline: dotted 1px;
`;

const VAxis = styled.div`
  display: flex;
  width: 10%;
  height: 85%;
  /* background-color: rgb(240, 240, 240); */
`;

const HAxis = styled.div`
  /* display: flex; */
  width: 90%;
  height: 2rem;
  /* background-color: rgb(240, 240, 240); */
`;

const PlotBox = styled.div`
  position: relative;
  width: 90%;
  height: 85%;
  /* outline: solid 1px rgba(0, 0, 0, 0.2); */
`;

const Space = styled.div`
  width: 10%;
  height: 15%;
  /* background-color: rgb(240, 240, 240); */
`;

export const FigureContents = (props: {
  data: position[];
  range?: { xMin?: number; xMax?: number; yMin?: number; yMax?: number };
  xtick?: number;
  ytick?: number;
  setAxisX?: { init: number; interval: number };
}) => {
  const data = pickDataFromRange(props.data, props.range);
  const xtick = props.xtick || 1;
  const ytick = props.ytick || 1;
  // プロットする範囲をrangeで指定
  const dataRange: range = pickDataRange(data);
  const range: range = { ...dataRange, ...props.range };
  //表示位置を取得
  const modData: params[] = AddPosR(data, range);

  const xAxis = { min: range.xMin, max: range.xMax, interval: xtick };
  const yAxis = { min: range.yMin, max: range.yMax, interval: ytick };
  const tickListX: axisData[] = makeTickList(xAxis);
  const tickListY: axisData[] = makeTickList(yAxis);

  return (
    <>
      <Wrapper>
        <VAxis>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "nowrap",
              top: "55%",
              width: "1rem",
              height: "1rem",
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "rgb(100,100,100)",
              transform: "rotate(-90deg)",
              transformOrigin: "0 0"
            }}
          >
            Apple pie [piece]
          </div>
          <SetAxis tickList={tickListY} direction="v" />
        </VAxis>
        <PlotBox>
          <SetGuide tickList={tickListX} direction="h" />
          <SetGuide tickList={tickListY} direction="v" />
          <ScatterPlot data={[...modData]} />
        </PlotBox>
        <Space />
        <HAxis>
          <SetAxis tickList={tickListX} direction="h" />
          <div
            style={{
              textAlign: "center",
              fontSize: "0.8rem",
              fontWeight: "bold",
              color: "rgb(100,100,100)"
            }}
          >
            weight [kg]
          </div>
        </HAxis>
      </Wrapper>
    </>
  );
};
