import React, { useState } from "react";
import { Button } from "./Button";

export function Rating({ onSubmitRating, activeCandidate, favorite }) {
  const [looks, setLooks] = useState(activeCandidate.ratingValues.looks);
  const [character, setCharacter] = useState(
    activeCandidate.ratingValues.character
  );
  const [hobbies, setHobbies] = useState(activeCandidate.ratingValues.hobbies);
  const [boyfriend, setboyfriend] = useState(
    activeCandidate.ratingValues.boyfriend
  );

  const rating = favorite
    ? (looks + character + hobbies + boyfriend) / 2
    : (looks + character + hobbies + boyfriend) / 4;

  const ratingObject = {
    rating: rating,
    looks: looks,
    hobbies: hobbies,
    character: character,
    boyfriend: boyfriend,
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
          <label>boyfriend Material {boyfriend}/10</label>
          <input
            type="range"
            min="1"
            max="10"
            value={boyfriend}
            className="slider"
            id="boyfriend-slider"
            onChange={(e) => setboyfriend(Number(e.target.value))}
          />
        </div>
      </div>
      <Button onClick={() => onSubmitRating(ratingObject)}>Submit</Button>
    </div>
  );
}
