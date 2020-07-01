import React, {useState} from 'react';
import './App.css';
import Menu from './components/menu/Menu';
import KeyboardListener from "./components/keyboardlistener/KeyboardListener";

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <KeyboardListener visible={visible} onMenuShortcutPressed={() => setVisible(!visible)}>
      <Menu onHideMenu={() => setVisible(false)}/>
    </KeyboardListener>
  );
}

export default App;
