import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Box, Button, Stack, Typography} from '@mui/material';
import { Link } from "react-router-dom";

import LinkMUI from '@mui/material/Link';
import Editor from '../editor';
import SidePane from '../layout/SidePane';
import MenuPane from '../layout/MenuPane';
import RootPane from '../layout/RootPane';
import MainPane from '../layout/MainPane';
import Chapter from '../components/Chapter';
import WriteTimer from './WriteTimer';
import RestTimer from './RestTimer';
import WordCountAndSpeed from './WordCountAndSpeed';
import WritingCheck from './WritingCheck';
import Setting from './Setting';
import Search from '../components/Search';
import { getStore } from '../store';
import { useRead } from '../hook/useRead';
import {useDialogAddChapter} from '../hook/useDialog';

export default function WriterPage() {
  const [needSave, setNeedSave] = useState(false);
  const [root, setRoot] = useState<any>(null);
  const [selected, setSelected] = useState('');
  const [chapter, setChapter] = useState<any>(null);
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const params = useParams();
  const {
    chapterList, setChapterList,
    contentList, setContentList,
    contents, setContents,
    setting,
    role_node, setRole_node,
    act,
    folderPath
  } = useRead(name, root);
  const editor = useRef<any>(null);
  const writeTimer = useRef<any>(null);
  const restTimer = useRef<any>(null);
  const {doOpen: doOpenDialogChapter, AddChapter} = useDialogAddChapter((chapterName: string) => {
    setChapterList((res: any) => {
      const id = res.length + 1;
      res.push({
        id,
        story: 0,
        label: chapterName
      });
      setContentList((data: any) => data.concat([{
        chapter: id,
        chapterLabel: chapterName,
        text: ''
      }]));
      return [...res];
    });
    
  });

  function doSave(data: any){
    setContentList(data);
    setNeedSave(false);
  }

  function doChange(v: string) {
    setValue(v);
    setNeedSave(true)
  }

  function doCompositionStart() {
    writeTimer.current?.start();
    restTimer.current?.pause();
  }

  function doCompositionEnd() {
    writeTimer.current?.pause();
    restTimer.current?.start();
  }

  async function selectChapter(data: any) {
    setChapter(data);
      const list = contentList.filter((item: any) => item.chapter === data.id || item.chapter === 0).map((item: any) => {
        return item.text;
      }) as any
    setContents(list[0]);
    setValue('');
  }

  async function init() {
    const root: any = await getStore('story_root');
    if (root.value) {
      setRoot(root.value);
    }
    if (params.name) {
      setName(params.name);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <RootPane>
      <MenuPane>
        
        <Stack direction="row" spacing={5}>
          <Typography component="h2" variant="subtitle2">
            {name}
          </Typography>
          <LinkMUI 
              component={Link} 
              color="primary" 
              to={`/story/detail/${name}/`} 
            >
              编辑
            </LinkMUI>
          </Stack>
          <Button onClick={doOpenDialogChapter}>新建章节</Button>
        {AddChapter}
        <Chapter
          defaultValue={chapter?.id}
          dataSource={chapterList}
          onChange={selectChapter}
          needSave={needSave}
        />
      </MenuPane>
      <MainPane>
        {
          chapter ? (
            <Editor
              value={contents}
              dataSource={contentList}
              name={name} 
              root={root}
              onSave={doSave}
              onChange={doChange}
              onCompositionStart={doCompositionStart}
              onCompositionEnd={doCompositionEnd}
              onSelectText={setSelected}
              ref={editor}
              setting={setting}
              role_node={role_node}
              setRole_node={setRole_node}
              chapter={chapter}
            />
          ) : null
        }

      </MainPane>
      <SidePane>
        <Box sx={[{ p: 2 }]}>
          <Search onSearch={editor.current?.findString} />
          <WriteTimer ref={writeTimer} />
          <RestTimer ref={restTimer} />
          <WordCountAndSpeed defaultValue={contents} value={value} selected={selected} />
          <WritingCheck onClick={editor.current?.findString} />
        </Box>
        <Setting dataSource={{act, role_node}} folderPath={folderPath} />
      </SidePane>
    </RootPane>

  );
}
