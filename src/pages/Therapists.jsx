import { useState } from "react";

const therapists = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    specialty: "Anxiety & Depression",
    availability: "Mon - Fri, 9am - 5pm",
  },
  {
    id: 2,
    name: "Mr. John Smith",
    specialty: "Stress & Burnout",
    availability: "Tue - Sat, 10am - 6pm",
  },
  {
    id: 3,
    name: "Dr. Amina Hassan",
    specialty: "Child & Adolescent Therapy",
    availability: "Mon - Thu, 8am - 2pm",
  },
];

export default function Therapists() {
  const [search, setSearch] = useState("");

  const filteredTherapists = therapists.filter((therapist) =>
    therapist.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Connect to Therapists</h1>
      <p className="text-gray-700 mb-6">
        Browse licensed therapists and book a session that fits your needs.
      </p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by specialty..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded-lg mb-8 focus:ring focus:ring-blue-300"
      />

      {/* Therapist cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              className="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-xl font-semibold">{therapist.name}</h2>
              <p className="text-gray-600">{therapist.specialty}</p>
              <p className="text-sm text-gray-500 mt-1">
                Availability: {therapist.availability}
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Book Session
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No therapists found for this specialty.</p>
        )}
      </div>
    </div>
  );
}
