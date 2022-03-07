import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addSubmitData, initSubmitData } from '../../modules/submit';

export default function Form({ data }) {
  const [showVerification, setShowVerification] = useState(false);
  const [selectOption, setSelectOption] = useState(true);
  const dispatch = useDispatch();

  const value = useRef('');
  const id = data.id;
  const type = data.type;
  const submitData = useSelector((state) => state.submit);

  const eventHandler = (e) => {
    const currentValue = value.current.value;
    switch (data.type) {
      case 'text':
        if (e.type === 'change') {
          if (currentValue.length) setShowVerification(false);
          else setShowVerification(true);
        }
        if (e.type === 'focus') {
          if (!currentValue.length) setShowVerification(true);
        }
        break;
      case 'select':
        console.log(e.target.value);
        dispatch(addSubmitData(data.id, e.target.value));
        setSelectOption('');
        console.log(submitData);

        break;
      default:
        break;
    }
  };

  const optionSelectHandler = (id) => {
    console.log('click');
    if (id !== selectOption) {
      setSelectOption(id);
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
            onChange={eventHandler}
            onFocus={eventHandler}
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
          <Select>
            <div
              className="currentSelector"
              onClick={() => optionSelectHandler(data.id)}
            >
              {submitData[data.id] || data.options[0]}
            </div>
            {selectOption === data.id && (
              <OptionWrapper>
                {data.options.map((el, idx) => (
                  <option ref={value} key={idx} onClick={eventHandler}>
                    {el}
                  </option>
                ))}
              </OptionWrapper>
            )}
          </Select>
        </form>
      )}

      {type === 'file' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input type="file" />
        </form>
      )}

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

const Select = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 48px;
  outline: none;
  background-color: #f8f9fb;
  border-radius: 10px;
  padding: 0 15px;
  border: 1px solid #666;
  border-radius: 10px 10px 0 0;
  position: relative;
  div.currentSelector {
    width: 100%;
    height: 100%;
    line-height: 48px;
    font-size: 18px;
    font-weight: 700;
  }
`;
const OptionWrapper = styled.div`
  border: 1px solid #666;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 48px;
  left: 0px;
  background-color: #f7fafb;
  option {
    height: 48px;
    line-height: 48px;
    padding: 0 15px;
    font-size: 18px;
    font-weight: 700;
    :hover {
      background-color: #e0e5e8;
    }
  }
`;

const Agreement = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
