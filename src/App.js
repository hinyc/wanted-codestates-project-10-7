import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Main from './pages/Main';
import CreateForm from './pages/CreateForm';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create-form" element={<CreateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
