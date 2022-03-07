import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import AttachmentFile from '../Fields/attachmentFile';
export default function Form({ data }) {
  const [showVerification, setShowVerification] = useState(false);
  const value = useRef('');
  const id = data.id;
  const type = data.type;

  const verificationHandler = (e) => {
    const currentValue = value.current.value;
    if (e.type === 'change') {
      if (currentValue.length) setShowVerification(false);
      else setShowVerification(true);
    }
    if (e.type === 'focus') {
      if (!currentValue.length) setShowVerification(true);
    }
  };

  //이벤트 블러 실행시 데이터 저장

  return (
    <Container>
      {type === 'text' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input
            ref={value}
            onChange={verificationHandler}
            onFocus={verificationHandler}
            placeholder={data.placeholder && data.placeholder}
          />
          {id === 'name' ? (
            <div className="verification">
              {showVerification && '이름 항목은 필수 정보입니다.'}
            </div>
          ) : null}
        </form>
      )}

      {type === 'phone' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input />
        </form>
      )}

      {type === 'address' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input />
        </form>
      )}
      {type === 'select' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <div>
            <select>
              {data.options.map((el) => (
                <option>{el}</option>
              ))}
            </select>
          </div>
        </form>
      )}
      {type === 'file' && <AttachmentFile data={data} />}

      {type === 'agreement' && (
        <Agreement>
          <div className="check"></div>
          <div>{`${data.label} (필수)`}</div>
          <div className="arrow"></div>
        </Agreement>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  form {
    width: 100%;
  }
  label {
    font-weight: 700;
    font-size: 12px;
    width: 100%;
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
    padding: 0 15px;
    margin-top: 10px;
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

const Select = styled.div``;
const Agreement = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
