export const Candle = (props: {
  data: {
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
  };
  colorType: number;
}) => {
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
        width: "50px",
        height: "100px",
        outline: "solid 1px black"
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "48%",
          width: "4%",
          height: totalHeight + "%",
          backgroundColor:
            data.Open !== data.Close ? borderColor : setColor.evenBorder
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: upDown ? data.High - data.Close : data.High - data.Open,
          width: "20%",
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
