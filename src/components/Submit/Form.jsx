import React, { useState, useRef } from 'react';
import AttachmentFile from '../Fields/attachmentFile';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { addSubmitData, initSubmitData } from '../../modules/submit';
import SearchAddress from '../Fields/SearchAddress';
import Terms from './Terms';

export default function Form({ data }) {
  const [showVerification, setShowVerification] = useState(false);
  const [showOption, setShowOption] = useState('');
  const [showResearchModal, setShowResearchModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [agreementState, setAgreementState] = useState(false);
  const dispatch = useDispatch();

  const value = useRef('');
  const submitData = useSelector((state) => state.submit);
  const submitDataName = useSelector((state) => state.submit.Name);
  const submitDataPhone = useSelector((state) => state.submit.Phone);
  const id = data.id;
  const type = data.type;
  const eventHandler = (e) => {
    const currentValue = value.current.value;
    switch (data.type) {
      case 'text':
        if (e.type === 'change') {
          if (currentValue.length) setShowVerification(false);
          else setShowVerification(true);
          dispatch(addSubmitData(data.id, e.target.value));
        }
        if (e.type === 'focus') {
          if (!currentValue.length) setShowVerification(true);
        }

        break;
      case 'phone':
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
    if (id !== showOption) {
      setShowOption(id);
    }
  };
  //이벤트 블러 실행시 데이터 저장
  const backgroundHandler = () => setShowOption('');
  const searchHandler = () => setShowResearchModal(true);
  const agreementStateHandler = (e, id, state) => {
    e.stopPropagation();
    setAgreementState(!agreementState);
    dispatch(addSubmitData(id, state));
  };
  const termsHandler = () => {
    setShowTerms(!showTerms);
  };

  return (
    <Container>
      {type === 'text' && (
        <FormSt>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input
            ref={value}
            onChange={eventHandler}
            onFocus={eventHandler}
            onBlur={eventHandler}
            placeholder={data.placeholder && data.placeholder}
            value={submitDataName}
          />
          {id === 'name' ? (
            <div className="verification">
              {showVerification && '이름 항목은 필수 정보입니다.'}
            </div>
          ) : null}
        </FormSt>
      )}

      {type === 'phone' && (
        <FormSt>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <input onChange={eventHandler} value={submitDataPhone} />
        </FormSt>
      )}

      {type === 'address' && (
        <FormSt>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <div className="address-search" onClick={searchHandler}>
            {submitData[data.id]}
          </div>
          {showResearchModal && (
            <SearchAddress
              setIsOpen={() => setShowResearchModal(false)}
              id={data.id}
            />
          )}
        </FormSt>
      )}
      {type === 'select' && (
        <FormSt>
          <label>{data.required ? data.label : `${data.label}(선택)`}</label>
          <Select id={data.id} showOption={showOption}>
            <div
              className="current-selector"
              onClick={() => optionSelectHandler(data.id)}
            >
              {submitData[data.id]}
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
        </FormSt>
      )}

      {type === 'file' && (
        <InputFile>
          <AttachmentFile data={data} />
          <div
            className=" description"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </InputFile>
      )}

      {type === 'agreement' && (
        <Agreement>
          <div className="miniWrap">
            <div
              className="check"
              onClick={(e) => {
                agreementStateHandler(e, data.id, 'true');
              }}
            >
              {agreementState && (
                <div
                  className="symbol"
                  onClick={(e) => {
                    agreementStateHandler(e, data.id, 'false');
                  }}
                >
                  ✔︎
                </div>
              )}
            </div>
            <div className="text">{`${data.label} (필수)`}</div>
          </div>
          <div className="arrow" onClick={termsHandler}>
            &gt;
          </div>
          {showTerms && <Terms data={data} termsHandler={termsHandler} />}
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
`;
const FormSt = styled.div`
  width: 100%;

  label {
    font-weight: 700;
    font-size: 12px;
  }
  div.verification {
    height: 12px;
    font-size: 12px;
    color: #ff5a5f;
    margin-top: 8px;
  }
  div.addFileText {
    font-size: 10px;
    color: #adacad;
    margin: 10px 0;
  }
  div.address-search {
    width: 100%;
    height: 48px;
    line-height: 48px;
    padding-left: 15px;
    background-color: #f5f8fa;
    border-radius: 10px;

    :hover {
      border: 1px solid #00b9ff;
      cursor: text;
    }
  }

  input {
    width: 100%;
    height: 48px;
    outline: none;
    background-color: #f5f8fa;
    border-radius: 10px;
    padding: 0 15px;
    margin-top: 10px;
    :hover {
      border: 1px solid #00b9ff;
      cursor: text;
    }
    :focus {
      border: 1px solid #00b9ff;
    }
    ::placeholder {
      color: #9da5ac;
      font-weight: 700;
    }
  }

  input.file {
    width: 90%;
    /* height: 200px; */

    :hover {
      cursor: pointer;
    }
  }
`;

const InputFile = styled.div`
  .description {
    margin-top: 15px;
  }
`;

const Select = styled.div`
  margin-top: 10px;
  height: 48px;
  outline: none;
  background-color: #f5f8fa;
  border-radius: 10px;
  padding: 0 15px;
  position: relative;

  div.current-selector {
    height: 100%;
    line-height: 48px;
    font-size: 18px;
    font-weight: 700;
  }
  :hover {
    border: 1px solid #00b9ff;
    cursor: text;
  }

  ${({ id, showOption }) => {
    if (id === showOption) {
      return css`
        border-radius: 10px 10px 0 0;
        border: 1px solid #666;
        :hover {
          border: 1px solid #666;
        }
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
  z-index: 90;

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
  height: 32px;
  font-size: 16px;
  font-weight: 700;
  margin-top: 24px;
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
    /* overflow: hidden; */
    position: relative;
    :hover {
      cursor: pointer;
    }
    .symbol {
      border-radius: 50%;
      background-color: #ff5a5f;
      color: #fff;
      font-size: 12px;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      top: -1px;
      left: -1px;
      :hover {
        cursor: pointer;
      }
    }
  }
  div.arrow {
    color: #8d959d;
    font-size: 16px;
    :hover {
      cursor: pointer;
    }
  }
`;
