import { Plot } from "./Plot";
import styled from "styled-components";

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

export const FigureContents = () => {
  return (
    <Wrapper>
      <VAxis />
      <PlotBox>
        <Plot />
      </PlotBox>
      <Space />
      <HAxis />
    </Wrapper>
  );
};
