import React, { useState, useEffect } from "react";

export default function JournalPage() {
  const [entry, setEntry] = useState("");
  const [savedEntries, setSavedEntries] = useState([]);

  // Load saved entries when the page loads
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setSavedEntries(stored);
  }, []);

  const saveEntry = () => {
    if (!entry.trim()) return;
    const newEntries = [
      { text: entry, date: new Date().toLocaleString() },
      ...savedEntries
    ];
    setSavedEntries(newEntries);
    localStorage.setItem("journalEntries", JSON.stringify(newEntries));
    setEntry("");
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-sky-600">Mood Journal</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full border p-4 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-sky-400"
        placeholder="How are you feeling today?"
      ></textarea>
      <button
        onClick={saveEntry}
        className="mt-4 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg shadow"
      >
        Save Entry
      </button>

      {/* Display saved entries */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
        {savedEntries.length === 0 ? (
          <p className="text-gray-500">No entries yet.</p>
        ) : (
          <ul className="space-y-4">
            {savedEntries.map((e, i) => (
              <li
                key={i}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <p className="text-sm text-gray-500 mb-2">{e.date}</p>
                <p>{e.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
