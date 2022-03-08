import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addSubmitData } from '../../modules/submit';

const DetailAddress = ({ userSelectAddress, setIsOpen, id }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const choiceAddress = useRef();
  const dispatch = useDispatch();
  const onButtonHandler = (e) => {
    if (choiceAddress.current.value.length) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const complateAddress = () => {
    dispatch(
      addSubmitData(id, userSelectAddress + choiceAddress.current.value),
    );
    setIsOpen(false);
  };

  return (
    <>
      <DetailAddressBox>
        <Label>주소</Label>
        <SelectAddress>{userSelectAddress}</SelectAddress>
        <Label>상세주소</Label>
        <UserDetailAddress
          placeholder="상세주소를 입력해 주세요 ✨"
          ref={choiceAddress}
          onChange={onButtonHandler}
        />
        <SaveButton disabled={!buttonDisabled} onClick={complateAddress}>
          저장
        </SaveButton>
      </DetailAddressBox>
    </>
  );
};

const DetailAddressBox = styled.div`
  width: 100%;
  min-width: 420px;
  height: 100%;
  min-height: 470px;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
  padding: 30px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.div`
  width: 100%;
  height: auto;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SelectAddress = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #aab8c2;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #f5f8fa;
  box-shadow: 0px 5px 10px rgba(200, 200, 200, 0.3);
  cursor: pointer;
`;

const UserDetailAddress = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 0.85rem;
  font-weight: bold;
  box-shadow: 0px 5px 10px rgba(200, 200, 200, 0.3);
  cursor: text;

  ::placeholder {
    color: #ccc;
  }

  :focus {
    outline: none;
    color: #00b9ff;
    background-color: #fff;
    transition: all 0.35s ease;
  }

  :not(:focus) {
    color: #aab8c2;
    background-color: #f5f8fa;
    transition: all 0.35s ease;
  }
`;

const SaveButton = styled.button`
  width: 55%;
  height: 45px;
  color: #fff;
  margin-top: 30px;
  font-size: 0.85rem;
  font-weight: bold;
  border-radius: 8px;
  background-color: #ff5a5f;
  box-shadow: 0px 5px 10px rgba(200, 200, 200, 0.3);
  cursor: pointer;

  ${(props) =>
    props.disabled
      ? `
  color: #aab8c2;
  background-color: #f5f8fa;
  cursor: default;
  `
      : ``}
`;

export default DetailAddress;
