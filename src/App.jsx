import { useState } from "react";
import "./App.css";

import MemoryGameCards from "./Components/MemoryGameCards";

function App() {
  const [isStart, setIsStart] = useState(false);
  //   // الحالة لاسم اللاعب
  const [name, setName] = useState("");

  // // طلب اسم اللاعب إذا لم يتم تعيينه بعد
  // const requestPlayerName = () => {
  //   const playerName = prompt("What's your name?");
  //   setName(playerName);
  // };

  // // بدء اللعبة
  // const handleStartGame = () => {
  //   // requestPlayerName(); // طلب اسم اللاعب عند بدء اللعبة
  //   setIsStart(true);
  // };

  const handleNameSubmit = () => {
    if (name.trim()) {
      setIsStart(true);
      playSound("/memoryGame-react/sounds/game-start-sound.mp3");
    } else {
      alert("Please enter a valid name");
    }
  };

  // 3. إضافة مؤثرات صوتية:
  const playSound = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <>
      {!isStart && (
        <>
          <div className="name-input-container">
            <input
              className="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required="required"
            />
            <label htmlFor="name" className="name-label">
              Enter your name
            </label>
            <div className="bar"></div>
          </div>
          <button
            className="start-game button-89"
            role="button"
            onClick={handleNameSubmit}
          >
            Start Game
          </button>
        </>
      )}

      {isStart && (
        <MemoryGameCards
          isStart={isStart}
          setIsStart={setIsStart}
          name={name}
          setName={setName}
        />
      )}
    </>
  );
}

export default App;
