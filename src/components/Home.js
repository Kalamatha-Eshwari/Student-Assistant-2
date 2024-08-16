import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Intelligent Study Assistant</h1>
      <nav>
        <ul>
          <li><Link to="/qa">Question Answering</Link></li>
          <li><Link to="/summarize">Text Summarization</Link></li>
          <li><Link to="/generate">Practice Problems</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
