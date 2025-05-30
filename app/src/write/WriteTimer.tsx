import { forwardRef, useImperativeHandle, useState } from 'react';
 
const WriteTimer = forwardRef(({}, ref) => {
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  function formatSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  

  const start = () => {
    setIntervalId((id: any) => {
      if(!id){
        return setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }
      return id;
    });
  };

  const pause = () => {
    setIntervalId((id) => {
      if(id) {
        clearInterval(id);
        return null
      }
      return id;
    });
  };

  const reset = () => {
    pause();
    setSeconds(0);
  };

  useImperativeHandle(ref, () => {
    return {
      start,
      pause,
      reset,
      get() {
        return intervalId;
      }
    };
  }, []);

  return (
    <div>
      <h3>码字时间</h3>
      <p>{formatSeconds(seconds)}</p>
    </div>
  );
});
 
export default WriteTimer;
