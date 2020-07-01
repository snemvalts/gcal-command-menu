


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


  return {
    performAction: (shortcut: Shortcut) => {
      if (shortcut === 'previous_period') {
        goToPreviousPeriod();
      } else if (shortcut === 'next_period') {
        goToNextPeriod();
      }

    }
  }

}

export default useActions;

export type Shortcut = 'previous_period' | 'next_period' | 'today';
