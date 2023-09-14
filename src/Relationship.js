import React from "react";

export function Relationship({ boyfriend }) {
  return (
    <div className="relationship">
      <h2>Congratulations</h2>
      <h3>You are getting into a Relationship with {boyfriend.name}!</h3>
      <img src={boyfriend.image} alt={boyfriend.name} />
      <p className="quote">"{boyfriend.message}"</p>
    </div>
  );
}
