import React from "react";

const people = [
  {
    name: "Naresh Kumar",
    role: "Research Scholar",
    dept: "DLIS, University of Delhi",
    email: "nareshkumar@cuh.ac.in",
  },
  {
    name: "Dr. Margam Madhusudhan",
    role: "Professor",
    dept: "DLIS, University of Delhi",
    email: "mmadhusudhan@libinfosci.du.ac.in",
  },
];

const Contact = () => {
  return (
    <div className="w-full min-h-full rounded-lg bg-blue-50 flex flex-col items-center p-6 shadow-lg">
      <div className="max-w-3xl w-full mx-auto py-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          Contact Us
        </h1>

        <div className="grid sm:grid-cols-2 gap-8">
          {people.map((p) => (
            <div
              key={p.email}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-1 border-t-4 border-blue-600"
            >
              <h2 className="text-xl font-bold text-gray-800">{p.name}</h2>
              <p className="text-gray-600 font-medium">{p.role}</p>
              <p className="text-gray-500 text-sm">{p.dept}</p>
              <a
                href={`mailto:${p.email}`}
                className="mt-3 text-blue-600 hover:text-blue-800 font-medium break-all transition-colors"
              >
                {p.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
