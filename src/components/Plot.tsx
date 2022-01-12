import styled from "styled-components";

type position = {
  x: number;
  y: number;
};

const Scatter = styled.div`
  position: absolute;
  left: ${(props) => props.pos.x * 100 + "%"};
  bottom: ${(props) => props.pos.y * 100 + "%"};
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  outline: solid 1px rgb(0, 0, 0);
  transform: translateX(-3px) translateY(3px);
`;

export const Plot = (props) => {
  const data: position[] = props.data;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        outline: "solid 1px rgb(100,100,100)"
      }}
    >
      {data.map((item, index) => (
        <Scatter key={index} pos={{ ...item }} />
      ))}
    </div>
  );
};
