import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { candidatesStart } from "./Candidates.js";

export default function App() {
  const [candidates, setCandidates] = useState(candidatesStart);
  const [dates, setDates] = useState([]);
  const [activeCandidate, setActiveCandidate] = useState(null);

  function handleActiveCandidate(candidate) {
    setActiveCandidate(() => null);
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
            <p>
              Please Select a Candidate from the left to get to know! You can
              rate them all and after that choose 3 People do date via the
              checkboxes on the right!{" "}
            </p>
          )}
        </div>
        <div className="sidebar-right">
          <TopMatchesList candidates={candidates} />
          <Button>Submit your Dates</Button>
        </div>
        <ModalDates />
        <ModalSex />
        <ModalWedding />
      </div>
    </>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <header>
      <h1>Husband Material</h1>
      <p>by BE</p>
    </header>
  );
}

function CandidatesList({ candidates, activeCandidate, onSelection }) {
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

function CandidateInfo({ activeCandidate, onSubmitRating }) {
  return (
    <article className="main">
      <div className="Kandidat-Info">
        <img src={activeCandidate.image} alt={activeCandidate.name} />
        <div>
          <h2>
            {activeCandidate.name}{" "}
            <button className="favorite">
              <img src="heart-icon-2.png" alt="heart" />
            </button>
          </h2>
          <ul>
            <label>Age:</label>
            <li>{activeCandidate.age}</li>
            <label>Occupation:</label>
            <li>{activeCandidate.job}</li>
            <label>Hobbies: </label>
            <li>{activeCandidate.hobbies.join(", ")}</li>
            <label>Character:</label>
            <li>{activeCandidate.character.join(", ")}</li>
            <label>Want in a Husband: </label>
            <li>{activeCandidate.husband}</li>
          </ul>
        </div>
      </div>
      <Rating
        onSubmitRating={onSubmitRating}
        activeCandidate={activeCandidate}
      />
    </article>
  );
}

function Rating({ onSubmitRating, activeCandidate }) {
  const [looks, setLooks] = useState(activeCandidate.ratingValues.looks);
  const [character, setCharacter] = useState(
    activeCandidate.ratingValues.character
  );
  const [hobbies, setHobbies] = useState(activeCandidate.ratingValues.hobbies);
  const [husband, setHusband] = useState(activeCandidate.ratingValues.husband);

  const rating = (looks + character + hobbies + husband) / 4;

  const ratingObject = {
    rating: rating,
    looks: looks,
    hobbies: hobbies,
    character: character,
    husband: husband,
  };

  return (
    <div className="Kandidat-Rating">
      <h3>Rating</h3>
      <div className="rating">
        <div>
          <label>Looks: {looks}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={looks}
            className="slider"
            id="looks-slider"
            onChange={(e) => setLooks(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Hobbies: {hobbies}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={hobbies}
            className="slider"
            id="hobby-slider"
            on
            onChange={(e) => setHobbies(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Character: {character}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={character}
            className="slider"
            id="character-slider"
            onChange={(e) => setCharacter(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Husband Material {husband}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={husband}
            className="slider"
            id="husband-slider"
            onChange={(e) => setHusband(Number(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={() => onSubmitRating(ratingObject)}>Submit</Button>
    </div>
  );
}

function TopMatchesList({ candidates }) {
  return (
    <>
      <h3>Top Matches</h3>
      <ol>
        {candidates
          .filter((candidate) => candidate.rating > 0)
          .sort((a, b) => Number(b.rating) - Number(a.rating))
          .map((candidate) => (
            <TopMatches candidate={candidate} key={candidate.id} />
          ))}
      </ol>
    </>
  );
}

function TopMatches({ candidate }) {
  return (
    <li>
      <input type="checkbox" id={candidate.id} />
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
      <Modal>Weddng</Modal>
    </div>
  );
}

function Modal() {
  return <div className="Modal"></div>;
}
