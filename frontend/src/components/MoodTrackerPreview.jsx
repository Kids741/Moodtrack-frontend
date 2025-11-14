// src/components/JournalPreview.jsx
export default function JournalPreview() {
  const recentEntries = [
    { date: "Aug 5, 2025", excerpt: "Feeling calm and productive today..." },
    { date: "Aug 4, 2025", excerpt: "A bit stressed but managed to pray and relax..." },
    { date: "Aug 3, 2025", excerpt: "Grateful for family and small wins..." },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Journal Entries
      </h2>

      <div className="space-y-4">
        {recentEntries.map((entry, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-400 pl-4 py-1 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
          >
            <p className="text-sm text-gray-500">{entry.date}</p>
            <p className="text-gray-700">{entry.excerpt}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-gradient-to-r from-blue-300 to-indigo-300 text-white py-2 px-4 rounded-xl font-medium shadow hover:opacity-90 transition-opacity">
        View All Entries
      </button>
    </div>
  );
}
