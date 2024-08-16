const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3';

const requestConfig = {
  headers: {
    Authorization: `Bearer ${HF_API_KEY}`, // Fixed the string interpolation
    'Content-Type': 'application/json'
  }
};

app.post('/api/question-answering', async (req, res) => {
  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: req.body.question },
      requestConfig
    );
    if (response.data && response.data[0]) {
      res.json({ answer: response.data[0].generated_text });
    } else {
      res.json({ answer: 'No answer generated.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error processing request');
  }
});

app.post('/api/summarize', async (req, res) => {
    try {
      const response = await axios.post(
        MODEL_URL,
        {
          inputs: `Please summarize the following text in no more than 150 words, capturing the main ideas and key points succinctly. Ensure the summary is clear, concise, and reflects the essence of the original content: ${req.body.text}`,
          parameters: {
            max_length: 150,
            min_length: 50,
            length_penalty: 2.0,
          }
        },
        requestConfig
      );
      
      if (response.data && response.data[0]) {
        res.json({ summary: response.data[0].generated_text });
      } else {
        res.json({ summary: 'No summary generated.' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Error processing request');
    }
  });

app.post('/api/generate-problems', async (req, res) => {
  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: `Generate practice problems for: ${req.body.topic}` },
      requestConfig
    );
    if (response.data && response.data[0]) {
      res.json({ problems: response.data[0].generated_text });
    } else {
      res.json({ problems: 'No problems generated.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error processing request');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Fixed the string interpolation
});
