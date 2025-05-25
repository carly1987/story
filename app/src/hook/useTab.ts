import {useState} from 'react';

export function useTab(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  const doChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return {value, doChange};
}