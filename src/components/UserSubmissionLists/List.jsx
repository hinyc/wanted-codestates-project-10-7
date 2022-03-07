import React from 'react';
import styled, { css } from 'styled-components';

const ListC = React.forwardRef(({ children, setModalState }, ref) => {
  const ModalOpenHandler = () => setModalState(true);
  return (
    <div>
      <List onClick={ModalOpenHandler} ref={ref}>
        {children}
      </List>
    </div>
  );
});
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
  &:hover {
    background-color: rgb(188, 188, 188);
  }
`;
export default ListC;
