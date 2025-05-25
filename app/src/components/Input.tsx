import { useEffect, useRef, useState } from 'react';
import { Typography, TextField } from '@mui/material';


export function Input(props: any) {
  
  const [edit, setEdit] = useState(props.edit || false);
  const [value, setValue] = useState(props.children);

  function doEdit(event: any) {
    event.preventDefault();
    setEdit(true)
  }

  function doKeyUp(event: any) {
    event.preventDefault();
    if(event.code === 'Enter'){
      setValue(event.target.value);
      setEdit(false);
      console.log('doKeyUp', event.target.value);
      props.onChange?.(event.target.value);
    }
  }

  useEffect(() => {
    setValue(props.children);
  }, [props.children]);

  return (
    <>
    <TextField 
      key={value}
      defaultValue={value} 
      variant="standard"
      label={props.label}
      name={props.name}
      helperText={props.note}
      onKeyUp={doKeyUp}
      sx={{display: edit ? 'block' : 'none'}}
      fullWidth={props.fullWidth}
    />
    <Typography onClick={doEdit} sx={{display: edit ? 'none' : 'block'}}>{value}</Typography>
    </>
  );
}


export function TextInput(props: any) {
  return (
    <TextField 
      key={props.value} 
      defaultValue={props.defaultValue} 
      variant="standard"
      label={props.label}
      name={props.name}
      fullWidth
      multiline
      maxRows={3}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  )
}

export function TitleInput({data}: any) {
  return <Input label={data.title} edit={true} name={data.name} fullWidth>{data.text}</Input>
}