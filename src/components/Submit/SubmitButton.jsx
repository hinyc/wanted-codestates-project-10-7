import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { css } from 'styled-components';
import { initSubmitData } from '../../modules/submit';

export default function SubmitButton() {
  const [submitState, setSubmitState] = useState(true);
  const dispatch = useDispatch();
  const selectForm = 'testForm';

  const submitData = Object.keys(useSelector((state) => state.submit));

  useEffect(() => {
    const thisForm = JSON.parse(window.localStorage.getItem(selectForm));
    const requiredList = thisForm.filter((el) => el.required);
    requiredList.forEach((el) => {
      if (!submitData.includes(el.id)) {
        setSubmitState(false);
      }
    });
  }, [submitData]);

  const submitHandler = () => {
    //마지막 데이터 초기화
    dispatch(initSubmitData());
  };
  return (
    <Container>
      <Button onClick={submitHandler} submitState={submitState}>
        제출하기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  background-color: #fff;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 76px;
  :hover {
    cursor: default;
  }
`;
const Button = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  height: 52px;
  background-color: #00b9ff;
  :hover {
    cursor: pointer;
  }

  ${({ submitState }) => {
    if (!submitState) {
      return css`
        opacity: 0.3;
        :hover {
          cursor: default;
        }
      `;
    }
  }}
`;
