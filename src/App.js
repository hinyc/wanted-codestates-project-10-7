import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Main from './pages/Main';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AllWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </AllWrapper>
    </Router>
  );
}

export default App;

const AllWrapper = styled.div`
  width: 1000px;
`;
