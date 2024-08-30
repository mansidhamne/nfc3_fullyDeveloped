'use client';

import { useState } from 'react';
import axios from 'axios';

const StudyGpt = () => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/study-gpt/suggestions', // Directly call your NestJS backend
        { prompt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSuggestions(response.data.choices.map((choice: any) => choice.text));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Study GPT</h2>
      <textarea
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your study prompt here..."
      />
      <button onClick={fetchSuggestions} disabled={loading}>
        {loading ? 'Loading...' : 'Get Suggestions'}
      </button>
      <div>
        {suggestions.map((suggestion, index) => (
          <div key={index}>{suggestion}</div>
        ))}
      </div>
    </div>
  );
};

export default StudyGpt;
