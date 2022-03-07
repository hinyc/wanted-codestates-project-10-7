import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import ListC from '../components/UserSubmissionLists/List';
import { Link } from 'react-router-dom';
import Modal from '../components/UserSubmissionLists/Modal';
import useInfinityScroll from '../hooks/useInfinityScroll';

export default function UserSubmissionList() {
  const temporaryArr = new Array(50).fill(0);
  const targetRef = useRef(null);
  const newMatchLIst = useInfinityScroll(targetRef, temporaryArr, 10);

  const [modalState, setModalState] = useState(false);

  return (
    <>
      <Div>
        <H1>제출목록</H1>
        <p style={{ marginBottom: ' 20px', textAlign: 'left' }}>응답 2개</p>
        {newMatchLIst.map((el, idx) => (
          <ListC
            key={idx}
            setModalState={setModalState}
            ref={idx + 1 === newMatchLIst.length ? targetRef : undefined}
          >
            제출한 폼 제목
          </ListC>
        ))}
        <Link to="/">
          <Button>확인</Button>
        </Link>
      </Div>
      {modalState && <Modal setModalState={setModalState} />}
    </>
  );
}
const H1 = styled.h1`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
`;
const Div = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
`;
const Button = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgb(255, 51, 85);
  border-radius: 8px;
  border: 1px solid rgb(241, 243, 245);
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  font-weight: 700;
  padding: 4px 16px;
  text-align: center;
  height: 40px;
`;
