import React, { useEffect, useState } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    const res = await fetch('http://localhost:5000/api/entries');
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="App">
      <h1>🧠 MoodTrack</h1>
      <EntryForm onNewEntry={fetchEntries} />
      <EntryList entries={entries} />
    </div>
  );
}

export default App;
