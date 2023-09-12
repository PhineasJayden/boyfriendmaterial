import React from "react";
import { TopMatches } from "./TopMatches";

export function TopMatchesList({ candidates, onSetMeeting, meetings }) {
  return (
    <>
      <h3>Top Matches</h3>
      <ol>
        {candidates
          .filter((candidate) => candidate.rating > 0)
          .sort((a, b) => Number(b.rating) - Number(a.rating))
          .map((candidate) => (
            <TopMatches
              candidate={candidate}
              meetings={meetings}
              onSetMeeting={onSetMeeting}
              key={candidate.id}
            />
          ))}
      </ol>
    </>
  );
}
