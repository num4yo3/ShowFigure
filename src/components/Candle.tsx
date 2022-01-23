type candle = {
  Date: number;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
};
type position = {
  x: number;
  y: number;
};

//箱ひげ図をプロット。横幅と縦幅は呼び出し元のboxsizeに依存
export const Candle = (props: { data: candle; colorType: number }) => {
  const { data, colorType } = props;
  const totalHeight = Math.abs(data.High - data.Low);
  const candleHeight = Math.abs(data.Open - data.Close);
  const upDown = data.Open < data.Close ? true : false;
  const defColor = [
    {
      up: "red",
      down: "blue",
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "43%",
          width: "14%",
          height: totalHeight + "%",
          backgroundColor:
            data.Open !== data.Close ? borderColor : setColor.evenBorder
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "0%",
          top: upDown
            ? data.High - data.Close + "%"
            : data.High - data.Open + "%",
          width: "100%",
          height: candleHeight + "%",
          backgroundColor: color,
          outline:
            "solid 1px " +
            (data.Open !== data.Close ? borderColor : setColor.evenBorder)
        }}
      />
    </div>
  );
};

export const PlotCandle = (props: {
  dataset: { data: candle; posR: position }[];
  colorType: number;
}) => {
  const { dataset, colorType } = props;
  const xsizeUnit = 100 / dataset.length;
  const ysizeUnit = 100;
  return (
    <>
      {dataset.map((item) => (
        <div
          style={{
            position: "absolute",
            top: (1 - item.posR.y) * 100 + "%",
            left: item.posR.x * 100 - xsizeUnit / 2 + "%",
            width: xsizeUnit + "%",
            height: ysizeUnit + "%"
          }}
        >
          <Candle data={item.data} colorType={colorType} />
        </div>
      ))}
    </>
  );
};
