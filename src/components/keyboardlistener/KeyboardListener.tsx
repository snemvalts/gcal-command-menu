import React, {FunctionComponent, useEffect} from 'react';
import useActions from '../../hooks/useActions';



const KeyboardListener: FunctionComponent<{
  visible: boolean,
  onMenuShortcutPressed: () => void
}> = (props) => {
  const { performAction } = useActions();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && e.metaKey) {
        e.stopPropagation();
        props.onMenuShortcutPressed();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        performAction('previous_period');
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        performAction('next_period');
      }
    };

    document.querySelector('body')?.addEventListener('keydown', handler);

    return () => {
      document.querySelector('body')?.removeEventListener('keydown', handler);
    }
  }, [performAction, props]);


  if (props.visible) {
    return <>{props.children}</>
  }

  return null;
};


export default KeyboardListener;
