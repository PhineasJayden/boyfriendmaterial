import React, { useState } from "react";
import "./index.css";
import { candidatesStart } from "./Candidates.js";
import { Tutorial } from "./Tutorial";
import { Button } from "./Button";
import { Header } from "./Header";
import { CandidatesList } from "./CandidatesList";
import { CandidateInfo } from "./CandidateInfo";

export default function App() {
  const [candidates, setCandidates] = useState(candidatesStart);

  const [activeCandidate, setActiveCandidate] = useState(null);

  const meetings = candidates.filter((candidate) => candidate.meeting === true);

  function handleActiveCandidate(candidate) {
    setActiveCandidate((cur) => (cur?.id === candidate.id ? null : candidate));
  }

  function handleSubmitRating(value) {
    setCandidates((candidates) =>
      candidates.map((candidate) =>
        candidate.id === activeCandidate.id
          ? {
              ...candidate,
              rating: value.rating,
              ratingValues: {
                looks: value.looks,
                hobbies: value.hobbies,
                character: value.character,
                husband: value.husband,
              },
            }
          : candidate
      )
    );
    setActiveCandidate(null);
  }

  function handleSetMeeting(id) {
    setCandidates((candidates) =>
      candidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              meeting: !candidate.meeting,
            }
          : candidate
      )
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="sidebar-left">
          <CandidatesList
            candidates={candidates}
            activeCandidate={activeCandidate}
            onSelection={handleActiveCandidate}
          />
        </div>
        <div className="main">
          {activeCandidate ? (
            <CandidateInfo
              activeCandidate={activeCandidate}
              onSubmitRating={handleSubmitRating}
            />
          ) : (
            <Tutorial />
          )}
        </div>
        <div className="sidebar-right">
          <TopMatchesList
            candidates={candidates}
            onSetMeeting={handleSetMeeting}
            meetings={meetings}
          />
          <Button>Submit your Dates</Button>
        </div>
        <ModalDates />
        <ModalSex />
        <ModalWedding />
      </div>
    </>
  );
}
function TopMatchesList({ candidates, onSetMeeting, meetings }) {
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

function TopMatches({ candidate, meetings, onSetMeeting }) {
  console.log(meetings.length);
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
      {candidate.name}
    </li>
  );
}

function ModalDates() {
  return (
    <div>
      <Modal>Dates</Modal>
    </div>
  );
}

function ModalSex() {
  return (
    <div>
      <Modal>Sex</Modal>
    </div>
  );
}

function ModalWedding() {
  return (
    <div>
      <Modal>Wedding</Modal>
    </div>
  );
}

function Modal() {
  return <div className="Modal"></div>;
}
