import './App.css';
import { useEffect, useState } from 'react';
import AccuracyCalculator from './components/AccuracyCalculator';

function App() {
  const [monsterData, setMonsterData] = useState([]);

  const [str, setStr] = useState();
  const [dex, setDex] = useState();
  const [int, setInt] = useState();
  const [luk, setLuk] = useState();

  return (
    <div className="App">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <AccuracyCalculator/>
    </div>
  );
}

export default App;