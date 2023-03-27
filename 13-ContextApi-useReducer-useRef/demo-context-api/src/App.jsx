import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ContextApi from './components/ContextApi';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <ContextApi />
    </div>
  );
}

export default App;
