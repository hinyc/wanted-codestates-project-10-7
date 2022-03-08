import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Main from './pages/Main';
import CreateForm from './pages/CreateForm';
import styled from 'styled-components';
import Submit from './pages/Submit';
import UserSubmissionList from './pages/UserSubmissionLists';
import DragnDrop from './components/createForm/DragnDrop';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AllWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/dragdrop" element={<DragnDrop />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/submission" element={<UserSubmissionList />} />
        </Routes>
      </AllWrapper>
    </Router>
  );
}

export default App;

const AllWrapper = styled.div`
  width: 500px;
  height: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
