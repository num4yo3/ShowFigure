type candle = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};
type position = {
  x: number;
  y: number;
  xsize: number;
  ysize: number;
};

//箱ひげ図をプロット。横幅と縦幅は呼び出し元のboxsizeに依存
export const Candle = (props: { data: candle; colorType: number }) => {
  const { data, colorType } = props;
  const totalHeight = Math.abs(data.High - data.Low);
  const candleHeight = Math.abs(data.Open - data.Close);
  const upDown = data.Open < data.Close ? true : false;
  const upperBar = upDown
    ? ((data.High - data.Close) / totalHeight) * 100
    : ((data.High - data.Open) / totalHeight) * 100;
  const lowerBar = upDown
    ? ((data.Open - data.Low) / totalHeight) * 100
    : ((data.Close - data.Low) / totalHeight) * 100;
  const defColor = [
    {
      up: "rgba(255,0,0,0.6)",
      down: "rgba(0,0,255,0.6)",
      upBorder: "red",
      downBorder: "blue",
      evenBorder: "green"
    },
    {
      up: "white",
      down: "black",
      upBorder: "black",
      downBorder: "black",
      evenBorder: "black"
    }
  ];
  const setColor = defColor[colorType];
  const color = upDown ? setColor.up : setColor.down;
  const borderColor = upDown ? setColor.upBorder : setColor.downBorder;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "47%",
          width: "6%",
          height: upperBar + "%",
          backgroundColor:
            data.Open !== data.Close ? borderColor : setColor.evenBorder
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "25%",
          top: upperBar + "%",
          width: "50%",
          height: (candleHeight / totalHeight) * 100 + "%",
          backgroundColor: color,
          outline:
            "solid 1px " +
            (data.Open !== data.Close ? borderColor : setColor.evenBorder)
        }}
      />
      <div
        style={{
          position: "absolute",
          top: upDown
            ? ((data.High - data.Open) / totalHeight) * 100 + "%"
            : ((data.High - data.Close) / totalHeight) * 100 + "%",
          left: "47%",
          width: "6%",
          height: lowerBar + "%",
          backgroundColor:
            data.Open !== data.Close ? borderColor : setColor.evenBorder
        }}
      />
    </>
  );
};

export const PlotCandle = (props: {
  dataset: { data: candle; posR: position }[];
  colorType: number;
}) => {
  const { dataset, colorType } = props;
  return (
    <>
      {dataset.map((item, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: item.posR.y * 100 + "%",
            left: (item.posR.x - item.posR.xsize / 2) * 100 + "%",
            width: item.posR.xsize * 100 + "%",
            height: item.posR.ysize * 100 + "%"
          }}
        >
          <Candle key={index} data={item.data} colorType={colorType} />
        </div>
      ))}
    </>
  );
};
