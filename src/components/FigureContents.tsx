import { SetLegend } from "./SetLegend";
import { SetAxis, SetGuide } from "./SetAxis";
import {
  CandleChart,
  SetAxisForDate,
  makeTickListCandle,
  DataRange,
  AddPosR,
  SetGuideForDate
} from "./CandleChart";
import styled from "styled-components";

type position = { x: number; y: number; xsize: number; ysize: number };

type candle = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

type legend = {
  name: string;
  symbol: string;
  color: string;
};

type candledata = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
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
  background-color: rgb(240, 240, 240);
`;

const HAxis = styled.div`
  /* display: flex; */
  /* position: relative; */
  width: 90%;
  height: 5rem;
  overflow: hidden;
  background-color: rgb(240, 240, 240);
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
  background-color: rgb(240, 240, 240);
`;

export const FigureContents = (props: {
  legendList: legend[];
  axisRange: {
    x: {
      min: number;
      max: number;
      tick?: number;
      label?: string;
    };
    y: {
      min: number;
      max: number;
      tick?: number;
      label?: string;
    };
  };
  children?: React.ReactNode;
}) => {
  const { legendList, axisRange } = props;

  const xAxis = axisRange.x;
  const yAxis = axisRange.y;

  return (
    <>
      <SetLegend listLegend={legendList} />
      <Wrapper>
        <VAxis>
          <SetAxis axis={yAxis} direction="v" />
        </VAxis>
        <PlotBox>
          <SetGuide axis={xAxis} direction="h" />
          <SetGuide axis={yAxis} direction="v" />
          {props.children}
        </PlotBox>
        <Space />
        <HAxis>
          <SetAxis axis={xAxis} direction="h" />
        </HAxis>
      </Wrapper>
    </>
  );
};

export const CandleChartComponent = (props: {
  dataset: candledata[];
  axisRange: {
    x: { duration: number; tick?: number; label?: string };
    y: { min: number; max: number; tick: number; label: string };
  };
  legendList: legend[];
  children?: React.ReactNode;
}) => {
  const { dataset, legendList, axisRange } = props;

  const xAxis = axisRange.x;
  const yAxis = axisRange.y;
  const tickList = makeTickListCandle({
    dataset: dataset,
    tick: axisRange.x.tick
  });
  const dataRange: range = DataRange(dataset);
  const modData: { data: candle; posR: position }[] = AddPosR(
    dataset,
    dataRange
  );

  const dWidth = dataset.length;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = axisRange.x.duration;
  const aHeight = yAxis.max - yAxis.min;
  const styleAdjust = {
    top: -((dataRange.y.max - yAxis.max) / aHeight) * 100 + "%",
    right: (dWidth / aWidth - 1) * 75 + "%",
    width: (dWidth / (aWidth * 1.25)) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%"
  };

  return (
    <>
      {/* <SetLegend listLegend={legendList} /> */}
      <Wrapper>
        <VAxis>
          <SetAxis axis={yAxis} direction="v" />
        </VAxis>
        <PlotBox>
          <SetGuideForDate tickList={tickList} offset={styleAdjust} />
          <SetGuide axis={yAxis} direction="v" />
          <CandleChart dataset={modData} offset={styleAdjust} />
          {props.children}
        </PlotBox>
        <Space />
        <HAxis>
          <SetAxisForDate
            tickList={tickList}
            format="'YY MMM DD"
            rotate={-70}
            offset={styleAdjust}
          />
        </HAxis>
      </Wrapper>
    </>
  );
};
