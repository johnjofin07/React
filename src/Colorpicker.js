import { useState } from "react";
import styled from "styled-components";

const array = [
  { id: 1, color: "#fcba03" },
  { id: 2, color: "#b5199e" },
  { id: 3, color: "#186322" },
];
const ColorBox = styled.div`
  background: ${(props) => (props.color ? props.color : "#000")};
  height: 200px;
  width: 200px;
  margin: 20px;
`;

export function Picker() {
  const [color, setColor] = useState(array);

  function handleColor(e, id) {
    const newColor = color.map((i) => {
      if (i.id === id) {
        return { ...i, color: e.target.value };
      }
      return i;
    });
    setColor(newColor);
  }
  return (
    <>
      {color.map((i) => {
        return (
          <>
            <ColorBox color={i.color}>
              <input
                value={i.color}
                onChange={(e) => handleColor(e, i.id)}
                type="color"
              />
            </ColorBox>
          </>
        );
      })}
    </>
  );
}
