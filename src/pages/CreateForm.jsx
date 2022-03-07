import React from 'react';
import styled from 'styled-components';
import FormField from '../components/FormField';

export default function CreateForm() {
  return (
    <Wrapper>
      <h1>폼 형식 생성</h1>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formTitle">제목</label>
        <input type="text" name="제목" id="formTitle" />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label>필드목록</label>
        <FormField />
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  // align-items: center;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    text-align: center;
  }

  label {
    height: 16px;
    margin: 6px 0;
    color: #727272;
    font-size: 15px;
    font-weight: 700;
    line-height: 16px;
  }
  #formTitle {
    width: 100%;
    height: 30px;
    border: 1px solid #f2f2f2;
    border-radius: 7px;
  }
`;
