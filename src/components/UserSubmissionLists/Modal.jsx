import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = ({ setModalState }) => {
  const [state, setState] = useState(true);
  const toggleState = (e) => {
    if (e.target !== e.currentTarget) return;
    setModalState(false);
    setState(!state);
  };
  return (
    <div>
      {state && (
        <>
          <ModalBackground onClick={toggleState}>
            <ModalWindow>
              <P>제출 내용</P>
              안녕하세요 폼입니다. 안녕하세요 폼입니다. 안녕하세요 폼입니다.
              안녕하세요 폼입니다.
              <CloseBtn onClick={toggleState}>X</CloseBtn>
            </ModalWindow>
          </ModalBackground>
        </>
      )}
    </div>
  );
};
const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #6464645d;
  z-index: 5;
`;
const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 200px;
  transform: translate(-50%, -50%);
  color: color;
  background-color: white;
  border-radius: 6px;
  padding: 20px;
  z-index: 10;
`;
const P = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  color: #000000;
  background-color: transparent;
  border: 0;
  font-size: 1.3rem;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 8px 12px;
  margin: 8px;
  cursor: pointer;
`;
export default Modal;
