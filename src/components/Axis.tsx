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
      <div style={{ display: "flex", outline: "solid 1px black" }}>
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
    textAlign: "center",
    outline: "solid 1px"
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          outline: "solid 1px black"
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
