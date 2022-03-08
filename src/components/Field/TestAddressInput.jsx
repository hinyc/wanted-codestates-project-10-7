import React, { useState } from 'react';
import styled from 'styled-components';
import SearchAddress from './SearchAddress';

const TestAddressInput = () => {
  // 주소 기능 테스트용 컴포넌트 삭제해도 됨
  const [isOpen, setIsOpen] = useState(false);
  const openHandler = () => {
    setIsOpen(true);
  };
  return (
    <React.Fragment>
      <AddressInputBox>
        <Label>주소</Label>
        <ClickBox onClick={openHandler} />
      </AddressInputBox>
      {isOpen ? <SearchAddress setIsOpen={setIsOpen} /> : null}
    </React.Fragment>
  );
};

const AddressInputBox = styled.div`
  width: 100%;
  height: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.div`
  width: 100%;
  height: auto;
  text-align: left;
  font-weight: bold;
`;

const ClickBox = styled.div`
  width: 100%;
  height: 50px;
  background: #f5f8fa;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
`;

export default TestAddressInput;
