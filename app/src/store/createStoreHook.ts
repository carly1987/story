import { useEffect, useReducer, Dispatch, Reducer } from 'react';

type Callback = () => unknown;

export interface Action<State, ActionType> {
  type: ActionType;
  payload: {
    data: State;
  };
}

const useForceUpdate = () => useReducer(state => {
  return !state;
}, false)[1];

const createStoreHook = <State, ActionType>(
  reducer: Reducer<State, Action<State, ActionType>>,
  initialState: State,
): (() => [State, Dispatch<Action<State, ActionType>>]) => {
  const subscribers: Callback[] = [];
  let state: State = initialState;
  const dispatch: Dispatch<Action<State, ActionType>> = (action: Action<State, ActionType>) :Promise<State> => {
    state = reducer(state, action);
    subscribers.forEach((callback: Callback) => callback());
    return new Promise<State>(resolve => {
      resolve({...state});
    });
  };
  const useSharedState = (): [State, Dispatch<Action<State, ActionType>>] => {
    const forceUpdate = useForceUpdate();
    useEffect(() => {
      const callback: Callback = () => forceUpdate();
      subscribers.push(callback);
      callback();
      const cleanup = () => {
        const index = subscribers.indexOf(callback);
        subscribers.splice(index, 1);
      };
      return cleanup;
    }, []);
    return [{...state}, dispatch];
  };
  return useSharedState;
};

export default createStoreHook;
