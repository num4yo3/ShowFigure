import { ScatterPlots, SetLegend } from "./ScatterPlot";
import { SetAxis, SetGuide, makeTickList } from "./Axis";
import styled from "styled-components";

type dataset = {
  data: position[];
  name: string;
  symbol: string;
  color: string;
};
type moddataset = {
  data: params[];
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
  xRange?: { min?: number; max?: number },
  yRange?: { min?: number; max?: number }
) => {
  let list: position[] = poslist;
  if (xRange !== undefined) {
    if (xRange.min !== undefined)
      list = list.filter((pos) => pos.x >= xRange.min);

    if (xRange.max !== undefined)
      list = list.filter((pos) => pos.x <= xRange.max);
  }
  if (yRange !== undefined) {
    if (yRange.min !== undefined)
      list = list.filter((pos) => pos.y >= yRange.min);

    if (yRange.max !== undefined)
      list = list.filter((pos) => pos.y <= yRange.max);
  }
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
  xRange?: { min?: number; max?: number },
  yRange?: { min?: number; max?: number }
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
const AddPosR = (dataset: dataset[]) => {
  const range = pickDataRange(dataset);
  const xWidth: number = range.x.max - range.x.min;
  const yWidth: number = range.y.max - range.y.min;
  const modData: {
    data: params[];
    name: string;
    symbol: string;
    color: string;
  }[] = dataset.map((value) => ({
    data: value.data.map((item) => ({
      pos: { x: item.x, y: item.y },
      posR: {
        x: (item.x - range.x.min) / xWidth,
        y: (item.y - range.y.min) / yWidth
      }
    })),
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));
  return { modData, range };
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
  const axisRange = pickDataRange(dataset, xrange, yrange);
  //指定された範囲をマージ
  const xAxis: axis = { ...axisRange.x, ...range.x };
  const yAxis: axis = { ...axisRange.y, ...range.y };

  //表示位置を取得
  const papas = AddPosR(dataset);
  const modData: moddataset[] = papas.modData;
  const dataRange = papas.range;
  const tickListX: axisData[] = makeTickList(xAxis);
  const tickListY: axisData[] = makeTickList(yAxis);
  const listLegend: legend[] = dataset.map((value) => ({
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));
  console.log(dataRange, xAxis);
  const adjustPlot = { top: "0%", left: "10%", width: "50%", height: "100%" };
  return (
    <>
      <SetLegend listLegend={listLegend} />
      <Wrapper>
        <VAxis>
          <LabelY>{yAxis.label}</LabelY>
          <SetAxis tickList={tickListY} direction="v" />
        </VAxis>
        {/* PlotBoxがrelative */}
        <PlotBox>
          <SetGuide tickList={tickListX} direction="h" />
          <SetGuide tickList={tickListY} direction="v" />
          <div style={{ position: "relative", ...adjustPlot }}>
            <ScatterPlots dataset={modData} />
          </div>
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
