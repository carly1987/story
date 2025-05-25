import { useState, forwardRef, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as dialog from '@tauri-apps/plugin-dialog';
import { readJson, updateJson, updateTxt } from '../utils';
import { useDialogAddWord } from '../hook/useDialog';
import MonacoEditor from "./editor";
export * from "./types";

const Editor = forwardRef<any, any>(({
  value,
  dataSource,
  root,
  name,
  chapter,
  setting,
  role_node,
  setRole_node,
  onSave,
  onChange,
  onCompositionStart,
  onCompositionEnd,
  onSelectText
}, ref: any) => {
  const [saving, setSaving] = useState(false);
  const [list, setList] = useState(dataSource);
  const { doOpenDialogAddWord, AddWord } = useDialogAddWord();

  async function doAddArea(text: string) {
    const area = {
      id: uuidv4(),
      label: text,
      detail: ''
    }
    const setting_path = `${root}/${name}/setting.json`;
    let setting = await readJson(setting_path);
    if (setting) {
      const hasArea = setting.area?.filter((item: any) => item.label === text).length;
      if (hasArea) {
        await dialog.message('地名已存在', { title: '提醒', kind: 'error' });
      } else {
        setting.area?.push(area);
      }
    } else {
      setting = {
        area: [area]
      }
    }

    updateJson(setting_path, setting);
  }

  async function doAddPlace(text: string) {
    const place = {
      id: uuidv4(),
      label: text,
      detail: ''
    }
    const setting_path = `${root}/${name}/setting.json`;
    let setting = await readJson(setting_path);
    if (setting) {
      const hasArea = setting.place?.filter((item: any) => item.label === text).length;
      if (hasArea) {
        await dialog.message('地标已存在', { title: '提醒', kind: 'error' });
      } else {
        setting.place?.push(place);
      }
    } else {
      setting = {
        place: [place]
      }
    }

    updateJson(setting_path, setting);
  }

  async function doAddFood(text: string) {
    const food = {
      id: uuidv4(),
      label: text,
      detail: ''
    }
    const setting_path = `${root}/${name}/setting.json`;
    let setting = await readJson(setting_path);
    if (setting) {
      const hasArea = setting.food?.filter((item: any) => item.label === text).length;
      if (hasArea) {
        await dialog.message('食物已存在', { title: '提醒', kind: 'error' });
      } else {
        setting.food?.push(food);
      }
    } else {
      setting = {
        food: [food]
      }
    }

    updateJson(setting_path, setting);
  }

  async function doAddStuff(text: string) {
    const stuff = {
      id: uuidv4(),
      label: text,
      detail: ''
    }
    const setting_path = `${root}/${name}/setting.json`;
    let setting = await readJson(setting_path);
    if (setting) {
      const hasArea = setting.stuff?.filter((item: any) => item.label === text).length;
      if (hasArea) {
        await dialog.message('物品已存在', { title: '提醒', kind: 'error' });
      } else {
        setting.stuff?.push(stuff);
      }
    } else {
      setting = {
        stuff: [stuff]
      }
    }
    updateJson(setting_path, setting);
  }

  async function doAddRole(role: string) {
    const node = {
      id: uuidv4(),
      type: 'role',
      data: {
        label: role,
      },
      position: { x: 0, y: 50 },
    };
    const role_path = `${root}/${name}/role_node.json`;
    let role_node = await readJson(role_path);
    if (role_node?.nodes?.length) {
      const hasRole = role_node.nodes.filter((node: any) => node.data.label === role).length;
      if (hasRole) {
        await dialog.message('角色已存在', { title: '提醒', kind: 'error' });
      } else {
        role_node.nodes.push(node);
      }
      setRole_node(role_node);
    } else {
      role_node = {
        nodes: [node],
      }
    }
    updateJson(role_path, role_node);
  }

  async function doKeyUp(event: React.KeyboardEvent) {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      const txtPath = `${root}/${name}/${name}.txt`;
      const content = ref?.current?.getValue();
      const newList: any[] = [];
      let text = '';
      list.map((item: any) => {
        const str = item.chapter === chapter?.id ? content : item.text;
        newList.push({
          ...item,
          text: str
        });
        text += `\n\n${item.chapter === chapter?.id ? chapter.label : item.chapterLabel}\n${str}\n`;
      });
      updateTxt(txtPath, text);
      onSave([...newList]);
      setList([...newList]);
    }
  }

  useEffect(() => {
    if (dataSource?.length) {
      setList(dataSource)
    }
  }, [dataSource]);

  return (
    <div tabIndex={0} onKeyUp={doKeyUp}>
      <MonacoEditor
        value={value}
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
        onChange={onChange}
        // onFocus={doFocus}
        // onBlur={doBlur}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        ref={ref}
        config={{ setting, role_node, name }}
        onAction={{
          addWord: doOpenDialogAddWord,
          editRole: doAddRole,
          addArea: doAddArea,
          addPlace: doAddPlace,
          addFood: doAddFood,
          addStuff: doAddStuff,
          textCount: onSelectText
        }}
      />
      {AddWord}
    </div>
  )
});
export default Editor;