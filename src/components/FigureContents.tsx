import { SetLegend } from "./SetLegend";
import { SetAxis, SetGuide } from "./SetAxis";
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
  const { dataset, axisRange } = props;
  const listLegend: legend[] = dataset.map((value) => ({
    name: value.name,
    symbol: value.symbol,
    color: value.color
  }));

  const xAxis = axisRange.x;
  const yAxis = axisRange.y;

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
