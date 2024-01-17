import React from "react";
import styled from "@emotion/styled";

const StyledLottoBall = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #abcdef;
`;

type LottoBall = {
  num: number;
};
const LottoBall = ({ num }: LottoBall) => {
  return <StyledLottoBall>{num}</StyledLottoBall>;
};

export default LottoBall;
