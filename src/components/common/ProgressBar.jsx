import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ percent }) => {
  return (
    <Progress>
      <ProgressPercentBar percent={percent}>{percent}%</ProgressPercentBar>
    </Progress>
  );
};

const Progress = styled.div`
  width: 100%;
  margin-top: 5px;
  border: 1px solid #eee;
  border-radius: 5px;
`;
const ProgressPercentBar = styled.div`
  background-color: #69ac5d;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
  height: 20px;
  width: ${({ percent }) => (percent ? `${percent}%` : 0)};
  border-radius: 5px;
  transition: all 0.5s ease-in;
`;
export default ProgressBar;
