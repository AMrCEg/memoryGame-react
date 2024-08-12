import { useState } from "react";
import "./App.css";

import MemoryGameCards from "./Components/MemoryGameCards";

function App() {
  const [isStart, setIsStart] = useState(false);

  const handleStartGame = () => {
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

      {isStart && <MemoryGameCards setIsStart={setIsStart} />}
    </>
  );
}

export default App;
