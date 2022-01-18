import { ScatterPlots, SetLegend } from "./ScatterPlot";
import { SetAxis, SetGuide, makeTickList } from "./Axis";
import { pickDataRange } from "./DataRange";
import styled from "styled-components";

type position = {
  x: number;
  y: number;
};

type moddataset = {
  data: params[];
  name: string;
  symbol: string;
  color: string;
};

type legend = {
  name: string;
  symbol: string;
  color: string;
};

type dataset = {
  data: position[];
  name: string;
  symbol: string;
  color: string;
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

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  height: 80%;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  /* outline: dotted 1px; */
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
  width: 89%;
  height: 84%;
  overflow: hidden;
  padding: 0px;
  outline: solid 1px rgba(0, 0, 0, 0.5);
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
  const data = dataset.map((item) => item.data);
  const xrange = { min: range.x.min, max: range.x.max };
  const yrange = { min: range.y.min, max: range.y.max };
  // 指定された範囲内におけるデータの最小値、最大値を計算
  const axisRange = pickDataRange(data, xrange, yrange);
  //指定された範囲をマージ
  const xAxis: axis = { ...axisRange.x, ...range.x };
  const yAxis: axis = { ...axisRange.y, ...range.y };

  //表示位置を取得
  const tickListX: axisData[] = makeTickList(xAxis);
  const tickListY: axisData[] = makeTickList(yAxis);
  const listLegend: legend[] = dataset.map((value) => ({
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));

  const dataRange = pickDataRange(data);
  const dWidth = dataRange.x.max - dataRange.x.min;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = xAxis.max - xAxis.min;
  const aHeight = yAxis.max - yAxis.min;
  console.log(dataRange, dWidth, dHeight, aWidth, aHeight);

  const adjustPlot = {
    top: -((dataRange.y.max - yAxis.max) / aHeight) * 100 + "%",
    left: ((dataRange.x.min - xAxis.min) / aWidth) * 100 + "%",
    width: (dWidth / aWidth) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%"
  };
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
          <div style={{ position: "relative", ...adjustPlot }}>
            <ScatterPlots dataset={dataset} />
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
