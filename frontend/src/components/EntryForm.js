import React, { useState } from 'react';

function EntryForm({ onNewEntry }) {
  const [mood, setMood] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mood, content }),
    });
    setMood('');
    setContent('');
    onNewEntry(); // Refresh entry list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Mood (e.g. Happy, Stressed)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        required
      />
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default EntryForm;
