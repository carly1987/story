import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Typography, 
  Stack,
  MenuItem, 
  TextField, 
  Autocomplete, 
  createFilterOptions, 
  Chip, 
  Box, 
  Select,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { getStore } from '../store';
import { readJson, updateJson } from '../utils';
import { Title, MuiSelect, MultipleSelectBox } from './styles';

export default function BasicSelect({ label, dataSource, children, name, note, native, defaultValue, sx, fullWidth }: any) {
  const [value, setValue] = React.useState('');

  const doChange = (event: any) => {
    setValue(event.target.value as string);
  }

  React.useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  return (
    <Stack direction="row" spacing={2} sx={{ marginBottom: '10px', marginTop: '10px', ...sx }}>
      <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
        {label ? (<Title variant="h6" gutterBottom>{label}</Title>) : null}
        {
          native ? (
            <select>
              {
                dataSource && dataSource.map((data: any) => (
                  <option value={`${data.label}.${data.value}`} key={data.value} selected={data.value === defaultValue}>{data.label}</option>
                ))
              }
            </select>
          ) : (
            <MuiSelect
              name={name}
              label={label}
              value={value}
              onChange={doChange}
              sx={{ width: fullWidth ? '100%' : 100 }}
              variant="standard"
              autoWidth={fullWidth}
            >
              {
                dataSource && dataSource.map((data: any) => (
                  <MenuItem value={data.value} key={data.value}>{data.label}</MenuItem>
                ))
              }
              {children}
            </MuiSelect>
          )
        }

      </Stack>
      <Typography>{note}</Typography>
    </Stack>
  );
}

const filter = createFilterOptions<any>();

export function WordTypeSelect({ label, name }: any) {
  const [value, setValue] = React.useState<any | null>(null);
  const [list, setList] = React.useState<any>([]);

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

  async function doAdd(_: React.SyntheticEvent, option: any) {
    if (option?.inputValue) {
      list.push({ value: option.inputValue, label: option.inputValue });
      setList([...list]);
      const root: any = await getStore('story_root');
      const path = `${root.value}/wordType.json`;
      updateJson(path, list);
    }
  }

  async function init() {
    const root: any = await getStore('story_root');
    const path = `${root.value}/wordType.json`;
    const list: any = await readJson(path);
    setList(list || []);
  }

  React.useEffect(() => {
    init();
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={doChange}
      onHighlightChange={doAdd}
      filterOptions={(options: any, params: any) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option: any) => inputValue === option.label);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            label: `+ "${inputValue}"`,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={list}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.label}
          </li>
        );
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.label;
      }}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} />
      )}
    />
  )
}

export function MultipleSelectNative({ dataSource, defaultValue, sx, onChange }: any) {
  const [value, setValue] = React.useState<any>([]);
  function doDelete(event: any) {
    console.log('doDelete', event);
  }
  function doSelect(event: any) {
    event.stopPropagation();
    const list = event.target.value.split('.');
    if(!value.find((item: any) => item.label === list[0])){
      setValue((res: any[]) => {
        res.push({label: list[0], value: list[1]});
        onChange?.(res);
        return [...res]
      })
    }
  }
  React.useEffect(() => {
    const list = defaultValue ? defaultValue.split(',') : [];
    setValue(list.map((item: any) => ({label : item, value: uuidv4()})));
  }, []);
  return (
    <MultipleSelectBox sx={sx}>
        {
          value.map((item: any) => (<Chip label={item.label} key={item.value} onDelete={doDelete} />))
        }
      <select onChange={doSelect}>
        {
          dataSource && dataSource.map((data: any) => (
            <option 
              value={`${data.label}.${data.value}`} 
              key={data.value} 
              onChange={doSelect}
              selected={value.find((item: any) => item.label === data.label)}
            >{data.label}</option>
          ))
        }
      </select>
    </MultipleSelectBox>
  )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


export function MultipleSelect({label, defaultValue = [], dataSource}: any) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: any) => {
    const v = event.target.value;
    console.log('handleChange', v)
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
  };
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {dataSource.map((data: any) => (
            <MenuItem
              key={data.value}
              value={data.label}
            >
              {data.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}