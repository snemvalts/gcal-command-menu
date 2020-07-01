import React, {FunctionComponent, useEffect, useState} from 'react';


const rightArrowHandler = () => {
  // 🥴🥴🥴
  (document.querySelector('div[jsname="OCpkoe"]') as HTMLElement | null)?.click();
}

const leftArrowHandler = () => {
  // seems to be the most reliable way to get these elements
  // obviously when google ships another version of Gcal it breaks
  // i'd probably use a relative selector (div#something > div:nth-child(3) ......) as a fallback to this,
  // but that's also not always reliable, what happens when an element is added inbetween?
  // maybe a periodic task which loads gcal, tries to find this element, if it doesn't find then uses image recognition
  // then when it's changed update the selector which is then fetched by the clients... or something
  (document.querySelector('div[jsname="VfNHU"]') as HTMLElement | null)?.click();
}

const KeyboardListener: FunctionComponent = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && e.metaKey) {
        setVisible(currentVisible => !currentVisible);
      } else if (e.key === 'ArrowLeft') {
        leftArrowHandler();
      } else if (e.key === 'ArrowRight') {
        rightArrowHandler();
      }
    };

    document.querySelector('body')?.addEventListener('keydown', handler);

    return () => {
      document.querySelector('body')?.removeEventListener('keydown', handler);
    }
  }, []);


  if (visible) {
    return <>{props.children}</>
  }

  return null;
};


export default KeyboardListener;
