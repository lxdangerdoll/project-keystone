import React from "react";

interface CrewMember {
  id: string;
  name: string;
  role: string;
  status: string;
}

interface CrewGridProps {
  crew: CrewMember[];
}

export default function CrewGrid({ crew }: CrewGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {crew.map((member) => (
        <div
          key={member.id}
          className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-lg hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold">{member.name}</h2>
          <p className="text-gray-400">{member.role}</p>
          <p
            className={
              member.status.toLowerCase() === "active"
                ? "text-green-400"
                : "text-red-400"
            }
          >
            Status: {member.status}
          </p>
        </div>
      ))}
    </div>
  );
}
