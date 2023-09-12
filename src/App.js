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

  const [relationship, setRelationship] = useState(false);

  const meetings = candidates.filter((candidate) => candidate.meeting === true);

  const boyfriend = candidates.find(
    (candidate) => candidate.boyfriend === true
  );

  //const topTwo = null;

  //const boyfriends = null;

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
                boyfriend: value.boyfriend,
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

  function handlesetRelationship(id) {
    setCandidates((candidates) =>
      candidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              boyfriend: !candidate.boyfriend,
            }
          : candidate
      )
    );
  }

  function handleGetRelationship() {
    setRelationship(true);
    setIsOpen(false);
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
          ) : relationship === true ? (
            <Relationship boyfriend={boyfriend} />
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
        <Modal
          isOpen={isOpen}
          meetings={meetings}
          onClose={handleOpenModal}
          onsetRelationship={handlesetRelationship}
          onGetRelationship={handleGetRelationship}
          boyfriend={boyfriend}
        />
      </div>
      <Footer />
    </>
  );
}

function Modal({
  meetings,
  isOpen,
  onClose,
  onsetRelationship,
  onGetRelationship,
  boyfriend,
}) {
  return (
    <>
      <div className={isOpen === true ? "modal" : "modal hidden"}>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div>
          <ModalDates
            meetings={meetings}
            onsetRelationship={onsetRelationship}
            boyfriend={boyfriend}
          />
          <Button
            onClick={() => {
              onGetRelationship();
            }}
          >
            Let's get together!
          </Button>
        </div>
      </div>
      <div
        className={isOpen === true ? "overlay" : "overlay hidden"}
        onClick={onClose}
      ></div>
    </>
  );
}

function ModalDates({ meetings, onsetRelationship, boyfriend }) {
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
            <label>I want to marry {candidate.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Relationship({ boyfriend }) {
  return (
    <div className="relationship">
      <h2>Congratulations</h2>
      <h3>You are getting into a Relationship with {boyfriend.name}!</h3>
      <img src={boyfriend.image} alt={boyfriend.name} />
      <p>"{boyfriend.message}"</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>
        (c)Phineas Kierdorf(React Programming) & Niko Müller(CSS & Images){" "}
      </span>
    </footer>
  );
}
