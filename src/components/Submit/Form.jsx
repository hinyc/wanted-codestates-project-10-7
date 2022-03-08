import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { addSubmitData, initSubmitData } from '../../modules/submit';

export default function Form({ data }) {
  const [showVerification, setShowVerification] = useState(false);
  const [showOption, setShowOption] = useState('');
  const [agreementState, setAgreementState] = useState(false);
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
        if (e.type === 'blur' && !showVerification) {
          dispatch(addSubmitData(data.id, e.target.value));
        }
        break;
      case 'phone':
        const num = e.target.value;
        console.log(num);
        dispatch(addSubmitData(data.id, e.target.value));
        break;
      case 'select':
        dispatch(addSubmitData(data.id, e.target.value));
        setShowOption('');

        break;

      default:
        break;
    }
  };

  const optionSelectHandler = (id) => {
    console.log('click');
    console.log(id, showOption);
    if (id !== showOption) {
      setShowOption(id);
    }
  };
  //이벤트 블러 실행시 데이터 저장
  const backgroundHandler = () => {
    // 정상 기능동작 않함, 수정필요
    setShowOption('');
  };

  return (
    <Container>
      {type === 'text' && (
        <form>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input
            ref={value}
            onChange={eventHandler}
            onFocus={eventHandler}
            onBlur={eventHandler}
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
          <input onBlur={eventHandler} />
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
          <Select id={data.id} showOption={showOption}>
            <div
              className="currentSelector"
              onClick={() => optionSelectHandler(data.id)}
            >
              {submitData[data.id] || data.options[0]}
            </div>
            <BackGround onClick={backgroundHandler} />
            {showOption === data.id && (
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
          <div className="miniWrap">
            <div className="check"></div>
            <div className="text">{`${data.label} (필수)`}</div>
          </div>
          <div className="arrow">&gt;</div>
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
    /* width: 100%; */
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

  .file {
    width: 90%;
    height: 100px;
    :hover {
      cursor: pointer;
    }
  }
`;

const Select = styled.div`
  margin-top: 10px;
  height: 48px;
  outline: none;
  background-color: #f8f9fb;
  border-radius: 10px;
  padding: 0 15px;
  position: relative;
  div.currentSelector {
    height: 100%;
    line-height: 48px;
    font-size: 18px;
    font-weight: 700;
  }
  ${({ id, showOption }) => {
    if (id === showOption) {
      return css`
        border-radius: 10px 10px 0 0;
        border: 1px solid #666;
      `;
    }
  }}
`;

const OptionWrapper = styled.div`
  width: 500px;
  border: 1px solid #666;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 46px;
  left: -1px;
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

const BackGround = styled.div`
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  height: 100vh;
  z-index: -2;
`;

const Agreement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  .miniWrap {
    display: flex;
    align-items: center;
  }
  div.check {
    width: 20px;
    height: 20px;
    border: 1px solid #d6d9dc;
    border-radius: 50%;
    margin-right: 10px;
  }
  div.arrow {
    color: #8d959d;
    font-size: 20px;
  }
`;
