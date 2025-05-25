import * as R from 'ramda';
import {getStore} from '../store';
import {readJson} from '../utils';

export function processSize(size: number | string) {
  return !/^\d+$/.test(size as string) ? size : `${size}px`;
}

export function noop() {}

async function getWords() {
  const root: any = await getStore('story_root');
  const word_path = `${root.value}/words.json`;
  const list = await readJson(word_path);
  return list;
}

export async function searchWord(word: string) {
  const list = await getWords();
  if(list?.length){
    return list.filter((item: any) => word.indexOf(item.word) >= 0);
  } 
  return [];
}

export function modify_words_hover_contents(words: any[]) {
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    words[i] = { value:  `**词库:${w.word}：**` };
    words.splice(i + 1, 0, { value: "```html\n" + w.eg?.map((data: any) => data.text).join("\n") + "\n```" });
    i++;
  }
  return words;
}

function modify_role_hover_contents(role: any) {
  const words = [];
  words.push({value:  `**${role.type}:${role.label}：**`});
  words.push({ 
    isTrusted: true,
    supportHtml: true,
    value: `<a href="#" onclick="alert('链接被点击了!')">编辑</a>` })
  return words;
}

function insertToDefaultRoot(root: any[], data: any) {
  const list = root.filter((item) => item.type === 'default');
  if(list.length) {
    root.map((item: any) => {
      if(item.type === 'default') {
        item.label.push(data.label);
      }
      return item;
    });
  } else {
    root.push({
      type: 'default',
      label: [data.label],
      value: 'default'
    })
  }
}

export async function getKeyWord(config: any) {
  const nodes = config.role_node?.nodes || []
  const stuffs = config.setting?.stuff || [];
  const root: any[] = [];
  const suggestions: any[] = [];
  const roles: any[] = [];
  const roleKeyWords: any[] = [];
  const defaultKeyWords: any[] = [];
  const words = await getWords();
  words.map((word: any) => {
    insertToDefaultRoot(root, {label: word.word});
  });
  nodes.map((node: any) => {
    suggestions.push({
      label: node.data.label,
      insertText: node.data.label,
    });
    roles.push({
      ...node.data,
      content:  modify_role_hover_contents(node.data),
    });
    roleKeyWords.push(node.data.label);
    if(node.data.type === '主角') {
      root.push({
        type: node.data.type,
        label: [node.data.label],
        value: "zhujue"
      })
    } else{
      const list = root.filter((item) => item.type === node.data.type);
      if(list.length) {
        root.map((item: any) => {
          if(item.type === node.data.type) {
            item.label.push(node.data.label);
          }
          return item;
        });
      } else {
        root.push({
          type: node.data.type,
          label: [node.data.label],
          value: getTypeValue(node.data.type)
        })
      }
    }
  });
  stuffs.map((stuff: any) => {
    insertToDefaultRoot(root, stuff);
  });
  const jobs = R.pipe(
    R.groupBy((role: any) => role.data.job || '无职业'),
    R.toPairs,
    R.map(([job, list]) => ({ job, list }))
  )(nodes);
  jobs.map(({job, list}: any) => {
    const text = list.map((item: any) => item.data.label || item.data.name).join('，');
    suggestions.push({
      label: job,
      insertText: job+text,
      detail: text,
    });
  });
  const res =  root.map((data: any) => {
    return [new RegExp(`(${data.label.join('|')})`), data.value];
  });
  return {
    roots: res,
    suggestions,
    roleKeyWords,
    roles
  };
}

function getTypeValue(type: string) {
  switch (type) {
    case '正面': {
      return 'zheng';
    }
    case '反面': {
      return 'fan';
    }
    case '中性': {
      return 'zhong';
    }
    default:{
      return 'default'
    }
  }
}