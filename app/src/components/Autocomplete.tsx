import {useState} from 'react';
import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';
import { Title } from './styles';

export default function Autocomplete({ label}: any) {
  const [value, setValue] = useState<any | null>(null);
  const [list, setList] = useState<any>([]);

  function doChange(_: any, newValue: any) {
    if (typeof newValue === 'string') {
      setValue({
        label: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        label: newValue.inputValue,
      });
    } else {
      setValue(newValue);
    }
  }

  return (
    <MUIAutocomplete
          value={value}
          multiple={true}
          onChange={doChange}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={list}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label={label} name={name} />
          )}
        />
  );
}