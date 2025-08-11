import React from 'react';

function EntryList({ entries }) {
  return (
    <div>
      <h2>Past Entries</h2>
      {entries.map(entry => (
        <div key={entry._id} className="entry">
          <p><strong>{entry.mood}</strong> — {new Date(entry.date).toLocaleDateString()}</p>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
}

export default EntryList;
