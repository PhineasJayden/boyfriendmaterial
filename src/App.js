import React, { useState } from "react";
import "./index.css";
import { candidatesStart } from "./Candidates.js";
import { Tutorial } from "./Tutorial";
import { Button } from "./Button";
import { Header } from "./Header";
import { CandidatesList } from "./CandidatesList";
import { CandidateInfo } from "./CandidateInfo";
import { TopMatchesList } from "./TopMatchesList";
import { Modal } from "./Modal";
import { Relationship } from "./Relationship";
import { Footer } from "./Footer";

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
    console.log(id, boyfriend);
    setCandidates((candidates) =>
      candidates.map((candidate) =>
        candidate.id === Number(id)
          ? {
              ...candidate,
              boyfriend: true,
            }
          : { ...candidate, boyfriend: false }
      )
    );
  }

  function handleGetRelationship() {
    setRelationship(true);
    setIsOpen(false);
  }

  function handleRestart() {
    setCandidates(candidatesStart);
    setRelationship(false);
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
            <div className="relationship">
              <Relationship boyfriend={boyfriend} />
              <Button onClick={() => handleRestart()}>Reset Everything</Button>
            </div>
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
