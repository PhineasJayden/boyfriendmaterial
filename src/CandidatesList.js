import React from "react";
import { Button } from "./Button";

export function CandidatesList({ candidates, activeCandidate, onSelection }) {
  return (
    <div>
      <ul>
        {candidates.map((candidate) => (
          <Candidate
            candidate={candidate}
            key={candidate.id}
            activeCandidate={activeCandidate}
            onSelection={onSelection}
          />
        ))}
      </ul>
    </div>
  );
}
function Candidate({ candidate, onSelection, activeCandidate }) {
  const isSelected = activeCandidate?.id === candidate.id;
  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => onSelection(candidate)}
    >
      <div className="Candidate">
        <img src={candidate.image} alt={candidate.name} />
        <h3>{candidate.name}</h3>
      </div>
      <Button>{isSelected ? "Close" : "Show"}</Button>
    </li>
  );
}
