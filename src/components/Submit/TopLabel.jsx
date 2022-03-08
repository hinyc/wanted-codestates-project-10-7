import getRangeBoundingClientRect from 'draft-js/lib/getRangeBoundingClientRect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function SubmitButton() {
  const [submitState, setSubmitState] = useState(false);
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
  const submitDate = useSelector((state) => state.submit);
  useEffect(() => {
    console.log(submitDate);
  }, [submitDate]);

  return (
    <Container isScrolled={isScrolled}>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        홈가기
      </button>
      <span style={{ fontSize: '20px' }}>데이터블 폼</span>
    </Container>
  );
}

const Container = styled.button`
  position: fixed;
  top: 0;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 76px;
  background-color: #ffffff;
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
