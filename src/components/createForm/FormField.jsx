import React, { useRef, useState } from 'react';
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

const FormField = React.memo(function FormField({
  fieldState,
  fieldList,
  updateField,
  onRemoveField,
}) {
  const [selectedType, setSelectedType] = useState('text');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorAsHtml, setEditorAsHtml] = useState();
  const requiredRef = useRef();
  const labelRef = useRef();
  const placeholderRef = useRef();

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // draft.js로 입력 받은 내용 html 형태로 변환해서 저장
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlState = draftToHtml(rawContentState);
    setEditorAsHtml(htmlState);

    // 에디터 내용이 바뀌지 않았을 경우 상태 값 업데이트 하지 않고 리턴
    if (htmlState === editorAsHtml) {
      return;
    }

    // 이용약관 항목이 필드 값으로 선택된 경우 description이 아닌 contents 에 값 저장
    if (selectedType === 'agreement') {
      updateField({
        ...fieldState,
        contents: editorAsHtml,
      });

      return;
    }

    // 그 외 일반적인 경우
    const newFieldState = {
      ...fieldState,
      description: htmlState,
    };

    updateField(newFieldState);
  };

  const setSelectValue = ({ target: { value } }) => {
    setSelectedType(value);

    const newFieldState = {
      ...fieldState,
      type: value,
    };
    // 부모 컴포넌트에 변경된 필드 상태 전달
    updateField(newFieldState);
  };

  const removeClickHandler = () => {
    onRemoveField(fieldState.id);
  };

  const onChangeInputHandler = (e) => {
    // 필수 여부 체크박스 상태가 변경된 경우
    if (e.target.name === 'required') {
      updateField({
        ...fieldState,
        required: requiredRef.current.checked,
      });

      return;
    }

    // 그 외 필드 인풋 값이 바뀐 경우
    const newFieldState = {
      ...fieldState,
      // required: requiredRef.current.checked,
      [e.target.name]: e.target.value,
    };

    // 부모 컴포넌트에 변경된 필드 상태 전달
    updateField(newFieldState);
  };

  const changeOptions = (newOptions) => {
    const newFieldState = {
      ...fieldState,
      options: newOptions,
    };

    updateField(newFieldState);
  };

  return (
    <FormContainer>
      <RequiredInputs>
        <select name="type" onChange={setSelectValue} value={selectedType}>
          <option value="text">텍스트</option>
          <option value="phone">전화번호</option>
          <option value="address">주소</option>
          <option value="select">드롭다운</option>
          <option value="file">첨부파일</option>
          <option value="agreement">이용약관</option>
        </select>
        <FieldLabelInput
          ref={labelRef}
          name="label"
          type="text"
          id="label"
          onChange={onChangeInputHandler}
          value={fieldState.label}
        />
        <CheckBox>
          <input
            name="required"
            type="checkbox"
            id={`required_${fieldState.id}`}
            ref={requiredRef}
            onChange={onChangeInputHandler}
          />
          <label htmlFor={`required_${fieldState.id}`}>필수</label>
        </CheckBox>
        <button className="drag-button">
          <UpDownArrow />
        </button>
        <button className="delete-button" onClick={removeClickHandler}>
          <CloseIcon fill="#fff" />
        </button>
      </RequiredInputs>
      <div className="placeholder-description">
        {/* {selectedType === 'select' ? (
          <DropDownOptionInput
            options={fieldState.options}
            changeOptions={changeOptions}
          />
        ) : (
          <input
            name="placeholder"
            ref={placeholderRef}
            type="text"
            placeholder="플레이스홀더 예"
            value={fieldState.placeholder}
            onChange={onChangeInputHandler}
          />
        )} */}
        {selectedType === 'select' ? (
          <DropDownOptionInput
            options={fieldState.options}
            changeOptions={changeOptions}
          />
        ) : selectedType === 'text' || selectedType === 'phone' ? (
          <input
            name="placeholder"
            ref={placeholderRef}
            type="text"
            placeholder="플레이스홀더 예"
            value={fieldState.placeholder}
            onChange={onChangeInputHandler}
          />
        ) : (
          ''
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
    </FormContainer>
  );
});
const FormContainer = styled.div`
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
    height: auto;
    padding: 0 10px;
    // border-top: 1px solid #f2f2f2;

    input {
      width: 100%;
      height: 36px;
      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
    }
  }
`;
const RequiredInputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #f2f2f2;
`;
const FieldLabelInput = styled.input`
  width: 50%;
  height: 36px;
  padding: 5px 10px;
  border-right: 1px solid #f2f2f2;
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
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
