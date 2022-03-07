import React from 'react';
import styled, { css } from 'styled-components';
import List from '../components/UserSubmissionLists/List';

export default function UserSubmissionList() {
  return (
    <Div>
      <H1>제출목록</H1>
      <p style={{ marginBottom: ' 20px', textAlign: 'left' }}>응답 2개</p>
      <List>설문제목</List>
      <Button>확인</Button>
    </Div>
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
