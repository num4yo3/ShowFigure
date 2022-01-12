type Props = {
  scale: number[];
};

export const Label: React.FC<Props> = (props) => {
  const defaultStyle = {
    flex: "1 1 100%",
    textAlign: "center"
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        {props.scale.map((value, index) => (
          <div key={index} style={{ ...defaultStyle }}>
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export const VLabel: React.FC<Props> = (props) => {
  const defaultStyle = {
    flex: "1 1 100%",
    alignItems: "center",
    width: "100%",
    textAlign: "center"
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column-reverse",
          justifyContent: "center"
        }}
      >
        {props.scale.map((value, index) => (
          <div key={index} style={{ ...defaultStyle }}>
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export const Scale = (props) => {
  return <div></div>;
};
