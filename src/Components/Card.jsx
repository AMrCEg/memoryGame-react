import React from "react";

const Card = (props) => {
  return (
    <div
      className={`card ${props.isFlipped ? "flipped" : ""} ${
        props.isMatch ? "match" : ""
      } `}
      data-image={props.card.imageName}
      onClick={() => props.handleCardClick(props.card)}
    >
      <div className="front"></div>
      <div className="back">
        <img
          src={`/memoryGame-react/imgs/png/${props.card.imageName}.png`}
          alt={props.card.imageName}
        />
      </div>
    </div>
  );
};

export default Card;
