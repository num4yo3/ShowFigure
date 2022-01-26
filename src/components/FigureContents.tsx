import { SetLegend } from "./SetLegend";
import { SetAxis, SetGuide } from "./SetAxis";
import styled from "styled-components";

type legend = {
  name: string;
  symbol: string;
  color: string;
};

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* padding: 1rem; */
  background-color: rgb(255, 255, 255);
  outline: dotted 1px;
`;

export const VAxis = styled.div`
  display: flex;
  position: relative;
  width: 10%;
  height: 90%;
  /* background-color: rgb(240, 200, 240); */
`;

export const HAxis = styled.div`
  /* display: flex; */
  position: relative;
  width: 90%;
  height: 10%;
  overflow: hidden;
  /* background-color: rgb(240, 200, 240); */
`;

export const PlotBox = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  overflow: hidden;
  padding: 0px;
  outline: solid 1px rgba(0, 0, 0, 0.5);
`;

export const Space = styled.div`
  width: 10%;
  height: 10%;
  /* background-color: rgb(240, 240, 240); */
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
