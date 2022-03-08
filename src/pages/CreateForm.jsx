import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import FormField from '../components/createForm/FormField';
import DragnDrop from '../components/createForm/DragnDrop';
import { v4 as uuidv4 } from 'uuid';

export default function CreateForm() {
  const [fieldList, setFieldList] = useState([]);
  const [formState, setFormState] = useState({ id: uuidv4() });

  const onSubmitHandler = useCallback((fieldFormData) => {
    // 저장하기 버튼 클릭시 각 필드의 input 값들 전부 저장하기
    setFieldList((prevList) => [...prevList, fieldFormData]);
  }, []);

  const saveForm = () => {
    console.log(fieldList);
    window.localStorage.setItem('fieldList', JSON.stringify(fieldList));
  };

  return (
    <Wrapper>
      <h1>폼 형식 생성</h1>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formTitle">제목</label>
        <input type="text" name="formTitle" id="formTitle" />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label>필드목록</label>
        <FormField onSubmitHandler={onSubmitHandler} />
      </section>
      <button id="add-field-button">필드 추가하기</button>
      <button onClick={saveForm}>저장하기</button>
      <DragnDrop />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
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

  #add-field-button {
    width: 100%;
    height: 35px;
    font-size: 15px;
    font-weight: 600;
    line-height: 15px;
    text-align: center;
    background-color: #00b9ff;
    color: #fff;
    border-radius: 10px;
    margin: 10px 0;
  }
`;
