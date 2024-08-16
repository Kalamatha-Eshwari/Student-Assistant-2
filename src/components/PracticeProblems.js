import React, { useState } from 'react';
import axios from 'axios';

function PracticeProblems() {
  const [topic, setTopic] = useState('');
  const [problems, setProblems] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-problems', { topic });
      setProblems(response.data.problems);
    } catch (error) {
      console.error('Error generating problems:', error);
      setProblems('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Generate Practice Problems</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic for practice problems"
        className="form-control mb-3"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        {loading ? 'Loading...' : 'Submit'}
      </button>
      <div className="mt-3">
        <h4>Practice Problems:</h4>
        <ul>
          {problems.split('\n').map((problem, index) => (
            <li key={index}>{problem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PracticeProblems;
