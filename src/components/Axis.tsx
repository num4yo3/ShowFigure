import styled from "styled-components";

type position = {
  x: number;
  y: number;
};

type params = {
  pos: position;
  posR: position;
};

type setAxis = {
  init: number;
  interval: number;
};

const HScale = styled.div`
  position: absolute;
  left: ${(props) => props.pos.x * 100 + "%"};
  top: 0;
  width: 4rem;
  text-align: center;
  /* outline: solid 1px; */
  transform: translateX(-2rem) translateY(0.5rem);
`;

const makeHorizontalAxis = (props: { data: params[]; setAxis: setAxis }) => {
  const { data, setAxis } = props;
  return data.filter((item) => {
    return (item.pos.x + setAxis.init) % setAxis.interval === 0;
  });
};

export const SetHAxis = (props: { data: params[]; setAxis: setAxis }) => {
  const scale = makeHorizontalAxis(props);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {scale.map((item, index) => (
        <HScale key={index} pos={{ ...item.posR }}>
          {item.pos.x}
        </HScale>
      ))}
    </div>
  );
};
