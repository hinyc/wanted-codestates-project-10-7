import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Terms({ data, termsHandler }) {
  return (
    <Container>
      <Wrapper>
        <Top>
          <div className="arrow" onClick={termsHandler}>
            &lt;
          </div>
          {data.label}
          <div className="arrow"></div>
        </Top>
        <Content>{data.contents}</Content>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  top: 0px;
  left: 0px;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;
const Top = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  text-align: center;
  div.arrow {
    width: 60px;
    font-size: 30px;
    padding: 0 24px;
  }
`;

const Content = styled.div`
  padding: 24px;
`;
