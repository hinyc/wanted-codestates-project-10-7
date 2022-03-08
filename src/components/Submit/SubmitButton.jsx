import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { css } from 'styled-components';
import { initSubmitData } from '../../modules/submit';

export default function SubmitButton() {
  const [submitState, setSubmitState] = useState(false);
  const dispatch = useDispatch();
  const selectForm = 'testForm';

  const submitData = useSelector((state) => state.submit);
  useEffect(() => {
    // 스토어에 데이터를 가저온다.
    // 객체니까 객체의 모든 키값을 꺼낸다
    // 그리고 객체의 모든 키값으 값이 falsy 값이 확인한다. => truethy 값만 같은 배열을 만든다.
    const trueData = [];
    for (let el in submitData) {
      if (submitData[el] && submitData[el] !== 'false') {
        trueData.push(el);
      }
    }
    // 로컬에 저장된 폼 =>  현제 작성중인 폼의 필수 항목만 선별
    const thisForm = JSON.parse(window.localStorage.getItem(selectForm));
    const requiredList = thisForm
      .filter((el) => el.required)
      .map((el) => el.id);
    console.log(trueData);

    if (requiredList.length === trueData.length) {
      setSubmitState(true);
    } else {
      setSubmitState(false);
    }

    // 필수항목이 작성중인 데이터에 없다면 제출버튼 비활성화
  }, [submitData]);

  const submitHandler = () => {
    //마지막 데이터 초기화
    console.log('click');
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
  z-index: 90;
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
