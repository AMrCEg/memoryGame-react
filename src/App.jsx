import { useState } from "react";
import "./App.css";

import MemoryGameCards from "./Components/MemoryGameCards";

function App() {
  const [isStart, setIsStart] = useState(false);
  //   // الحالة لاسم اللاعب
  const [name, setName] = useState("");

  // طلب اسم اللاعب إذا لم يتم تعيينه بعد
  const requestPlayerName = () => {
    const playerName = prompt("What's your name?");
    setName(playerName);
  };

  // بدء اللعبة
  const handleStartGame = () => {
    requestPlayerName(); // طلب اسم اللاعب عند بدء اللعبة
    setIsStart(true);
  };

  return (
    <>
      {!isStart && (
        <button
          className="start-game button-89"
          role="button"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      )}

      {isStart && (
        <MemoryGameCards
          isStart={isStart}
          setIsStart={setIsStart}
          name={name}
        />
      )}
    </>
  );
}

export default App;
