import { Wrapper, VAxis, PlotBox, HAxis, Space } from "./FigureContents";
import { SetAxis, SetGuide } from "./SetAxis";
import {
  CandleChart,
  SetAxisForDate,
  makeTickListForDate,
  DataRangeY,
  AddPosR,
  SetGuideForDate
} from "./CandleChart";

type position = { x: number; y: number; xsize: number; ysize: number };

type candle = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};

type range = {
  min: number;
  max: number;
};

export const CandleChartComponent = (props: {
  dataset: candle[];
  axisRange: {
    x: { duration: number; tick?: number };
    y: { min: number; max: number; tick: number };
  };
  children?: React.ReactNode;
}) => {
  const { dataset, axisRange } = props;

  const yAxis = axisRange.y;
  const tickList = makeTickListForDate({
    dataset: dataset,
    tick: axisRange.x.tick
  });
  const dataRangeY: range = DataRangeY(dataset);
  const modData: { data: candle; posR: position }[] = AddPosR(
    dataset,
    dataRangeY
  );
  const offset = 1;
  const dWidth = dataset.length;
  const dHeight = dataRangeY.max - dataRangeY.min;
  const aWidth = axisRange.x.duration;
  const aHeight = yAxis.max - yAxis.min;
  const styleAdjust = {
    top: -((dataRangeY.max - yAxis.max) / aHeight) * 100 + "%",
    right: (dWidth / aWidth - 1) * offset * 100 + "%",
    width: (dWidth / (aWidth * (2 - offset))) * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%",
    transform: `translateX(0px) translateY(0px)`
  };

  return (
    <>
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
            rotate={0}
            offset={styleAdjust}
          />
        </HAxis>
      </Wrapper>
    </>
  );
};
