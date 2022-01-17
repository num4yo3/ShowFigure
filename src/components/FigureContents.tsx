import { ScatterPlot, SetLegend } from "./ScatterPlot";
import { SetAxis, SetGuide, makeTickList } from "./Axis";
import styled from "styled-components";

type dataset = {
  data: position[];
  name: string;
  symbol: string;
  color: string;
};

type position = {
  x: number;
  y: number;
};

type params = {
  pos: position /* 生データ */;
  posR: position /* 窓上での相対座標*/;
};

type range = {
  min: number;
  max: number;
};
type axis = range & {
  tick?: number;
  label?: string;
};

type axisData = {
  value: string;
  posR: number;
};

type legend = {
  name: string;
  symbol: string;
  color: string;
};

const pickRange = (
  poslist: position[],
  xRange: { min?: number; max?: number },
  yRange: { min?: number; max?: number }
) => {
  let list: position[] = poslist;
  if (xRange.min !== undefined)
    list = list.filter((pos) => pos.x >= xRange.min);

  if (xRange.max !== undefined)
    list = list.filter((pos) => pos.x <= xRange.max);

  if (yRange.min !== undefined)
    list = list.filter((pos) => pos.y >= yRange.min);

  if (yRange.max !== undefined)
    list = list.filter((pos) => pos.y <= yRange.max);

  return {
    x: {
      min: Math.min(...list.map((value) => value.x)),
      max: Math.max(...list.map((value) => value.x))
    },
    y: {
      min: Math.min(...list.map((value) => value.y)),
      max: Math.max(...list.map((value) => value.y))
    }
  };
};
// データの最小値, 最大値を返す
const pickDataRange = (
  dataset: dataset[],
  xRange: { min?: number; max?: number },
  yRange: { min?: number; max?: number }
) => {
  const drange = dataset.map((item) => pickRange(item.data, xRange, yRange));
  return {
    x: {
      min: Math.min(...drange.map((value) => value.x.min)),
      max: Math.max(...drange.map((value) => value.x.max))
    },
    y: {
      min: Math.min(...drange.map((value) => value.y.min)),
      max: Math.max(...drange.map((value) => value.y.max))
    }
  };
};

// データ座標からプロット窓上での相対位置を計算
const AddPosR = (data: position[], xAxis: range, yAxis: range) => {
  const xWidth: number = xAxis.max - xAxis.min;
  const yWidth: number = yAxis.max - yAxis.min;
  const modData: params[] = data.map((item) => ({
    pos: item,
    posR: {
      x: (item.x - xAxis.min) / xWidth,
      y: (item.y - yAxis.min) / yWidth
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
const LabelX = styled.div`
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(100, 100, 100);
`;

const LabelY = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  top: 55%;
  width: 1rem;
  height: 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(100, 100, 100);
  transform: rotate(-90deg);
  transform-origin: 0 0;
`;

export const FigureContents = (props: {
  dataset: dataset[];
  range: {
    x: {
      min?: number;
      max?: number;
      tick?: number;
      label?: string;
    };
    y: {
      min?: number;
      max?: number;
      tick?: number;
      label?: string;
    };
  };
}) => {
  const { dataset, range } = props;
  const xrange = { min: range.x.min, max: range.x.max };
  const yrange = { min: range.y.min, max: range.y.max };
  // 指定された範囲内におけるデータの最小値、最大値を計算
  const dataRange = pickDataRange(dataset, xrange, yrange);
  //指定された範囲をマージ
  const xAxis: axis = { ...dataRange.x, ...range.x };
  const yAxis: axis = { ...dataRange.y, ...range.y };

  //表示位置を取得
  const modData: params[] = AddPosR(dataset[0].data, xAxis, yAxis);
  console.log(modData);
  const tickListX: axisData[] = makeTickList(xAxis);
  const tickListY: axisData[] = makeTickList(yAxis);
  const listLegend: legend[] = dataset.map((value) => ({
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));

  return (
    <>
      <SetLegend listLegend={listLegend} />
      <Wrapper>
        <VAxis>
          <LabelY>{yAxis.label}</LabelY>
          <SetAxis tickList={tickListY} direction="v" />
        </VAxis>
        <PlotBox>
          <SetGuide tickList={tickListX} direction="h" />
          <SetGuide tickList={tickListY} direction="v" />
          <ScatterPlot
            data={[...modData]}
            symbol={dataset[0].symbol}
            color={dataset[0].color}
          />
        </PlotBox>
        <Space />
        <HAxis>
          <SetAxis tickList={tickListX} direction="h" />
          <LabelX>{xAxis.label}</LabelX>
        </HAxis>
      </Wrapper>
    </>
  );
};
