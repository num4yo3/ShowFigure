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

export const setPlotStyle = (dataRange, axisRange, offset) => {
  const dWidth = dataRange.x.duration;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = axisRange.x.duration;
  const aHeight = axisRange.y.max - axisRange.y.min;

  const style = {
    top: -((dataRange.y.max - axisRange.y.max) / aHeight) * 100 + "%",
    right: (dWidth / aWidth - 1) * offset * 100 + "%",
    width: (dWidth / aWidth) * offset * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%",
    transform: `translateX(0%) translateY(0%)`
  };
  return style;
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

  const dataRange = { x: { duration: dataset.length }, y: DataRangeY(dataset) };
  const modData: { data: candle; posR: position }[] = AddPosR(
    dataset,
    dataRange.y
  );

  const offset = 0.8;
  const dWidth = dataRange.x.duration;
  const dHeight = dataRange.y.max - dataRange.y.min;
  const aWidth = axisRange.x.duration;
  const aHeight = axisRange.y.max - axisRange.y.min;
  const styleAdjust = {
    top: -((dataRange.y.max - axisRange.y.max) / aHeight) * 100 + "%",
    right: (dWidth / aWidth - 1) * offset * 100 + "%",
    width: (dWidth / aWidth) * offset * 100 + "%",
    height: (dHeight / aHeight) * 100 + "%",
    transform: `translateX(0%) translateY(0%)`
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
