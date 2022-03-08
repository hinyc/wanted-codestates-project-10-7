import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BasicSurvey = ({ id }) => {
  const navigate = useNavigate();

  return (
    <>
      <BasicSurveyBox>
        <TopBox
          onClick={() => {
            navigate('/submit');
          }}
        >
          <p className="note_icons">📄</p>
          <h1>기본 설문지</h1>
        </TopBox>
        <BottomBox>
          <p
            className="on_list"
            onClick={() => {
              navigate('/submission');
            }}
          >
            제출목록
          </p>
          <p className="delete">삭제</p>
        </BottomBox>
      </BasicSurveyBox>
    </>
  );
};

const BasicSurveyBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const TopBox = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  color: #aab8c2;
  font-size: 1.6rem;
  cursor: pointer;

  .note_icons {
    margin-right: 0.8rem;
  }

  h1 {
    font-size: 1.15rem;
    font-weight: bold;
  }

  &:hover {
    color: #00b9ff;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(200, 200, 200, 0.6);
    transition: all 0.35s ease;
  }

  &:not(:hover) {
    background-color: #f5f8fa;
    box-shadow: 0px 5px 10px rgba(200, 200, 200, 0.3);
    transition: all 0.35s ease;
  }
`;

const BottomBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.3rem;
  font-size: 1rem;
  padding-right: 0.5rem;

  .on_list {
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      color: #00b9ff;
      transition: all 0.35s ease;
      font-weight: bold;
    }
    &:not(:hover) {
      color: #aab8c2;
      transition: all 0.35s ease;
    }
  }

  .delete {
    cursor: pointer;

    &:hover {
      color: #ff5a5f;
      transition: all 0.35s ease;
      font-weight: bold;
    }
    &:not(:hover) {
      color: #aab8c2;
      transition: all 0.35s ease;
    }
  }
`;

export default BasicSurvey;
