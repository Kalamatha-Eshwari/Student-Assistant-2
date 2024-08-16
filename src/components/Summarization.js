import React, { useState } from 'react';
import axios from 'axios';

function Summarization() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/summarize', { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSummary('An error occurred.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Summarize Text</h2>
      <textarea
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize"
        className="form-control mb-3"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        {loading ? 'Loading...' : 'Submit'}
      </button>
      <div className="mt-3">
        <h4>Summary:</h4>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default Summarization;
