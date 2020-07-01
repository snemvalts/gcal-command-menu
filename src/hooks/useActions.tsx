


const useActions = () => {
  const goToNextPeriod = () => {
    // 🥴🥴🥴
    (document.querySelector('div[jsname="OCpkoe"]') as HTMLElement | null)?.click();
  }

  const goToPreviousPeriod = () => {
    // seems to be the most reliable way to get these elements
    // obviously when google ships another version of Gcal it breaks
    // i'd probably use a relative selector (div#something > div:nth-child(3) ......) as a fallback to this,
    // but that's also not always reliable, what happens when an element is added inbetween?
    // maybe a periodic task which loads gcal, tries to find this element, if it doesn't find then uses image recognition
    // then when it's changed update the selector which is then fetched by the clients... or something
    (document.querySelector('div[jsname="VfNHU"]') as HTMLElement | null)?.click();
  }

  const goToToday = () => {
    // google has already implemented this with keyboard shortcut, but this action could be coming from
    // the menu. let's just click on the today button
    (document.querySelector('div[jsname="P6mm8"]') as HTMLElement | null)?.click();
  }


  // i could just return the function itself, but i want i to have a specific name
  return {
    performAction: (action: Action) => {
      console.log('action submitted', action);
      if (action === 'previous_period') {
        goToPreviousPeriod();
      } else if (action === 'next_period') {
        goToNextPeriod();
      } else if (action === 'today') {
        goToToday();
      }
    }
  }

}

export default useActions;

export type Action = 'previous_period' | 'next_period' | 'today';
