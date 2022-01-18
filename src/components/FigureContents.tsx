import { ScatterPlots, SetLegend } from "./ScatterPlot";
import { SetAxis, SetGuide } from "./Axis";
import { pickDataRange } from "./DataRange";
import styled from "styled-components";

type position = {
  x: number;
  y: number;
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
  index: string;
};

type axis = {
  min: number;
  max: number;
  tick?: number;
  label?: string;
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
  const listLegend: legend[] = dataset.map((value) => ({
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));

  // 指定された範囲内におけるデータの最小値、最大値を計算
  const axisRange = pickDataRange(data, xrange, yrange);
  // プロット範囲
  const xAxis: axis = { ...axisRange.x, ...range.x };
  const yAxis: axis = { ...axisRange.y, ...range.y };

  //プロットの大きさを軸に合わせて調整
  const dataRange = pickDataRange(data);
  const dWidth = dataRange.x.max - dataRange.x.min;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = xAxis.max - xAxis.min;
  const aHeight = yAxis.max - yAxis.min;

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
          <SetAxis axis={yAxis} direction="v" />
        </VAxis>
        <PlotBox>
          <SetGuide axis={xAxis} direction="h" />
          <SetGuide axis={yAxis} direction="v" />
          <div style={{ position: "relative", ...adjustPlot }}>
            <ScatterPlots dataset={dataset} />
          </div>
        </PlotBox>
        <Space />
        <HAxis>
          <SetAxis axis={xAxis} direction="h" />
        </HAxis>
      </Wrapper>
    </>
  );
};
