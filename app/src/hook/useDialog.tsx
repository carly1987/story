import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import * as R from 'ramda';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack, Divider } from '@mui/material';
import * as dialog from '@tauri-apps/plugin-dialog';
import { styled } from '@mui/material/styles';
import * as fs from '@tauri-apps/plugin-fs';
import Drag from '../components/Drag';
import Select, { WordTypeSelect } from '../components/Select';
import * as Constants from '../constants';
import { getStore } from '../store';
import { readJson } from '../utils';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function useDialog() {
  const [open, setOpen] = useState(false);
  function doOpen() {
    setOpen(true);
  }
  function doClose() {
    setOpen(false);
  }
  return { open, doOpen, doClose }
}

export function useDialogCreateFromUrl(onSave: any, url?: string, name?: string) {
  const { open, doOpen, doClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState('');
  async function doSelect() {
    const path = await dialog.open({
      multiple: false,
      directory: true,
    });
    if (path) {
      setPath(path);
    }

  }
  const doSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    setLoading(true)
    const res = await onSave(formJson);
    setLoading(false);
    doClose();
  }

  function close() {
    setLoading(false);
    doClose();
  }

  const CreateStory = (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        component: 'form',
        onSubmit: doSave,
      }}
    >
      <DialogTitle>创建小说</DialogTitle>
      <DialogContent>
        <DialogContentText>
          输入小说名字，或者选择本地小说
        </DialogContentText>
        <Stack direction="row">
          <TextField
            autoFocus
            margin="dense"
            name="name"
            defaultValue={name}
            label="小说名"
            fullWidth
            variant="standard"
          />
          <Button onClick={doSelect}>选择本地小说<VisuallyHiddenInput name="path" defaultValue={path} type="text" /></Button>
        </Stack>
        {
          url ? null : (
            <TextField
              autoFocus
              required
              margin="dense"
              name="url"
              label="小说目录网址"
              fullWidth
              variant="standard"
            />
          )
        }
        <TextField
          autoFocus
          required
          margin="dense"
          name="selectorList"
          label="选定页面上的tag而获取所有章节"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          name="selectorTxt"
          label="选定页面上的tag而获取文本"
          fullWidth
          variant="standard"
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button type="submit" loading={loading}>保存</Button>
      </DialogActions>
    </Dialog>
  )
  return { CreateStory, doOpen }
}

export function useDialogAddWord() {
  const { open, doOpen, doClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState('');
  const [word_path, setWord_path] = useState('');
  const [word_list, setWord_list] = useState<any[]>([]);
  const [words_list, setWords_list] = useState<any[]>([]);
  const doSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    setLoading(true);
    let list;
    if (formJson.word) {
      list = words_list.map((item: any) => item.id == formJson.word ? ({ ...item, eg: item.eg?.concat([{ text: word, stage: '' }]) }) : item);
    } else if (formJson.type) {
      list = words_list.concat([{
        word,
        type: formJson.type,
        id: uuidv4(),
        mood: formJson.mood,
        eg: []
      }])
    }
    const contents = JSON.stringify(list);
    const encoder = new TextEncoder();
    const data = encoder.encode(contents);
    fs.writeFile(word_path, data, { create: true });
    setLoading(false);
    doClose();
  }
  async function doOpenDialogAddWord(word: string) {
    const root: any = await getStore('story_root');
    const word_path = `${root.value}/words.json`;
    const words_list = await readJson(word_path);
    const word_list = words_list.filter((item: any) => word.indexOf(item.word) >= 0).map((item: any) => ({ ...item, label: item.word, value: item.id }));
    const hasWord = word_list.filter((item: any) => item.word === word || item.eg?.filter((data: any) => data.text === word).length > 0).length > 0;
    if (hasWord) {
      await dialog.message(`${word}，已经存在！`, { title: '友情提醒', kind: 'error' });
    } else {
      setWord(word);
      setWord_list(word_list);
      setWords_list(words_list);
      setWord_path(word_path);
      doOpen();
    }
  }
  const AddWord = (
    <Dialog
      open={open}
      onClose={doClose}
      PaperProps={{
        component: 'form',
        onSubmit: doSave,
      }}
    >
      <DialogTitle>加入词库</DialogTitle>
      <DialogContent>
        <DialogContentText>
          文本：{word}
        </DialogContentText>
        <Select label="加入词汇" name="word" dataSource={word_list} />
        <Divider>或者</Divider>
        <WordTypeSelect label="词汇类型" name="type" />
        <Select label="情感" name="mood" dataSource={Constants.Mood} />
      </DialogContent>
      <DialogActions>
        <Button onClick={doClose}>取消</Button>
        <Button type="submit" loading={loading}>保存</Button>
      </DialogActions>
    </Dialog>
  );
  return { AddWord, doOpenDialogAddWord }
}

