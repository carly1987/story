import * as fs from '@tauri-apps/plugin-fs';
import { invoke } from "@tauri-apps/api/core";

export async function readJson(path: string) {
  const hasPath = await fs.exists(path);
  if (hasPath) {
    const str: string = await invoke('read_json', { path });
    return strictJsonParse(str);
  }
  return null;
}

export function updateJson(path: string, data: any) {
  const contents = JSON.stringify(data);
  const encoder = new TextEncoder();
  const str = encoder.encode(contents);
  fs.writeFile(path, str, { create: true });
}

export function updateTxt(path: string, data: any) {
  const encoder = new TextEncoder();
  fs.writeFile(path, encoder.encode(data), {create: true});
}

function strictJsonParse(str: string) {
  if (typeof str !== 'string' || !str.trim()) {
    return null;
  }
  
  try {
    const result = JSON.parse(str);
    return (typeof result === 'object' && result !== null) ? result : null;
  } catch {
    return null;
  }
}

export const debounce: any = (fn: Function, delay: number) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export function NullFn() {
  return false;
}