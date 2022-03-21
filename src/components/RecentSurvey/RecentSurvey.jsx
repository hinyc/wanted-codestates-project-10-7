import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BasicSurvey from './BasicSurvey';

const RecentSurvey = () => {
  const navigate = useNavigate();

  const surveyList = JSON.parse(window.localStorage.getItem('forms'))
    ? JSON.parse(window.localStorage.getItem('forms'))
    : [
        {
          title: '기본설문지',
          info: [
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
          ],
        },
      ];

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
          {surveyList.map((info, idx) => (
            <BasicSurvey key={idx} info={info} />
          ))}
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
