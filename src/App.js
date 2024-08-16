import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import QuestionAnswering from './components/QuestionAnswering';
import Summarization from './components/Summarization';
import PracticeProblems from './components/PracticeProblems';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qa" element={<QuestionAnswering />} />
          <Route path="/summarize" element={<Summarization />} />
          <Route path="/generate" element={<PracticeProblems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

