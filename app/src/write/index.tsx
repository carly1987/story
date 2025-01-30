import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import SidePane from '../layout/SidePane';
import MenuPane from '../layout/MenuPane';
import RootPane from '../layout/RootPane';
import MainPane from '../layout/MainPane';
import Chapter from './Chapter';
import WriteTimer from './WriteTimer';
import RestTimer from './RestTimer';
import WordCountAndSpeed from './WordCountAndSpeed';
import WritingCheck from './WritingCheck';
import Setting from './Setting';
import MonacoEditor from '../editor';
import Search from '../components/Search';
import {useStoryStore, selectStory, selectChapter, updateContent, addChapter} from '../store';

export default function WriterPage() {
  const [saving, setSaving] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useStoryStore();
  const editor = React.useRef<any>(null);
  const writeTimer = React.useRef<any>(null);
  const restTimer = React.useRef<any>(null);

  React.useEffect(() => {
    if(!state.story) {
      selectStory({id, name}, dispatch);
    }
    
  }, []);


  function doChange(v: string) {
    setValue(v);
  }

  async function doKeyUp(event: React.KeyboardEvent) {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      
      setSaving(true);
      const res = await updateContent(editor.current?.getValue(), state, dispatch);
      console.log("doKeyUp", res, !res)
      setSaving(!res);
    }
  }

  function doCompositionStart(){
    writeTimer.current?.start();
    restTimer.current?.pause();
  }

  function doCompositionEnd(){
    writeTimer.current?.pause();
    restTimer.current?.start();
  }

  function doEditRole(text: string) {
    navigate(`/role/${id}/${name}/${text}`);
  }

  console.log('write', state)

  return (
    // @ts-ignore
    <RootPane tabIndex="0" onKeyUp={doKeyUp}>
      <MenuPane>
        <Chapter 
          defaultValue={state.chapter}
          dataSource={state.chapterList} 
          name={name} 
          onChange={selectChapter}
          onCreate={addChapter}
          saving={saving}
        />
      </MenuPane>
      <MainPane>
        {
          state.chapter ? (
            <MonacoEditor
              value={state.contents.join('\n')}
              options={{
                fontSize: 20, 
                wordWrap: 'on', 
                find: {
                addExtraSpaceOnTop: true,
                autoFindInSelection: 'always',
                seedSearchStringFromSelection: 'always',
                },
                minimap: {
                  autohide: true,
                  enabled: false,
                },
                selectOnLineNumbers: true,
                automaticLayout: true,
                lineNumbers: 'off'
              }}
              onChange={doChange}
              // onFocus={doFocus}
              // onBlur={doBlur}
              onCompositionStart={doCompositionStart}
              onCompositionEnd={doCompositionEnd}
              onAction={{editRole: doEditRole}}
              ref={editor}
            />
          ) : null
        }
        
      </MainPane>
      <SidePane>
        <Box sx={[{ p: 2 }]}>
          <Search onSearch={editor.current?.findString} />
          <WriteTimer ref={writeTimer} />
          <RestTimer ref={restTimer} />
          <WordCountAndSpeed defaultValue={state.contents.join('\n')} value={value} />
          <WritingCheck onClick={editor.current?.findString} />
        </Box>
        <Setting />
      </SidePane>
    </RootPane>
    
  );
}
