import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicSurvey from './BasicSurvey';

const RecentSurvey = () => {
  const navigate = useNavigate();
  return (
    <>
      <RecentSurveyBox>
        <TopBox>
          <LeftBox>
            <h1>✨ 최근 설문지</h1>
          </LeftBox>
          <RightBox>
            <PlusBtn
              onClick={() => {
                navigate('/create-form');
              }}
            >
              설문지 추가하기
            </PlusBtn>
          </RightBox>
        </TopBox>
        <SurveyListBox>
          <BasicSurvey id={'testForm'} />
        </SurveyListBox>
      </RecentSurveyBox>
    </>
  );
};

const RecentSurveyBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
`;

const TopBox = styled(RecentSurveyBox)`
  width: 100%;
  height: 20%;
  flex-direction: row;
  padding: 0;
  margin: 10px 0 20px 0;
`;

const LeftBox = styled(TopBox)`
  width: 50%;
  justify-content: flex-start;
  padding: 0;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const RightBox = styled(LeftBox)`
  width: 50%;
  justify-content: flex-end;
  padding: 0;
`;

const PlusBtn = styled.div`
  width: 135px;
  height: 48px;
  text-align: center;
  line-height: 47px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: bold;
  border: 1.9px solid #00b9ff;
  cursor: pointer;

  &:hover {
    background-color: #00b9ff;
    color: #fff;
    transition: all 0.35s ease;
  }
  &:not(:hover) {
    color: #00b9ff;
    background-color: #fff;
    transition: all 0.35s ease;
  }
`;

const SurveyListBox = styled.div`
  width: 100%;
  height: auto;
`;

export default RecentSurvey;
