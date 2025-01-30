import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const WordCountAndSpeed = forwardRef(({defaultValue, value}: any, ref) => {

  const [newWords, setNewWords] = useState(0); // 新输入的字数

  useEffect(() => {
    if(value){
      const newText = value.slice(defaultValue.length); 
      const newWordCount = newText.length;
      setNewWords(newWordCount);
    }
  }, [value]);

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
      <p>章节总字数：{value.length || defaultValue.length}字</p>
    </div>
  );
});

export default WordCountAndSpeed;