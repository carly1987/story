import { useEffect, useState } from 'react';
import * as R from 'ramda';

const initData = [
  {
    title: '第一幕: 开头',
    name: 'start',
    text: '',
  },
  {
    title: '第二幕: 中间',
    name: 'middle',
    text: '',
  },
  {
    title: '第三幕: 结尾',
    name: 'end',
    text: '',
  }
];

const initDataPlotPoint = [
  [
    {
      name: 'triggerEvent',
      label: '诱发事件',
      note: '推动大问题1',
      value: ''
    },
    {
      name: 'qb1',
      label: '大问题1',
      value: ''
    },
    {
      name: 'PointEvent1',
      label: '情节关节点1',
      note: '推动大问题2',
      value: ''
    },
    {
      name: 'qb2',
      label: '大问题2',
      value: ''
    }
  ],
  [
    {
      name: 'middleEvent',
      label: '中点事件',
      note: '推动大问题3',
      value: ''
    },
    {
      name: 'qb3',
      label: '大问题3',
      value: ''
    },
    {
      name: 'PointEvent2',
      label: '情节关节点2',
      note: '回答大问题4',
      value: ''
    },
    {
      name: 'qb4',
      label: '大问题4',
      value: ''
    }
  ],
  [
    {
      name: 'highEvent',
      label: '高潮',
      note: '最大事件，回答统领性问题和大问题5',
      value: ''
    },
    {
      name: 'qb5',
      label: '大问题5',
      value: ''
    },
    {
      name: 'endEvent',
      label: '尾声',
      note: '回答大问题6',
      value: ''
    },
    {
      name: 'qb6',
      label: '大问题6',
      value: ''
    }
  ],
];

const initDataJourney = [
  [
    {
      name: 'Ordinary',
      label: '现状',
      note: '主人公所处的普通生活环境',
      value: ''
    },
    {
      name: 'Adventure',
      label: '催化剂',
      note: '推动主人公离开熟悉的环境',
      value: ''
    },
    {
      name: 'Refusal',
      label: '否认',
      note: '主人公拒绝冒险召唤',
      value: ''
    },
    {
      name: 'Mentor',
      label: '遇到导师',
      note: '对主人公转型的重要人物',
      value: ''
    },
    {
      name: 'Threshold',
      label: '接受与行动',
      note: '推动主人公接受冒险召唤的事件',
      value: ''
    }
  ],
  [
    {
      name: 'TestsAlliesEnemies',
      label: '历经磨难，敌友共存',
      note: '充满挑战的考验将帮助主人公区分敌友',
      value: ''
    },
    {
      name: 'Approach',
      label: '如临深渊',
      note: '主人公来到第二道门槛，跨过去后，会重新组队，规划后续行动',
      value: ''
    },
    {
      name: 'Ordeal',
      label: '纵身一跃',
      note: '主人公直面最深的恐惧，殊死搏斗',
      value: ''
    },
    {
      name: 'Reward',
      label: '回报',
      note: '主人公赢得奖励',
      value: ''
    }
  ],
  [
    {
      name: 'RoadBack',
      label: '通往终点之路',
      note: '主人公为终极大考验做准备',
      value: ''
    },
    {
      name: 'Resurrection',
      label: '真正的考验',
      note: '在最后的考验，主人公充分展现出对人生教训的理解',
      value: ''
    },
    {
      name: 'ReturnOrdinary',
      label: '重归新的日常状态',
      note: '历经蜕变的主人公带着奖励回家了',
      value: ''
    }

  ],
];

function getIndex(data: any) {
  if(data['start']) {
    return 1;
  }
  if(data['middle']) {
    return 2;
  }
  if(data['end']) {
    return 3;
  }
  return 0;
}

export default function useArc(folderPath: string, dataSource: any) {
  const [list, setList] = useState(initData);
  const [plotPoint, setPlotPoint] = useState(initDataPlotPoint);
  const [journey, setJourney] = useState(initDataJourney);

  // function doUpdateArc(data: any) {
  //   const act_path = `${folderPath}/act.json`;
  //   updateJson(act_path, data);
  // }

  function doSavePlotPoint(_: string, data: any){
    const plotPointList: any = []
    const acts = list.map((item: any, i: number) => {
      const index = getIndex(data) - 1;
      if(index === i) {
        plotPointList.push(plotPoint[index].map((point: any) => ({
          ...point,
          value: data[point.name] || point.value
        })))
      } else {
        plotPointList.push(plotPoint[i])
      }
      return {
        ...item,
        text: data[item.name] ? data[item.name] : item.text,
        point: index === i ? data : item.point
      }
    });
    setList(acts);
    // console.log('plotPointList', plotPointList)
    setPlotPoint(plotPointList);
    // onChange(acts);
  }

  function doSaveJourney(_: string, data: any){
    const acts = list.map((item: any, i: number) => {
      const index = getIndex(data) - 1;
      return {
        ...item,
        text: data[item.name] ? data[item.name] : item.text,
        journey: index === i ? data : item.journey
      }
    });
    setList(acts);
    // onChange?.(acts);
    console.log(folderPath)
  }

  function doSaveStage(_: string, data: any){
    const acts = list.map((item: any) => {
      if(data[item.name]){
        return {
          ...item,
          text: data[item.name] ? data[item.name] : item.text,
          stage: JSON.parse(data.list)
        }
      } else {
        return item
      }
      
    });
    setList(acts);
    // onChange(acts);
  }

  useEffect(() => {
    if(dataSource && dataSource.length){
      setList(dataSource);
      const points: any = [];
      const journeys: any = [];
      dataSource.map((item: any, i: number) => {
        if(item.point){
          const pointKeys = R.pipe(
            R.omit(['start', 'middle', 'end']),
            R.keys,
          )(item.point);
          const point = pointKeys.map((key: any, j: number) => {
            return {
              name: key,
              label: initDataPlotPoint[i]?.[j]?.label,
              note: initDataPlotPoint[i]?.[j]?.note,
              value: item.point[key]
            }
          });
          points.push(point);
        }
        if(item.journey){
          const journeyKeys = R.pipe(
            R.omit(['start', 'middle', 'end']),
            R.keys,
          )(item.journey);
          const journey = journeyKeys.map((key: any, j: number) => {
            return {
              name: key,
              label: initDataJourney[i]?.[j]?.label,
              note: initDataJourney[i]?.[j]?.note,
              value: item.journey[key]
            }
          });
          journeys.push(journey);
        }
      });
      points.length && setPlotPoint(points);
      journeys.length && setJourney(journeys);

    }
  }, [dataSource]);

  return {
    acts: list,
    plotPoint,
    journey,
    doSavePlotPoint,
    doSaveJourney,
    doSaveStage
  }
}