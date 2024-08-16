import React, { useState } from 'react';
import axios from 'axios';

function QuestionAnswering() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/question-answering', { question });
      // Log response to verify its structure
      console.log('Response Data:', response.data);

      // Ensure we access the correct field
      if (response.data && response.data.answer) {
        setAnswer(response.data.answer);
      } else {
        setError('Unexpected response format.');
      }
    } catch (error) {
      console.error('Error fetching answer:', error);
      setError('An error occurred while fetching the answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="form-control mb-3"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        {loading ? 'Loading...' : 'Submit'}
      </button>
      <div className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        <h4>Answer:</h4>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default QuestionAnswering;

