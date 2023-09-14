import React from "react";

export function ModalDates({ meetings, onsetRelationship}) {
  return (
    <div>
      <h2>Enjoy Your Dates</h2>
      <ul>
        {meetings.map((candidate) => (
          <li key={candidate.name}>
            <div className="dateInfo">
              <h3>{candidate.name}</h3>
              <img src={candidate.image} alt={candidate.name} />
              <span>{candidate.dateInfo}</span>
            </div>
          </li>
        ))}
      </ul>
      <select onChange={(e) => onsetRelationship(e.target.value)}>
        <option value="" selected disabled hidden>
          Choose a Boyfriend!
        </option>
        <option value={meetings[0]?.id}>{meetings[0]?.name}</option>
        <option value={meetings[1]?.id}>{meetings[1]?.name}</option>
        <option value={meetings[2]?.id}>{meetings[2]?.name}</option>
      </select>
    </div>
  );
}
