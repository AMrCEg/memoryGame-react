// MemoryGameBlocks <==> MemoryGameCards
// memory-game-cards <==> memory-game-cards
/*
يمكنك التفكير في useEffect كمراقب (Observer) لحالات معينة:
عندما تتغير هذه الحالات، يقوم useEffect بتنفيذ الكود الخاص به لضمان أن المنطق الخاص بك يبقى متزامنًا مع حالة المكون.
*/

import { useState, useEffect } from "react";

import Header from "./Header";
import Card from "./Card";

const MemoryGameCards = (props) => {
  //cards: An array representing the game cards.
  const [cards, setCards] = useState([]);
  //flippedCards:  An array to keep track of currently flipped cards.
  const [flippedCards, setFlippedCards] = useState([]);
  // matchedCards: An array to track pairs that have been successfully matched.
  const [matchedCards, setMatchedCards] = useState([]);
  // moves: To track the number of moves made by the player.
  const [moves, setMoves] = useState(0);

  const [leader, setLeader] = useState(
    localStorage.leader ? () => JSON.parse(localStorage.leader) : ""
  );

  /*
  تغيير الحالة لمرة واحدة: نريد فقط أن يتم تنفيذ هذا التأثير مرة واحدة،
  هذا يعني أن هذا التأثير لن يُنفذ إلا عند تحميل المكون لأول مرة،
  مما يسمح لنا بإعداد الحالة الأولية للبطاقات وتحديثها باستخدام
  setCards
  التهيئة: في الاستخدام الأول، نريد إعداد الحالة (البطاقات) فقط عند تحميل المكون لأول مرة، وهذا يتطلب تأثيرًا ينفذ لمرة واحدة فقط.
  يُستخدم لتثبيت الحالة الأولية عندما يتم تحميل المكون.
*/
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

  // لخلط العناصر الموجودة في مصفوفة بشكل عشوائي
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (card) => {
    if (
      flippedCards.length < 2 && // التأكد من أنه لا يوجد أكثر من بطاقتين في flippedCards
      // flippedCards.includes(card) === false && // التأكد من أن البطاقة ليست في flippedCards
      !flippedCards.includes(card) && // التأكد من أن البطاقة ليست في flippedCards
      // matchedCards.includes(card) === false && // التأكد من أن البطاقة ليست في matchedCards
      !matchedCards.includes(card) // التأكد من أن البطاقة ليست في matchedCards
    ) {
      setFlippedCards([...flippedCards, card]); // إذا كانت الشروط مستوفاة، نضيف البطاقة إلى قائمة البطاقات المكشوفة
    }
  };

  // check two flippedCards matching
  /*
  التزامن بين الحالات (Syncing States):
  هنا نستخدم لمزامنة حالة flippedCards مع حالة matchedCards وmoves.
  يُستخدم لمزامنة الحالة وتحقق التطابق عند تغيير حالة
  flippedCards.
  */

  useEffect(() => {
    if (flippedCards.length === 2) {
      setMoves((oldMoves) => oldMoves + 1);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.imageName === secondCard.imageName) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
        // setMoves((oldMoves) => oldMoves - 1);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  // Resetting the Game: The "Play Again" button resets the game,
  // reset the states (flippedCards, matchedCards, moves)
  // shuffle the cards again for a new game experience.

  const handlePlayAgain = () => {
    // console.log("handlePlayAgain");
    props.setIsStart(false);
    if (!leader || moves < leader.moves) {
      localStorage.setItem(
        "leader",
        JSON.stringify({ name: props.name, moves: moves })
      );
    }
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setCards(shuffleArray(cards));
  };

  return (
    <div className="memory-game-container">
      <Header moves={moves} name={props.name} leader={leader} />
      <div className="memory-game-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            isFlipped={flippedCards.includes(card)}
            isMatch={matchedCards.includes(card)}
          />
        ))}
        {matchedCards.length === cards.length && (
          <button className="play-again button-89" onClick={handlePlayAgain}>
            Play Again
          </button>
        )}
      </div>
    </div>
  );
};

export default MemoryGameCards;
