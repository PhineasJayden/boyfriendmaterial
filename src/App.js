import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { candidatesStart } from "./Candidates.js";

export default function App() {
  const [candidates, setCandidates] = useState(candidatesStart);
  const [dates, setDates] = useState([]);
  const [activeCandidate, setActiveCandidate] = useState(null);

  function handleActiveCandidate(candidate) {
    setActiveCandidate((cur) => (cur?.id === candidate.id ? null : candidate));
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
            <CandidateInfo activeCandidate={activeCandidate} />
          ) : (
            <p>
              Please Select a Candidate from the left to get to know! You can
              rate them all and after that choose 3 People do date via the
              checkboxes on the right!{" "}
            </p>
          )}
        </div>
        <div className="sidebar-right">
          <TopMatches />
          <Button>Submit your Dates</Button>
        </div>
        <ModalDates />
        <ModalSex />
        <ModalWedding />
      </div>
    </>
  );
}
function Button({ children }) {
  return <button className="button">{children}</button>;
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

function CandidateInfo({ activeCandidate }) {
  return (
    <article className="main">
      <div className="Kandidat-Info">
        <img src={activeCandidate.image} alt={activeCandidate.name} />
        <div className="Kandidat-Info--txt">
          <h3>
            {activeCandidate.name}{" "}
            <button className="favorite">
              <img src="heart-icon-2.png" alt="heart" />
            </button>
          </h3>
          <ul>
            <label>Age:</label>
            <li>{activeCandidate.age}</li>
            <label>Occupation:</label>
            <li>{activeCandidate.job}</li>
            <label>Hobbies: </label>
            <li>{activeCandidate.hobbies.join(", ")}</li>
            <label>Character:</label>
            <li>{activeCandidate.character.join(", ")}</li>
            <li>Want in a Husband:</li>
          </ul>
        </div>
      </div>
      <Rating />
    </article>
  );
}

function Rating() {
  return (
    <div className="Kandidat-Rating">
      <h3>Rating</h3>
      <div className="Rating">
        <div>
          <label>Looks</label>
          <select>
            <option>1</option>
          </select>
        </div>
        <div>
          <label>Hobbies</label>
          <select>
            <option>1</option>
          </select>
        </div>
        <div>
          <label>Character</label>
          <select>
            <option>1</option>
          </select>
        </div>
        <div>
          <label>Husband Material</label>
          <select>
            <option>1</option>
          </select>
        </div>
      </div>
      <Button>Submit</Button>
    </div>
  );
}

function TopMatches() {
  return (
    <>
      <h3>Top Matches</h3>
      <ol>
        <li>
          Hyeonwoo
          <input type="checkbox" />
        </li>
      </ol>
    </>
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
