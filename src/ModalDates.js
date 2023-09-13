import React from "react";

export function ModalDates({ meetings, onsetRelationship, boyfriend }) {
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
            <input
              type="checkbox"
              onChange={() => onsetRelationship(candidate.id)}
              id={candidate.id}
              disabled={
                boyfriend && candidate.boyfriend === false ? true : false
              }
            ></input>
            <label>I want to date {candidate.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
