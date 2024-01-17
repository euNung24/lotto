import React, { useState } from "react";
import LottoGame from "./components/LottoGame";
import styled from "@emotion/styled";
import LottoBall from "./components/LottoBall";

const StyledMain = styled.main`
  margin: 20px auto;
  max-width: 1280px;
`;
const LottoGameWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 12px;

  & > * {
    flex: 1;
  }
`;

const Title = styled.h2`
  text-align: center;
`;

const SubmitButton = styled.button`
  background-color: #abcdef;
  border: 1px solid #4a7da6;
  border-radius: 5px;
  padding: 12px 32px;
  float: right;
  cursor: pointer;

  &:hover {
    background-color: #4a7da6;
    border: 1px solid #abcdef;
  }
`;

const WinningBallWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const genWinningNumbers = () => {
  const numbers: number[] = [];
  while (numbers.length <= 6) {
    const num = Math.trunc(Math.random() * 45 + 1);
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
};

const initGameNumList = [[], [], [], [], [], [], []];
const initAutoSelectStatus = [false, false, false, false, false, false];
const initCancelStatus = [false, false, false, false, false, false];

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [gameNumList, setGameNumList] = useState<number[][]>(initGameNumList);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [autoSelectStatus, setAutoSelectStatus] =
    useState<boolean[]>(initAutoSelectStatus);
  const [cancelStatus, setCancelStatus] = useState<boolean[]>(initCancelStatus);

  const onClickSubmit = () => {
    const status = window.confirm("제출하시겠습니까?");
    if (!status) return;
    let allGameNumList = [...gameNumList];

    for (let i = 0; i < gameNumList.length; i++) {
      if (cancelStatus[i]) {
        allGameNumList[i] = [];
      } else if (autoSelectStatus[i]) {
        while (allGameNumList[i].length <= 6) {
          const num = Math.trunc(Math.random() * 45 + 1);
          if (!allGameNumList[i].includes(num)) {
            allGameNumList[i].push(num);
          }
        }
      }
    }
    if (
      allGameNumList.findIndex(
        (numbers) => numbers.length > 0 && numbers.length < 6,
      ) > -1
    ) {
      alert("입력한 게임의 로또 번호를 모두 입력해주세요.");
      return;
    }
    setIsSubmit(true);

    setWinningNumbers(genWinningNumbers());
  };

  const changeGameNumList = (idx: number, numbers: number[]) => {
    let copiedGameNumList = [...gameNumList];
    copiedGameNumList[idx] = [...numbers];
    setGameNumList(copiedGameNumList);
  };

  const changeAutoSelectStatus = (idx: number) => {
    let copiedAutoSelectStatus = [...autoSelectStatus];
    copiedAutoSelectStatus[idx] = !copiedAutoSelectStatus[idx];
    setAutoSelectStatus(copiedAutoSelectStatus);
  };
  const changeCancelStatus = (idx: number) => {
    let copiedCancelStatus = [...cancelStatus];
    copiedCancelStatus[idx] = !copiedCancelStatus[idx];
    setCancelStatus(copiedCancelStatus);
  };
  return (
    <StyledMain>
      <section>
        <div
          style={{
            overflow: "hidden",
          }}
        >
          <Title>로또 추첨</Title>
          <SubmitButton onClick={onClickSubmit}>제출</SubmitButton>
        </div>
        <LottoGameWrapper>
          {["A", "B", "C", "D", "E"].map((name, idx) => (
            <LottoGame
              key={name}
              name={name}
              numbers={gameNumList[idx]}
              autoSelect={autoSelectStatus[idx]}
              cancel={cancelStatus[idx]}
              changeAutoSelectStatus={() => {
                changeAutoSelectStatus(idx);
              }}
              changeCancelStatus={() => {
                changeCancelStatus(idx);
              }}
              changeGameNumList={(numbers: number[]) =>
                changeGameNumList(idx, numbers)
              }
              isSubmitted={isSubmit}
              winningNumbers={winningNumbers}
            />
          ))}
        </LottoGameWrapper>
      </section>
      {isSubmit && (
        <section>
          <h3>로또 당첨 번호</h3>
          <WinningBallWrapper>
            {winningNumbers.map((num) => (
              <LottoBall key={num} num={num} />
            ))}
          </WinningBallWrapper>
        </section>
      )}
    </StyledMain>
  );
}

export default App;
