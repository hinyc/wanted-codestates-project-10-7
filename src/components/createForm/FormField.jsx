import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icon-close.svg';
import { ReactComponent as UpDownArrow } from '../../assets/icon-up-down.svg';

const FormField = () => {
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <select>
          <option value="text">텍스트</option>
          <option value="phone">전화번호</option>
          <option value="address">주소</option>
          <option value="dropdown">드롭다운</option>
          <option value="file">첨부파일</option>
          <option value="license">이용약관</option>
        </select>
        <input type="text" id="labelName" />
        <CheckBox>
          <input type="checkbox" id="isRequired" />
          <label htmlFor="isRequired">필수</label>
        </CheckBox>
        <button className="drag-button">
          <UpDownArrow />
        </button>
        <button className="delete-button">
          <CloseIcon fill="#fff" />
        </button>
      </div>
      <div className="placeholder-description">
        <input type="text" placeholder="플레이스홀더 예" />
      </div>
    </Container>
  );
};
const Container = styled.section`
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

  #isRequired {
    border: none;
    margin: 0 5px;
  }
`;
export default FormField;