export function useDialogPlot(plots: any, onSave: any) {
  const { open, doOpen, doClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([{ name: 'plot1' }]);

  const doSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    setLoading(true);
    onSave(formJson);
    setLoading(false);
    doClose();
  }

  const doAddPlot = () => {
    setList((res) => res.concat([{ name: `plot${res.length + 1}` }]));
  }

  useEffect(() => {
    if (plots && !R.isEmpty(plots)) {
      const plotList = Object.keys(plots);
      setList(plotList.map((key: string) => ({ name: key, value: plots[key] })))
    }
  }, [plots])

  const SetPlot = (
    <Dialog
      open={open}
      onClose={doClose}
      maxWidth="lg"
      PaperProps={{
        component: 'form',
        onSubmit: doSave,
      }}
      PaperComponent={Drag}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">设置情节</DialogTitle>
      <DialogContent>
        {
          list.map((plot: any) => (
            <TextField
              autoFocus
              margin="dense"
              name={plot.name}
              key={plot.name}
              defaultValue={plot.value}
              label="情节"
              fullWidth
              variant="standard"
              multiline
              maxRows={5}
            />
          ))
        }
        <Button onClick={doAddPlot}>添加情节</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={doClose}>取消</Button>
        <Button type="submit" loading={loading}>保存</Button>
      </DialogActions>
    </Dialog>
  );
  return { SetPlot, doOpen }
}

export function useDialogQuestion(qs: any, onSave: any) {
  const { open, doOpen, doClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([{ name: 'q1' }]);

  const doSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    setLoading(true);
    onSave(formJson);
    setLoading(false);
    doClose();
  }

  const doAddPlot = () => {
    setList((res) => res.concat([{ name: `q${res.length + 1}` }]));
  }

  useEffect(() => {
    if (qs && !R.isEmpty(qs)) {
      const plotList = Object.keys(qs);
      setList(plotList.map((key: string) => ({ name: key, value: qs[key] })))
    }
  }, [qs])

  const SetQ = (
    <Dialog
      open={open}
      onClose={doClose}
      maxWidth="lg"
      PaperProps={{
        component: 'form',
        onSubmit: doSave,
      }}
      PaperComponent={Drag}
    >
      <DialogTitle>设置问题</DialogTitle>
      <DialogContent>
        {
          list.map((plot: any) => (
            <TextField
              autoFocus
              margin="dense"
              name={plot.name}
              key={plot.name}
              defaultValue={plot.value}
              label="问题"
              fullWidth
              variant="standard"
              multiline
              maxRows={5}
            />
          ))
        }
        <Button onClick={doAddPlot}>添加情节</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={doClose}>取消</Button>
        <Button type="submit" loading={loading}>保存</Button>
      </DialogActions>
    </Dialog>
  );
  return { SetQ, doOpen }
}

export function useDialogAddChapter(onSave: any) {
  const { open, doOpen, doClose } = useDialog();
  const [loading, setLoading] = useState(false);

  const doSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    setLoading(true);
    onSave(formJson.chapter);
    setLoading(false);
    doClose();
  }

  const AddChapter = (
    <Dialog
      open={open}
      onClose={doClose}
      maxWidth="lg"
      PaperProps={{
        component: 'form',
        onSubmit: doSave,
      }}
    >
      <DialogTitle>创建章节</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="chapter"
          label="章节名"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={doClose}>取消</Button>
        <Button type="submit" loading={loading}>保存</Button>
      </DialogActions>
    </Dialog>
  );
  return { AddChapter, doOpen }
}