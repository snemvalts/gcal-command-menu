import React, {FunctionComponent, useEffect, useState} from 'react';



const KeyboardListener: FunctionComponent = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && e.metaKey) {
        setVisible(currentVisible => !currentVisible);
      }
    };

    document.querySelector('body')?.addEventListener('keydown', handler);

    return () => {
      document.querySelector('body')?.removeEventListener('keydown', handler);
    }
  }, []);


  return visible ? (<>{props.children}</>) : null;
};


export default KeyboardListener;
