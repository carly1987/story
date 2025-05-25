import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as fs from '@tauri-apps/plugin-fs';
import { Button, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import LinkMUI from '@mui/material/Link';
import { invoke } from "@tauri-apps/api/core";
import SidePane from '../layout/SidePane';
import MenuPane from '../layout/MenuPane';
import RootPane from '../layout/RootPane';
import MainPane from '../layout/MainPane';
import Chapter from '../components/Chapter';
import Editor from '../editor';
import { getStore } from '../store';
import {readJson, updateJson} from '../utils';
import { useDialogCreateFromUrl, useDialogAddChapter } from '../hook/useDialog';
import {useRead} from '../hook/useRead';

export default function ReadPage() {
  const { url } = useParams();
  
  const [root, setRoot] = useState('')
  const [src, setSrc] = useState('');
  const [chapter, setChapter] = useState(0);
  const [name, setName] = useState('');
  const {
    chapterList,setChapterList,
    contentList,setContentList,
    contents,setContents,
    setting,setSetting,
    role_node,setRole_node,
  } = useRead(name, root);
  const [selectorList, setSelectorList] = useState('');
  const [selectorTxt, setSelectorTxt] = useState('');
  const [downloading, setDownloading] = useState(0);
  const isUrl = useMemo(() => url && url.indexOf('http') >= 0, []);
  const { doOpen : doOpenDialogCreateFromUrl, CreateStory } = useDialogCreateFromUrl(async ({ name, selectorList, selectorTxt, path, url: urlForm }: any) => {
    let url = src;
    if (urlForm) {
      url = urlForm;
    }
    let res = 0;
    if (name || path) {
      let folder = name;
      if (path) {
        name = path.replace(root, '');

      }
      setName(name);
      setSelectorList(selectorList);
      setSelectorTxt(selectorTxt);
      folder = `${root}/${name}`;
      const isExists = await fs.exists(folder);
      if (!isExists) {
        fs.mkdir(folder, { recursive: true });
      }
      const folder_url = url.replace(/\/[^\/]+\.html$/, "/");
      const list: any = await invoke('get_chapter_list', { selector: selectorList, url: folder_url });
      console.log(list)
      res = list.length;
      const txtPath = `${root}/${name}/${name}.txt`;
      const hasPath = await fs.exists(txtPath);
      let contents = '';
      if(hasPath) {
        contents = await fs.readTextFile(txtPath);
      }
      const { origin } = new URL(url);
      const newList = list.map((item: string, index: number) => ({
        label: `第${index + 1}章`,
        url: origin + item,
        id: index + 1,
        isExists: isExists ? contents.indexOf(`第${index + 1}章`) >= 0 : false
      }));
      setChapterList(newList);

    }
    return res;
  }, src, name);

  const {doOpen: doOpenDialogChapter, AddChapter} = useDialogAddChapter((chapterName: string) => {
    setChapterList((res: any) => res.concat([{
      id: res.length + 1,
      story: 0,
      label: chapterName
    }]));
  });

  function selectChapter(data: any) {
    if (src) {
      setSrc(data.url);
    } else {
      setChapter(data.id);
      setContents(contentList.filter((item: any) => item.chapter === data.id).map((item: any) => {
        return item.text;
      }) as any);
    }
  }

  async function writeToTxt(chapter: any) {
    if (url) {
      setDownloading(chapter.id);
      let text = chapter.label;
      const res = await invoke("get_text_from_selector", { selector: selectorTxt, url: chapter.url });
      text += res;
      let last_res: any = '';
      for (let i = 2; i <= 10; i++) {
        const sub_res = await invoke("get_text_from_selector", { selector: selectorTxt, url: chapter.url.replace(/([^\/]+)\.html$/, `$1_${i}.html`) });
        if (sub_res === 'err' || sub_res === 'no' || sub_res === last_res) {
          break;
        }
        last_res = sub_res;
        text += sub_res;
      }

      const txtPath = `${root}/${name}/${name}.txt`;
      await fs.writeTextFile(txtPath, text, { append: true, create: true });
      setDownloading(0);
      setChapterList((list: any) => list.map((item: any) => ({ ...item, isExists: item.id === chapter.id ? true : item.isExists })));
      setContentList((list: any) => {
        let id = 0;
        if(list.length) {
          id =  list[list.length - 1].id + 1;
        }
        list.push({id,chapter: chapter.id, story:0, text: text});
        return [...list];
      });
    }
  }

  function startProxy() {
    const { protocol, hostname } = new URL(src);
    invoke("start_proxy", { source: `${protocol}//${hostname}` });
    setSrc(`http://127.0.0.1:3030/proxy?url=${url}`);
  }

  async function init() {
    const root: any = await getStore('story_root');
    if (root.value) {
      setRoot(root.value);
      if (url && isUrl) {
        const src = decodeURIComponent(url);
        setSrc(src);
      } else if (url) {
        setName(url);
      }
    }

  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setChapter(chapter || chapterList[0].id)
  }, [chapterList])

  return (
    <RootPane tabIndex="0">
      <MenuPane>
        {
          isUrl ? (<Button onClick={startProxy}>开始代理</Button>) : null
        }
        <Button onClick={doOpenDialogCreateFromUrl}>下载小说</Button>
        <Button onClick={doOpenDialogChapter}>新建章节</Button>
        {AddChapter}
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
        {
          chapterList.length ? (
            <Chapter
              defaultValue={chapter}
              dataSource={chapterList}
              onChange={selectChapter}
              onMore={isUrl || selectorList || selectorTxt ? writeToTxt : null}
              saving={downloading}
            />
          ) : null
        }
        {CreateStory}
      </MenuPane>
      <MainPane>
        {
          chapter ? (
            <Editor 
              value={contents.join('\n')} 
              name={name} 
              root={root}
              setting={setting}
              role_node={role_node}
              setRole_node={setRole_node}
            />
          ) : null
        }
        {/* {
          contentList.length ? (
            <Article dataSource={contentList} chapter={chapter} />
          ) : null
        } */}
        {
          src ? (<iframe src={src} width="100%" height="100%"></iframe>) : null
        }
      </MainPane>
      <SidePane>
      </SidePane>
    </RootPane>
  );
}
