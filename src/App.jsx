import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Main from './pages/Main';
import styled from 'styled-components';
import Submit from './pages/Submit';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AllWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </AllWrapper>
    </Router>
  );
}

export default App;

const AllWrapper = styled.div`
  width: 1000px;
`;
