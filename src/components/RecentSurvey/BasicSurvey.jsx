import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const form = [
  {
    id: 'name',
    type: 'text',
    required: true,
    label: '이름',
    placeholder: '주민등록상 이름 입력',
  },
  {
    id: 'phone',
    type: 'phone',
    required: true,
    label: '휴대폰 번호',
  },
  {
    id: 'address',
    type: 'address',
    required: true,
    label: '배송지',
  },
  {
    id: 'input_0',
    type: 'select',
    label: '옵션1',
    options: ['S', 'L', 'XL', 'XXL'],
    required: true,
  },
  {
    id: 'input_1',
    type: 'file',
    label: '첨부파일',
    required: false,
    description: '<p>첨부파일은 위와 같이 입력할 수 있습니다.</p>',
  },
  {
    id: 'agreement_0',
    type: 'agreement',
    label: '개인정보 수집 약관 동의',
    required: true,
    contents: '<p>(개인정보 수집 및 약관 내용)</p>',
  },
];

const BasicSurvey = ({ info }) => {
  console.log(info);
  const navigate = useNavigate();
  const moveHandler = () => {
    window.localStorage.setItem('testForm', JSON.stringify(form));
    navigate(`/submit/${info.id}`);
  };
  return (
    <>
      <BasicSurveyBox>
        <TopBox onClick={moveHandler}>
          <p className="note_icons">📄</p>
          <h1>{info.title}</h1>
        </TopBox>
        <BottomBox>
          <p
            className="on_list"
            onClick={() => {
              navigate(`/submit/${info.id}/list`);
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
