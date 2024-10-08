import React, { useState } from "react";
const Header = (props) => {
  return (
    <div className="info-container">
      <div className="name">
        Hello : <span>{props.name || "..."}</span>
      </div>

      <div className="time">
        Time: <span>{props.formatTime}</span>
      </div>

      {localStorage.leader && (
        <div className="leader">
          Leader : {props.leader.name} has moved {props.leader.moves} times
        </div>
      )}

      <div className="tries">
        Moves : <span>{props.moves}</span>
      </div>
    </div>
  );
};

export default Header;
