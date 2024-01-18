import React from "react";
import styled from "@emotion/styled";
import NumBox from "./NumBox";

const LottoGameWrapper = styled.div`
  border: 1px solid var(--primary);
  max-width: 310px;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0 0 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--primary);

  span {
    flex: 1;
    margin-left: 12px;
    padding: 4px;
    display: block;
    background-color: var(--primary);
    color: #fff;
  }
`;

const NumBoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 12px;
  padding: 12px 8px;
  border-top: 1px solid var(--primary);
`;

const SubmitTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 50px 0 10px;
  padding-right: 8px;
  gap: 12px;

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

type LottoGameProps = {
  name: string;
  autoSelect: boolean;
  cancel: boolean;
  isSubmitted: boolean;
  winningNumbers: number[];
  numbers: number[];
  changeGameNumList: (numbers: number[]) => void;
  changeAutoSelectStatus: () => void;
  changeCancelStatus: () => void;
};

const getRank = (selectedNumbers: number[], winningNumbers: number[]) => {
  const copiedWinningNumbers = [...winningNumbers];
  const bonusNum = copiedWinningNumbers.pop();
  let count = 0;
  for (let nums of selectedNumbers) {
    if (copiedWinningNumbers.includes(nums)) {
      count++;
    }
  }
  switch (count) {
    case 6:
      return 1;
    case 5:
      return selectedNumbers.includes(bonusNum!) ? 2 : 3;
    case 4:
      return 4;
    case 3:
      return 5;
  }
  return;
};

const LottoGame = ({
  name,
  numbers,
  autoSelect,
  cancel,
  changeAutoSelectStatus,
  changeCancelStatus,
  changeGameNumList,
  isSubmitted,
  winningNumbers,
}: LottoGameProps) => {
  const rank = getRank(numbers, winningNumbers);
  const getIsChangePossible = (num: number) => {
    if (isSubmitted) {
      alert("이미 제출된 로또입니다.");
      return;
    }
    if (numbers.includes(num)) {
      changeGameNumList([...numbers].filter((item) => item !== num));
      return;
    }
    if (numbers.length >= 6) {
      alert("로또 번호는 6개까지만 선택 가능합니다.");
      return;
    }
    changeGameNumList([...numbers, num]);
    return;
  };

  const getAutoSelectStatus = () => {
    if (isSubmitted) {
      alert("이미 제출된 로또입니다.");
      return;
    }
    changeAutoSelectStatus();
    return !autoSelect;
  };

  const getCancelStatus = () => {
    if (isSubmitted) {
      alert("이미 제출된 로또입니다.");
      return;
    }
    changeCancelStatus();
    return !cancel;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {isSubmitted && !cancel && (numbers.length > 0 || autoSelect) && (
        <div>{rank ? `${rank}등 당첨` : "낙첨"}</div>
      )}
      <LottoGameWrapper>
        <Title>
          {name}
          <span>1,000원</span>
        </Title>
        <NumBoxWrapper>
          {Array(45)
            .fill(0)
            .map((_, i) => (
              <NumBox
                key={i + 1}
                num={i + 1}
                isSelected={numbers.includes(i + 1)}
                getIsChangePossible={() => getIsChangePossible(i + 1)}
              />
            ))}
        </NumBoxWrapper>
        <SubmitTypeWrapper>
          <div>
            자동선택
            <NumBox
              isSelected={autoSelect}
              getIsChangePossible={getAutoSelectStatus}
            />
          </div>
          <div>
            취소
            <NumBox isSelected={cancel} getIsChangePossible={getCancelStatus} />
          </div>
        </SubmitTypeWrapper>
      </LottoGameWrapper>
    </div>
  );
};

export default LottoGame;
