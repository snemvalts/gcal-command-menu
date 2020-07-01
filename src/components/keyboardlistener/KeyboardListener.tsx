import React, {FunctionComponent, useEffect} from 'react';



const KeyboardListener: FunctionComponent = (props) => {

  useEffect(() => {
    document.querySelector('body')?.addEventListener('keydown', (e: KeyboardEvent) => {
      console.log(e.key);
    })
  }, []);


  return (
    <>
      {props.children}
    </>
  )
};


export default KeyboardListener;
