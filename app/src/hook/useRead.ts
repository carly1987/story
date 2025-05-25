import { useState, useEffect } from 'react';
import * as fs from '@tauri-apps/plugin-fs';
import { invoke } from "@tauri-apps/api/core";
import { readJson } from '../utils';

export function useRead(name: string, root: string) {
  const [chapterList, setChapterList] = useState<any[]>([]);
  const [contentList, setContentList] = useState<string[]>([]);
  const [contents, setContents] = useState('');
  const [setting, setSetting] = useState<any>(null);
  const [role_node, setRole_node] = useState<any>(null);
  const [act, setAct] = useState<any>([]);

  async function init() {
    if (name) {
      onRead(`${root}/${name}`, name);

    }

  }
  async function onRead(path: string, name: string) {
    const txt_path = `${path}/${name}.txt`
    const hasPath = await fs.exists(txt_path);

    if (hasPath) {
      const story_data: any = await invoke('read_text', { path: txt_path });
      let chapter_list = [];
      if (story_data.chapter_list.length) {
        chapter_list = story_data.chapter_list;
      } else {
        chapter_list = [{
          id: 1,
          story: 0,
          label: '第一章'
        }];
      }
      setChapterList(chapter_list);
      const content_list = chapter_list.map((chapter: any) => {
        const content = story_data.content_list.filter((item: any) => item.chapter === chapter.id);
        return {
          chapter: chapter.id,
          chapterLabel: chapter.label,
          text: content.map((item: any) => item.text).join('\n')
        }
      });
      setContentList(content_list);
      setContents(content_list.filter((item: any) => item.chapter === chapter_list[0]?.id).map((item: any) => item.text));
      const setting: any = await readJson(`${path}/setting.json`);
      setSetting(setting);
      const role_node: any = await readJson(`${path}/role_node.json`);
      setRole_node(role_node);
      const act: any = await readJson(`${path}/act.json`);
      setAct(act);
    }

  }

  useEffect(() => {
    init();
  }, [name, root]);

  return {
    chapterList, setChapterList,
    contentList, setContentList,
    contents, setContents,
    setting, setSetting,
    role_node, setRole_node,
    act, setAct,
    folderPath: `${root}/${name}`
  };
}