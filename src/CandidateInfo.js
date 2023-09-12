import React, { useState } from "react";
import { Rating } from "./Rating";

export function CandidateInfo({ activeCandidate, onSubmitRating }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="main">
      <div className="Kandidat-Info">
        <img src={activeCandidate.image} alt={activeCandidate.name} />
        <div>
          <h2>
            {activeCandidate.name}{" "}
            <button className={favorite ? "favorite-selected" : "favorite"}>
              <img
                src="heart-icon-2.png"
                alt="heart"
                onClick={() => setFavorite(!favorite)}
              />
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
            <label>Want in a boyfriend: </label>
            <li>{activeCandidate.boyfriend}</li>
          </ul>
        </div>
      </div>
      <Rating
        onSubmitRating={onSubmitRating}
        activeCandidate={activeCandidate}
        favorite={favorite}
      />
    </article>
  );
}
