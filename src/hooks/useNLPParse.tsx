// @ts-ignore
import * as chrono from 'chrono-node';

const useNLPParser = () => ({
  parseDate: (strippedString: string) => {
    const result = chrono.parse(strippedString);
    // this is finicky...
    if (result.length > 0) {
      const values = result[0]?.start?.knownValues;
      if (values?.day && values?.month) {
        // could do a spread here but can't be sure if it finds any other values
        // having more properties won't cause any errors in runtime but still nice to construct this manually
        return { day: values.day, month: values.month };
      }
    }
  }
});

export default useNLPParser;
