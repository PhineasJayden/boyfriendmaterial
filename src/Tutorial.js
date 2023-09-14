import React from "react";

export function Tutorial() {
  return (
    <div>
      <h4>How to find your boyfriend</h4>
      <ol>
        <li>1. Choose a candidate from the right to get more information</li>
        <li>
          2. Rate the candidate and submit your rating! He will appear on the
          right under your Top Matches.(If you mark a Candidate with a heart,
          the rating values get doubled!)
        </li>
        <li>
          3. When you finished rating the characters you can choose 3 to date on
          the right via the checkboxes!
        </li>
        <li>
          4. Your top 3 dates will go on a date with you, after that you choose
          two you want to go further with!
        </li>
        <li>5. In the end you choose who you want to marry!</li>
      </ol>
      <p className="quote">Good luck in finding the love of your life!</p>
      <br />
      <br />
      <p className="disclaimer">
        Disclaimer: This is just a testbuild to practise basic React
        functionalities. The Data about the Candidates is not yet filled out.
      </p>
    </div>
  );
}
