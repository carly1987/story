import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const WordCountAndSpeed = forwardRef(({defaultValue, value, selected}: any, ref) => {

  const [newWords, setNewWords] = useState(0);
  const [selectWords, setSelectWords] = useState(0);

  useEffect(() => {
    if(value){
      const newText = value.slice(defaultValue?.length); 
      const newWordCount = newText.length;
      setNewWords(newWordCount);
    }
  }, [value]);
  useEffect(() => {
    setSelectWords(selected.length);
  }, [selected]);

  useImperativeHandle(ref, () => {
    return {
      get() {
        return newWords;
      }
    };
  }, []);

  return (
    <div>
      <p>新输入的字数：{newWords}字</p>
      <p>章节总字数：{value.length || defaultValue?.length}字</p>
      {
        selectWords ? <p>选中段落的字数：{selectWords}字</p> : null
      }
    </div>
  );
});

export default WordCountAndSpeed;