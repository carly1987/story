
import { Button, Accordion, AccordionSummary, AccordionDetails, AccordionActions, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Section(props: any) {

  function doSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log('doSave', formJson);
    props.onChange?.(props.id, formJson)
  }

  return (
    <Accordion component={props.component || 'form'} onSubmit={props.component ? null : doSave}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={props.id}>
        {props.title}
      </AccordionSummary>
      <AccordionDetails>
        {props.children}
      </AccordionDetails>
      {
        props.component ? null : (
          <AccordionActions>
            <Button type="reset">重置</Button>
            <Button type="submit">确定</Button>
          </AccordionActions>
        )
      }
    </Accordion>
  )
}