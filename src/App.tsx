import React, {useEffect} from 'react';
import './App.css';
import Menu from './components/menu/Menu';
import KeyboardListener from "./components/keyboardlistener/KeyboardListener";

const App = () => {
  return (
    <KeyboardListener>
      <Menu/>
    </KeyboardListener>
  );
}

export default App;
