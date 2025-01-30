import { useEffect, useReducer } from 'react';
import * as fs from '@tauri-apps/plugin-fs';
import { invoke } from "@tauri-apps/api/core";
import { open } from '@tauri-apps/plugin-dialog';
import createStoreHook from './createStoreHook';
import { load } from '@tauri-apps/plugin-store';

export interface StoryAction {
  type: string;
  payload?: any
}

export interface Story{
  id?: number | string;
  name?: string;
}

export enum StoryActionType {
  GET_STORY_List = 'get_story_list',
  INIT_STORY = 'init_story',
  INIT_CHAPTER = 'init_chapter',
  INIT_CONTENT = 'init_content',
  ADD_STORY = 'add_story',
  OPEN_STORY = 'open_story',
  ADD_CHAPTER = 'add_chapter',
  TYPING = 'typing',
}

export const initStoryState: any = {
  list: [],
  story: null,
  chapter: null,
  chapterList: [],
  contentsList: [],
  contents: [],
  textAllSize: 0,
  textNewSize: 0,
  story_file: ''
}

export function storyReducer(state: any, action: StoryAction) {
  switch (action.type) {
    case StoryActionType.GET_STORY_List: {
      console.log('GET_STORY_List')
      return {
        ...state,
        ...action.payload
      };
    }
    case StoryActionType.INIT_STORY: {
      console.log('INIT_STORY', state, {
        ...state,
        ...action.payload
      })
      return {
        ...state,
        ...action.payload
      };
    }
    case StoryActionType.INIT_CHAPTER: {
      console.log('INIT_CHAPTER')
      return {
        ...state,
        ...action.payload
      };
    }
    case StoryActionType.INIT_CONTENT: {
      console.log('INIT_CONTENT')
      return {
        ...state,
        ...action.payload
      };
    }
    case StoryActionType.ADD_STORY: {
      console.log('ADD_STORY')
      const story = action.payload;
      const list = state.list.concat([story]);
      return {
        ...state,
        story,
        list
      };
    }
    case StoryActionType.ADD_CHAPTER: {
      console.log('ADD_CHAPTER')
      const chapter = action.payload;
      const chapterList = state.chapterList.concat([chapter]);
      return {
        ...state,
        chapterList,
        chapter: chapter.id
      };
    }
    case StoryActionType.TYPING: {
      console.log('TYPING')
      const value = action.payload;
      const textAllSize = value.len;
      return {
        ...state,
        textAllSize
      };
    }
    case StoryActionType.OPEN_STORY: {
      console.log('OPEN_STORY', action.payload)
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}

async function getAllStory() {
  return await invoke("get_all_story", { });
}

async function getAllChapter(id: number) {
  const data: any = await invoke("get_all_chapter", { id });
  const list = data.map((item: any) => ({
    id: String(item.id),
    label: item.title
  }));
  return list;
}

async function getAllContents(story: number, chapter: number) {
  const list: any = await invoke("get_all_content", { 
    story: story, 
    chapter: chapter
  });
  const contents = list.map((item: any) => item.text);
  return {
    contentsList: list,
    contents
  }
}

export const useStoryStore = createStoreHook(storyReducer, initStoryState);

const store = await load('store.json', { autoSave: false });

export async function openStory(dispatch: any) {
  const file = await open({
    multiple: false,
    directory: false,
  });
  const res: any = await invoke('open_txt', {path:  file});
  
  await store.set('story_file', { value: file });
  dispatch({
    type: StoryActionType.OPEN_STORY,
    payload: {
      story: {
        id: 0,
        name: res.name
      },
      chapter: res.chapter_list[0]?.id,
      chapterList: res.chapter_list,
      contentsList: res.content_list,
      contents: res.content_list.map((item: any) => item.text),
      story_file: file
    }
  });
}

export async function selectStory(story: Story, dispatch: any) {
  const chapterList = await getAllChapter(Number(story.id));
  const chapter = chapterList[0]?.id;
  let data: any = {};
  if(chapter) {
    data = await getAllContents(Number(story?.id), Number(chapter));
  }
  dispatch({
    type: StoryActionType.INIT_STORY,
    payload: {
      story,
      chapterList,
      chapter,
      contentsList: data.contentsList || [], 
      contents: data.contents || []
    }
  });
}

export async function getStoryList(dispatch: any) {
  const list = await getAllStory();
  dispatch({
    type: StoryActionType.GET_STORY_List,
    payload: {
      list
    }
  });
}

export async function addStory(name: string, dispatch: any) {
  const id = await invoke("add_story", { name });
  dispatch({
    type: StoryActionType.ADD_STORY,
    payload: {
      id,
      name
    }
  });
}

export async function addChapter(name: string, state:any, dispatch: any) {
  let id = 0;
  const chapter_name = `第${state.chapterList?.length + 1}章 ${name}`;
  if(state.story?.id !== '0' && state.story?.id) {
    id = await invoke("add_chapter", { name: chapter_name, story: Number(state.story?.id) });
  } else {
    id = state.chapterList?.length + 1;
  }
  dispatch({
    type: StoryActionType.ADD_CHAPTER,
    payload: {
      id: String(id),
      label: chapter_name
    }
  });
}

export async function getContents(state:any, dispatch: any) {
  if(state.chapter && state.story?.id) {
    const {contentsList, contents} = await getAllContents(Number(state.story?.id), Number(state.chapter));
    dispatch({
      type: StoryActionType.INIT_CONTENT,
      payload: {
        contentsList,
        contents
      }
    });
  }
}

function deleteContent(id: number) {
  invoke("delete_content", { id });
  
}

export async function updateContent(data = '', state:any, dispatch: any) {
  const list = data.split('\n');
  let contentsList: any[] = [];
  if(state.contents?.length) {
    if(list.length < state.contentsList.length){
      contentsList = await Promise.all(state.contentsList.map(async (item: any, index: number) => {
        if(list[index]) {
          let id = state.contentsList[index].id;
          if(state.story.id !== '0' && state.story?.id){
            id = await invoke("update_content", {id: String(state.contentsList[index].id), text: list[index]});
          }
          return {
            id,
            text: list[index]
          }
        } else {
          if(state.story.id !== '0' && state.story?.id) {
            const res: number = await invoke("delete_content", { id: item.id });
            console.log("delete", res);
          }
          return null
        }
      }).filter((content: string) => content !== null));
    } else {
      contentsList = await Promise.all(list.map(async (content: string, index: number) => {
        if(state.contentsList[index]){
          let id = state.contentsList[index].id;
          if(state.story.id !== '0' && state.story?.id){
            id = await invoke("update_content", {id: String(state.contentsList[index].id), text: content});
          }
          return {
            id,
            text: content
          }
        } else if (!state.contentsList[index] && list[index]) {
          let id = 0
          if(state.story.id !== '0' && state.story?.id){
            id = await invoke("create_content", {content, story: Number(state.story.id), chapter: Number(state.chapter)});
          }
          return {
            id,
            text: content,
            story: Number(state.story.id),
            chapter: Number(state.chapter),
          }
        }
      }));
    }
  } else {
    contentsList = await Promise.all(list.map(async (content: string) => {
      let id = 0
      if(state.story.id !== '0'){
        id = await invoke("create_content", {content, story: Number(state.story.id), chapter: Number(state.chapter)});
      }
      return {
        id,
        text: content
      }
    }));
  }
  dispatch({
    type: StoryActionType.INIT_CONTENT,
    payload: {
      contentsList,
      contents: list
    }
  });
  const text = list.join('\n');
  const encoder = new TextEncoder();
  const path: any = await store.get<{ value: number }>('story_file');
  console.log('update', state)
  fs.writeFile(path.value, encoder.encode(text), {create: true});
  return contentsList.length;
}

export async function uploadStory() {
  const file = await open({
    multiple: false,
    directory: false,
  });
  invoke("uploadTxt", {path:  file});
}



export async function selectChapter(chapter: string, state:any, dispatch: any){
  console.log('selectChapter', chapter, state)
  if(chapter && state.story?.id) {
    const {contentsList, contents} = await getAllContents(Number(state.story?.id), Number(chapter));
    dispatch({
      type: StoryActionType.INIT_CHAPTER,
      payload: {
        chapter: Number(chapter),
        contentsList, 
        contents
      }
    });
  }
  
}
