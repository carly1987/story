import {create} from 'zustand';
import { load } from '@tauri-apps/plugin-store';

const initStoryState = {
  storyList: [],
  story: null,
  chapter: null,
  chapterList: [],
  contentsList: [],
  contents: [],
  textAllSize: 0,
  textNewSize: 0,
  setting: {},
  role_node: [],
  plots: [],
  root: ''
};

const store = await load('store.json', { autoSave: false });

export async function getStore(key: string) {
  return await store.get(key);
}

export async function setStore(key: string, v: string) {
  return await store.set(key, {value: v});
}

export const useStoryStore = create((set) => ({
  ...initStoryState,
  dispatch: (data: any) => set((state: any) => ({ ...state, ...data })),
  initStory: () => set((state: any) => ({...initStoryState, root: state.root, storyList:state.storyList})),
}));