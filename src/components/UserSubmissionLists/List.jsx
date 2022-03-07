import React from 'react';
import styled, { css } from 'styled-components';

export default function UserSubmissionList({ children }) {
  return (
    <div>
      <List>{children}</List>
    </div>
  );
}
const List = styled.div`
  width: 400px;
  height: 50px;
  background-color: rgb(238, 238, 238);
  text-align: center;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 10px 24px;
  border-radius: 6px;
  margin-bottom: 20px;
  cursor: pointer;
`;
