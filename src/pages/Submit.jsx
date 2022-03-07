import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Form from '../components/Submit/Form';

export default function Submit() {
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

  return (
    <Container>
      {form.map((el) => {
        return <Form key={el.id} data={el} />;
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 3px black;
  form {
    width: 100%;
  }
  label {
    font-weight: 700;
    font-size: 12px;
    width: 100%;
    margin-top: 30px;
  }
  div {
    width: 100%;
  }
  div.verification {
    height: 12px;
    font-size: 12px;
    color: red;
    margin-top: 8px;
  }
  div.addFileText {
    font-size: 10px;
    color: #adacad;
    margin: 10px 0;
  }
  input {
    width: 100%;
    height: 48px;
    outline: none;
    background-color: #f8f9fb;
    border-radius: 10px;
    margin-top: 10px;
    padding: 0 15px;
    :hover {
      border: 1px solid #ff705a;
      cursor: text;
    }
    :focus {
      border: 1px solid #ff705a;
    }
    ::placeholder {
      color: #9da5ac;
      font-weight: 700;
    }
  }
  input.file {
    width: 90%;
    height: 200px;
    :hover {
      cursor: pointer;
    }
  }
`;
