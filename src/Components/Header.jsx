import React from "react";

const Header = (props) => {
  return (
    <div className="info-container">
      <div className="name">
        Hello : <span>...</span>
      </div>
      {/* <div className="time">
        Time : <span className="minutes">00</span>:
        <span className="seconds">00</span>
      </div> */}
      <div className="tries">
        Moves : <span>{props.moves}</span>
      </div>
    </div>
  );
};

export default Header;
