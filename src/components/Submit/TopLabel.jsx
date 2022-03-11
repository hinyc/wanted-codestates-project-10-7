import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function TopLabel() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const setOnState = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  window.addEventListener('wheel', setOnState);

  return (
    <Container isScrolled={isScrolled}>
      <Wrapper>
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          &lt;
        </button>
        <Span style={{ fontSize: '20px' }}>데이터블 폼</Span>
        <button />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  top: 0;

  bottom: 0px;
  width: 100%;
  height: 76px;
  background-color: #ffffff;
  button {
    width: 50px;
    font-size: 24px;
    padding: 0 20px;
    color: #b2b2b2;
  }

  ${({ isScrolled }) => {
    if (!isScrolled) return;
    return css`
      box-shadow: 0px 15px 45px -10px rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: 0px 15px 45px -10px rgba(0, 0, 0, 0.1);
      -moz-box-shadow: 0px 15px 45px -10px rgba(0, 0, 0, 0.1);
    `;
  }}
  transition: all 0.3s ease;
  :hover {
    cursor: default;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 500px;
`;

const Span = styled.span``;
