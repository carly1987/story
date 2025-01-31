import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {Button} from '@mui/material';
import * as fs from '@tauri-apps/plugin-fs';
import * as dialog from '@tauri-apps/plugin-dialog';

import DialogCreateStoryBtn from '../components/DialogCreateStory';
import {useStoryStore, openStory} from '../store';

export default function WellcomePage() {
  const [state, dispatch] = useStoryStore();
  const navigate = useNavigate();
  async function doCreate(name: string) {
    let path: any = await dialog.save({
      title: name,
      filters: [
        {
          name: name,
          extensions: ['txt'],
        },
      ],
    });
    
    if(path){
      fs.writeFile(path, new Uint8Array(), {create: true});
      navigate(`/write/0/${name}`);
    }
  }

  async function doSelect() {
    openStory(dispatch);
  }

  React.useEffect(() => {
    if(state.story?.name) {
      navigate(`/write/0/${state.story?.name}`);
    }
  }, [state.story?.name]);

  return (
    <div>
      <Button onClick={doSelect}>打开文件</Button>
      <DialogCreateStoryBtn onSave={doCreate} />
    </div>
  );
}
