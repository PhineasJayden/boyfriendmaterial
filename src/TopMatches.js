import React from "react";

export function TopMatches({ candidate, meetings, onSetMeeting }) {
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => onSetMeeting(candidate.id)}
        id={candidate.id}
        disabled={
          meetings.length === 3 && candidate.meeting === false ? true : false
        }
      />
      {candidate.name} ({candidate.rating})
    </li>
  );
}
