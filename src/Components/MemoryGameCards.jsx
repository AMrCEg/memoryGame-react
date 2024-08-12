// MemoryGameBlocks <==> MemoryGameCards
// memory-game-cards <==> memory-game-cards
import { useState, useEffect } from "react";

import Header from "./Header";
import Card from "./Card";

const MemoryGameCards = (props) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCardsIds, setMatchedCardsIds] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    // Initialize the cards array and shuffle them
    const initialCards = [
      { id: 1, imageName: "android" },
      { id: 2, imageName: "android" },
      { id: 3, imageName: "angular" },
      { id: 4, imageName: "angular" },
      { id: 5, imageName: "boostrap" },
      { id: 6, imageName: "boostrap" },
      { id: 7, imageName: "django" },
      { id: 8, imageName: "django" },
      { id: 9, imageName: "flask" },
      { id: 10, imageName: "flask" },
      { id: 11, imageName: "nodejs" },
      { id: 12, imageName: "nodejs" },
      { id: 13, imageName: "react" },
      { id: 14, imageName: "react" },
      { id: 15, imageName: "redux" },
      { id: 16, imageName: "redux" },
      { id: 17, imageName: "spring" },
      { id: 18, imageName: "spring" },
      { id: 19, imageName: "vuejs" },
      { id: 20, imageName: "vuejs" },
      // Add more pairs as needed
    ];
    setCards(shuffleArray(initialCards));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards([...flippedCards, card]);
    }
  };

  // check two flippedCards matching
  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((oldMoves) => oldMoves + 1);
      const [first, second] = flippedCards;
      if (first.imageName === second.imageName) {
        setMatchedCardsIds([...matchedCardsIds, first.id, second.id]);
        setMoves((oldMoves) => oldMoves - 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  const handlePlayAgain = () => {
    console.log("handlePlayAgain");
    props.setIsStart(false);
  };

  return (
    <div className="memory-game-container">
      <Header moves={moves} />
      <div className="memory-game-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            isFlipped={flippedCards.includes(card)}
            isMatch={matchedCardsIds.includes(card.id)}
          />
        ))}
        {matchedCardsIds.length === cards.length && (
          <button className="play-again button-89" onClick={handlePlayAgain}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryGameCards;
