import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import FormField from '../components/createForm/FormField';
import DragnDrop from '../components/createForm/DragnDrop';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
const ID_LENGTH = 10;

const initialState = {
  id: 'field_' + uuidv4().slice(0, ID_LENGTH),
  type: 'text',
  label: '',
  required: false,
  placeholder: '',
  description: '',
  options: [],
  contents: '',
};

export default function CreateForm() {
  const formId = 'form_' + uuidv4().slice(0, ID_LENGTH);
  const [forms, setForms] = useState([]);
  const [fieldList, setFieldList] = useState([initialState]);
  const formTitleRef = useRef();
  const navigate = useNavigate();

  const addField = () => {
    // fieldList에 새로운 필드 값 추가
    console.log('add new field');

    setFieldList((prevState) => {
      return [
        ...prevState,
        { ...initialState, id: 'field_' + uuidv4().slice(0, ID_LENGTH) },
      ];
    });
  };

  const removeField = useCallback((index) => {
    setFieldList((prevList) => {
      const newList = prevList.filter((field) => field.id !== index);
      return newList;
    });
  });

  const updateField = useCallback((newField) => {
    setFieldList((prevList) => {
      const newList = prevList.map((field) => {
        if (field.id === newField.id) {
          return newField;
        }
        return field;
      });
      return newList;
    });
  });

  useEffect(() => {
    console.log(fieldList);
    if (window.localStorage.getItem('forms')) {
      setForms(JSON.parse(window.localStorage.getItem('forms')));
    } else {
      window.localStorage.setItem('forms', []);
    }
  }, [fieldList]);

  console.log(forms, forms);

  const saveForm = () => {
    const currentForm = {
      formId: formId,
      title: formTitleRef.current.value,
      fields: fieldList,
    };
    const newForms = [...forms, currentForm];

    // 폼 제목, 필드 목록 값들 담은 객체를 localStorage 에 저장하기
    console.log('save form fields to local storage');

    window.localStorage.setItem('forms', JSON.stringify(newForms));
    navigate('/');
  };

  return (
    <Wrapper>
      <h1>폼 형식 생성</h1>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formTitle">제목</label>
        <input ref={formTitleRef} type="text" name="formTitle" id="formTitle" />
      </section>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <label>필드목록</label>
        {fieldList.map((field) => {
          return (
            <FormField
              key={field.id}
              fieldState={field}
              fieldList={fieldList}
              // setFieldList={setFieldList}
              updateField={updateField}
              onRemoveField={removeField}
            />
          );
        })}
      </section>
      <button id="add-field-button" onClick={addField}>
        필드 추가하기
      </button>
      <button onClick={saveForm}>저장하기</button>
      <DragnDrop />
    </Wrapper>
  );

  /* ------------------ 여기부터 원래 코드 ----------- */
  // // const [fieldList, setFieldList] = useState([initialState]);
  // const [fieldList, setFieldList] = useState(new Map([[initialState.id, initialState]]))
  // const [formState, setFormState] = useState({
  //   formId: uuidv4().slice(0, ID_LENGTH),
  // });
  // const formTitleRef = useRef();

  // const onSubmitHandler = useCallback((fieldFormData) => {
  //   // 저장하기 버튼 클릭시 각 필드의 input 값들 전부 저장하기
  //   setFieldList((prevList) => [...prevList, fieldFormData]);

  //   // 필드의 id 번호로 fieldList에서 해당하는 필드 내용 업데이트
  //   setFieldList()

  //   setFormState({
  //     formId: uuidv4(),
  //     title: formTitleRef.current.value,
  //     fieldList: [fieldFormData],
  //   });
  // }, []);

  // const getFieldInputs = () => {};

  // const saveForm = () => {
  //   console.log(formState);
  //   window.localStorage.setItem(formState.formId, JSON.stringify(formState));
  // };

  // const addField = () => {
  //   setFieldList((prev) => {
  //     return [
  //       ...prev,
  //       { ...initialState, id: 'field_' + uuidv4().slice(0, ID_LENGTH) },
  //     ];
  //   });
  // };
  // useEffect(() => {
  //   console.log(fieldList);
  //   console.log(formState);
  // }, [fieldList]);

  // return (
  //   <Wrapper>
  //     <h1>폼 형식 생성</h1>
  //     <section style={{ display: 'flex', flexDirection: 'column' }}>
  //       <label htmlFor="formTitle">제목</label>
  //       <input ref={formTitleRef} type="text" name="formTitle" id="formTitle" />
  //     </section>
  //     <section style={{ display: 'flex', flexDirection: 'column' }}>
  //       <label>필드목록</label>
  //       {fieldList.map((field, idx) => {
  //         return (
  //           <FormField
  //             key={idx}
  //             fieldState={field}
  //             onSubmitHandler={onSubmitHandler}
  //           />
  //         );
  //       })}
  //       {/* <FormField
  //         fieldState={fieldList[0]}
  //         onSubmitHandler={onSubmitHandler}
  //       /> */}
  //     </section>
  //     <button id="add-field-button" onClick={addField}>
  //       필드 추가하기
  //     </button>
  //     <button onClick={saveForm}>저장하기</button>
  //     <DragnDrop />
  //   </Wrapper>
  // );
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
