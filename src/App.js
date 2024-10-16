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
    // background-image: url(https://i.redd.it/2lilft2z0nk51.jpg);
    // /* background: no-repeat; */
    // background-repeat: no-repeat;
    // background-attachment: fixed;
    <div className="App" style={{
      backgroundImage: 'url(https://i.redd.it/2lilft2z0nk51.jpg)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh'
      }}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <AccuracyCalculator/>
    </div>
  );
}

export default App;