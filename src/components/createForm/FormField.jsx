import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icon-close.svg';
import { ReactComponent as UpDownArrow } from '../../assets/icon-up-down.svg';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DropDownOptionInput from './DropDownOptionInput';

import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const initialState = {
  type: 'text',
  label: '',
  required: false,
  placeholder: '',
  description: '',
  options: [],
  contents: '',
};

const FormField = ({ onSubmitHandler }) => {
  const [formState, setFormState] = useState(initialState);

  const [selectedType, setSelectedType] = useState('text');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const isRequiredRef = useRef();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);

    setFormState((prevState) => ({
      ...prevState,
      description: markup,
    }));
  }, [editorState]);

  const onInputChangeHandler = (e) => {
    // console.log(e.target);
    setFormState((prevState) => ({
      ...prevState,
      required: isRequiredRef.current.checked,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    // console.log(formState);
    onSubmitHandler(formState);
  }, [formState]);

  const setSelectValue = ({ target: { value } }) => {
    setSelectedType(value);
  };

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <select
          name="type"
          onChange={setSelectValue}
          // onChange={onInputChangeHandler}
        >
          <option value="text">텍스트</option>
          <option value="phone">전화번호</option>
          <option value="address">주소</option>
          <option value="select">드롭다운</option>
          <option value="file">첨부파일</option>
          <option value="agreement">이용약관</option>
        </select>
        <input
          name="label"
          type="text"
          id="label"
          value={formState.label}
          onChange={onInputChangeHandler}
        />
        <CheckBox>
          <input
            name="required"
            type="checkbox"
            id="required"
            ref={isRequiredRef}
          />
          <label htmlFor="required">필수</label>
        </CheckBox>
        <button className="drag-button">
          <UpDownArrow />
        </button>
        <button className="delete-button">
          <CloseIcon fill="#fff" />
        </button>
      </div>
      <div className="placeholder-description">
        {selectedType === 'select' ? (
          <DropDownOptionInput />
        ) : (
          <input type="text" placeholder="플레이스홀더 예" />
        )}
      </div>
      <EditorWrapper>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: [
              'inline',
              'list',
              'image',
              'embedded',
              'link',
              'blockType',
            ],
            inline: {
              options: ['bold', 'italic', 'strikethrough', 'underline'],
            },
            list: { options: ['unordered', 'ordered'] },
            link: { options: ['link'] },
            blockType: {
              isDropdown: false,
              options: ['Normal', 'H1', 'H2', 'H3'],
            },
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </EditorWrapper>
    </Container>
  );
};
const Container = styled.form`
  width: 100%;
  border: 1px solid #f2f2f2;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input:focus {
    outline: none;
  }

  select {
    width: 25%;
    height: 36px;
    border: none;
    border-right: 1px solid #f2f2f2;
    border-radius: 7px 0 0 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 15px;
    padding: 0 10px;

    option {
      background-color: #fff;
    }
  }
  #labelName {
    width: 50%;
    height: 36px;
    padding: 5px;
    border-right: 1px solid #f2f2f2;
    font-size: 15px;
    font-weight: 600;
    line-height: 15px;
  }
  button {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      width: 13px;
      height: 13p;
    }
  }
  .delete-button {
    background-color: #ff4545;
    border-radius: 0 7px 0 0;
  }

  .placeholder-description {
    width: 100%;
    height: 36px;
    padding: 0 10px;
    border-top: 1px solid #f2f2f2;

    input {
      width: 100%;
      height: 100%;
      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
    }
  }
`;
const CheckBox = styled.div`
  width: 55px;
  height: 36px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;

  #required {
    border: none;
    margin: 0 5px;
  }
`;
const EditorWrapper = styled.div`
  width: 100%;

  .wrapper-class {
    // height: 100%;
  }
  .editor-class {
    // height: 100%;
    padding: 0 10px;
  }
`;
export default FormField;
