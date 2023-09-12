import React, { useState } from "react";
import "./index.css";
import { candidatesStart } from "./Candidates.js";
import { Tutorial } from "./Tutorial";
import { Button } from "./Button";
import { Header } from "./Header";
import { CandidatesList } from "./CandidatesList";
import { CandidateInfo } from "./CandidateInfo";
import { TopMatchesList } from "./TopMatchesList";

export default function App() {
  const [candidates, setCandidates] = useState(candidatesStart);

  const [activeCandidate, setActiveCandidate] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const meetings = candidates.filter((candidate) => candidate.meeting === true);

  //const topTwo = null;

  //const husbands = null;

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

  function handleOpenModal() {
    if (meetings.length < 3) alert("You have to pick 3 Dates");
    if (meetings.length === 3) setIsOpen(!isOpen);
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
          <Button onClick={() => handleOpenModal()}>Submit your Dates</Button>
        </div>
        <Modal isOpen={isOpen} meetings={meetings} onClose={handleOpenModal} />
      </div>
    </>
  );
}

function Modal({ meetings, isOpen, onClose }) {
  return (
    <>
      <div className={isOpen === true ? "modal" : "modal hidden"}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <ModalDates meetings={meetings} />
      </div>
      <div
        className={isOpen === true ? "overlay" : "overlay hidden"}
        onClick={onClose}
      ></div>
    </>
  );
}

function ModalDates({ meetings }) {
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
            <input type="checkbox"></input>
            <label>I want to go further with {candidate.name}</label>
          </li>
        ))}
      </ul>

      <Button>Let's go Further!</Button>
    </div>
  );
}

/*function ModalSex({ meetings, isOpen, onClose }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        Sex
      </Modal>
    </div>
  );
}

function ModalWedding({ meetings, isOpen, onClose }) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => onClose}>
        Wedding
      </Modal>
    </div>
  );
}*/
