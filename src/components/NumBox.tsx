import React, { useState } from "react";
import styled from "@emotion/styled";

type NumBoxProps = {
  num?: number;
  getIsPossibleNum?: () => boolean;
};

const StyledNumBox = styled.div<{ num: number; isClicked: boolean }>`
  padding: 8px 0;
  width: 26px;
  border: 1px solid var(--primary);
  border-image: linear-gradient(
    180deg,
    rgba(219, 57, 48, 1) 20%,
    rgba(255, 255, 255, 1) 20%,
    rgba(255, 255, 255, 1) 80%,
    rgba(219, 57, 48, 1) 80%
  );
  border-image-slice: 1;
  text-align: center;
  color: var(--primary);
  text-indent: ${({ num }) => (!!num ? 0 : "-9999px")};
  position: relative;
  cursor: pointer;

  &::after {
    ${({ isClicked }) =>
      isClicked && {
        content: '""',
      }}
    position: absolute;
    top: 50%;
    left: 50%;
    height: 80%;
    width: 50%;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    transform: translate(-50%, -50%);
  }
`;
const NumBox = ({ num = 0, getIsPossibleNum = () => false }: NumBoxProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = () => {
    setIsClicked(getIsPossibleNum());
  };

  return (
    <StyledNumBox num={num} isClicked={isClicked} onClick={onClick}>
      {num}
    </StyledNumBox>
  );
};

export default NumBox;
