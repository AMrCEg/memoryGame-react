import React, { useState } from "react";

const Header = (props) => {
  return (
    <div className="info-container">
      <div className="name">
        Hello : <span>{props.name || "..."}</span>
      </div>
      {/* <div className="time">
        Time : <span className="minutes">00</span>:
        <span className="seconds">00</span>
      </div> */}
      {localStorage.leader && (
        <div className="leader">
          leader : {props.leader.name} is move {props.leader.moves} times
        </div>
      )}
      <div className="tries">
        Moves : <span>{props.moves}</span>
      </div>
    </div>
  );
};

export default Header;
