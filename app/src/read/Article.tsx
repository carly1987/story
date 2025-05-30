import { useEffect, useState } from 'react';
import Line from './Line';

export default function Article({dataSource, chapter}: any){
  const [list, setList] = useState([]);

  useEffect(() => {
    const list = dataSource.filter((data: any) => data.chapter === chapter);
    setList(list);
  }, [chapter]);
  return (
    <>
      {
        list.map(({text, id}: any) => (
          <Line key={id}>{text}</Line>
        ))
      }
    </>
  )
}