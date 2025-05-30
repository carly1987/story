import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Grid2, Stack } from '@mui/material';
import * as R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import * as fs from '@tauri-apps/plugin-fs';
import * as dialog from '@tauri-apps/plugin-dialog';
import update from 'immutability-helper';
import MindMap from '../NodeMap/MindMap';
import { FlowContainer } from './styles';
import { TextInput } from '../components/Input';
import MainPane from '../layout/MainPane';
import { getStore, } from '../store';
import { updateJson, readJson } from '../utils';
import Section from '../components/Section';
import DragBox from '../components/DragBox';
import { TitleInput } from '../components/Input';
import Basic from './Basic';
import Env from './Env';
import useArc from '../hook/useArc';
import Stage from './Stage';

export default function StoryDetail() {

  const [list, setList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [setting, setSetting] = useState<any>(null);
  const [role_node, setRole_node] = useState<any>(null);
  const [plot, setPlot] = useState<any>(null);
  const [theme, setTheme] = useState<any>(null);
  const [act, setAct] = useState<any>(null);
  const [folderPath, setFolderPath] = useState<any>('');
  const { name = '' } = useParams();
  // const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { acts, plotPoint, journey, doSavePlotPoint, doSaveJourney, doSaveStage } = useArc(folderPath, act);
  const doChangeRole = (role: any) => {
    if (folderPath) {
      const rolePath = `${folderPath}/role_node.json`;
      updateJson(rolePath, role);
    } else {
      dialog.message('先创建小说！', { title: '提醒', kind: 'error' });
    }

  }

  const doChangeTheme = (theme: any) => {
    if (folderPath) {
      const path = `${folderPath}/theme.json`;
      updateJson(path, theme);
    } else {
      dialog.message('先创建小说！', { title: '提醒', kind: 'error' });
    }

  }

  const doChangePlot = (plot: any) => {
    if (folderPath) {
      const path = `${folderPath}/plot.json`;
      updateJson(path, plot);
    } else {
      dialog.message('先创建小说！', { title: '提醒', kind: 'error' });
    }

  }

  async function init() {
    if (name && name !== '0') {
      const root: any = await getStore('story_root');
      const folderPath = `${root.value}/${name}`;
      setFolderPath(folderPath);
      const setting_path = `${folderPath}/setting.json`;
      const role_path = `${folderPath}/role_node.json`;
      const theme_path = `${folderPath}/theme.json`;
      const setting = await readJson(setting_path);
      setSetting(setting)
      const role_node = await readJson(role_path);
      setRole_node(role_node);
      const theme = await readJson(theme_path);
      setTheme(theme);
      const act_path = `${folderPath}/act.json`;
      const act = await readJson(act_path);
      setAct(act);
      const plot_path = `${folderPath}/plot.json`;
      const plot = await readJson(plot_path);
      setPlot(plot);
    }
  }

  async function doSaveSetting(_: string, formJson: any) {
    if (folderPath) {
      const setting_path = `${folderPath}/setting.json`;
      const contents = JSON.stringify(formJson);
      const encoder = new TextEncoder();
      const data = encoder.encode(contents);
      fs.writeFile(setting_path, data, { create: true });
      setSetting(data);
    } else {
      const root: any = await getStore('story_root');
      const path = `${root.value}/${formJson.name}`;
      fs.mkdir(path, { recursive: true });
      const txtPath = `${path}/${formJson.name}.txt`;
      fs.writeFile(txtPath, new Uint8Array(), { create: true });
      const settingPath = `${path}/setting.json`;
      const contents = JSON.stringify(formJson);
      const encoder = new TextEncoder();
      const data = encoder.encode(contents);
      fs.writeFile(settingPath, data, { create: true });
      setFolderPath(path);
      setSetting(data);
      dialog.message("小说创建成功！");
    }

  }

  const doMove = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log('doMove', dragIndex, hoverIndex);
    setList((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  useEffect(() => {
    init();
    setList([
      {
        title: '基础信息',
        key: 'setting',
        onChange: doSaveSetting,
      },
      {
        title: '背景环境',
        key: 'env',
      },
      {
        title: '人物关系',
        key: 'role',
      },
      {
        title: '主题图',
        key: 'theme',
      },
      {
        title: '情节关节点模式',
        key: 'point',
        onChange: doSavePlotPoint,
        component: 'div'
      },
      {
        title: '英雄旅游模式',
        key: 'journey',
        onChange: doSaveJourney,
        component: 'div'
      },
      {
        title: '场景清单',
        key: 'stage',
        component: 'div'
      },
      {
        title: '场景网',
        key: 'plot',
      }
    ])
  }, []);

  return (
    <DndProvider
      backend={TouchBackend}
      options={{ enableMouseEvents: true, enableKeyboardEvents: true }}
    >
      <MainPane>
        <Grid2 container spacing={2}>
          {
            list.map((item: any, index: number) => (
              <DragBox
                key={item.key}
                onMove={doMove}
                index={index}
                id={item.key}
              >
                <Section title={item.title} onChange={item.onChange} component={item.component}>
                  {
                    item.key === 'setting' ? (<Basic dataSource={setting} />) : null
                  }
                  {
                    item.key === 'env' ? (<Env />) : null
                  }
                  {
                    item.key === 'role' ? (<FlowContainer>
                      <MindMap
                        nodeType="role"
                        onNodeClick={toggleDrawer}
                        onChange={doChangeRole}
                        dataSource={role_node}
                      />
                    </FlowContainer>) : null
                  }
                  {
                    item.key === 'theme' ? (<FlowContainer>
                      <MindMap
                        onNodeClick={toggleDrawer}
                        onChange={doChangeTheme}
                        nodeType="theme"
                        dataSource={theme}
                      />
                    </FlowContainer>) : null
                  }
                  {
                    item.key === 'point' ? acts.map((data: any, index: number) => (
                      <Section
                        key={data.name}
                        title={<TitleInput data={data} />}
                        onChange={doSavePlotPoint}
                      >
                        {
                          plotPoint[index] && plotPoint[index].length ? R.splitEvery(2, plotPoint[index]).map((fileds: any) => (
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }} key={uuidv4()}>
                              {
                                fileds.map((field: any) => (
                                  <TextInput
                                    key={field.name}
                                    defaultValue={field.value}
                                    label={field.label}
                                    note={field.note}
                                    name={field.name}
                                  />
                                ))
                              }
                            </Stack>
                          )) : null
                        }
                      </Section>
                    )) : null
                  }
                  {
                    item.key === 'journey' ? acts.map((data: any, index: number) => (
                      <Section
                        key={data.name}
                        title={<TitleInput data={data} />}
                        onChange={doSaveJourney}
                      >
                        {
                          journey[index].map((field: any) => (
                            <TextInput
                              key={field.name}
                              defaultValue={field.value}
                              label={field.label}
                              note={field.note}
                              name={field.name}
                            />
                          ))
                        }
                      </Section>
                    )) : null
                  }
                  {
                    item.key === 'stage' ? acts.map((data: any) => (
                      <Section
                        key={data.name}
                        title={<TitleInput data={data} />}
                        onChange={doSaveStage}
                      >
                        <Stage dataSource={data.stage} />
                      </Section>
                    )) : null
                  }
                  {
                    item.key === 'plot' ? (<FlowContainer>
                      <MindMap
                        onChange={doChangePlot}
                        nodeType="plot"
                        dataSource={plot}
                      />
                    </FlowContainer>) : null
                  }
                </Section>
              </DragBox>
            ))
          }
        </Grid2>
      </MainPane>
    </DndProvider>
  );
}

