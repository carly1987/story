import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Grid } from '@mui/material';
import * as dialog from '@tauri-apps/plugin-dialog';
import * as fs from '@tauri-apps/plugin-fs';
import { invoke } from "@tauri-apps/api/core";
import { v4 as uuidv4 } from 'uuid';
import { useStoryStore, getStore, setStore } from '../store';
import StoryCard from './StoryCard';

export default function WellcomePage() {
  const store: any = useStoryStore((state) => state);
  const navigate = useNavigate();
  async function doCreate() {
    navigate(`/story/detail/`);
  }

  async function doSelect() {
    const path = await dialog.open({
      multiple: false,
      directory: true,
    });
    const {story_data, setting, role_node}: any = await invoke('open_folder', {path:  path});
    store.dispatch({
      story: {
        id: 0,
        name: story_data.name,
        path
      },
      chapter: story_data.chapter_list[0]?.id,
      chapterList: story_data.chapter_list,
      contentsList: story_data.content_list,
      contents: story_data.content_list.map((item: any) => item.text),
      setting, 
      role_node
    });
    navigate(`/write/0/${store.story?.name}`);
  }

  async function doSelectRoot() {
    if (!store.root) {
      const path = await dialog.open({
        multiple: false,
        directory: true,
      });
      if (path) {
        setStore('story_root', path)
        store.dispatch({root:path});
      }

    }

  }

  function gotoRead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    store.initStory();
    navigate(`/read/${encodeURIComponent(formJson.url)}`);
  }

  async function doExport() {
    const path = await dialog.open({
      multiple: false,
      directory: false,
    });
    if (path) {
      const story_data: any = await invoke('read_text', { path });
      console.log('export_story', story_data);
      const toPath = [store.root, story_data.name].join('/');
      fs.mkdir(toPath, { recursive: true });
      fs.copyFile(path, toPath + '/' + story_data.name + '.txt').then(() => {
        // fs.remove(path);
      });
      navigate(`/read/${story_data.name}`);
    } else {
      dialog.message("导入失败");
    }
  }

  async function init() {
    const root: any = await getStore('story_root');
    if (root.value) {
      store.dispatch({root: root.value});
      const list: any = await invoke('local_library', {path: root.value});
      const storyList = list.map((path: string) => {
        const texts= path.split('/');
        return {
          id: uuidv4(),
          name: texts[texts.length - 1],
          path
        }
      });
      store.dispatch({storyList});
    }
    
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <div>
      {
        store.root ? (
          <>
            <Button variant="outlined" onClick={doSelect}>打开小说</Button>
            <Button variant="outlined" onClick={doCreate}>
              创建小说
            </Button>
            <Button variant="outlined" onClick={doExport}>导入小说</Button>
            <Stack direction="row" component="form" onSubmit={gotoRead}>
              <TextField label="输入小说网址" name="url"></TextField>
            </Stack>
          </>
        ) : (
          <Button onClick={doSelectRoot}>选择根目录</Button>
        )
      }
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {store.storyList.map((item: any) => (
          <Grid key={item.id} sx={{ mr: (theme) => theme.spacing(2),mb: (theme) => theme.spacing(2) }}>
            <StoryCard dataSource={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
