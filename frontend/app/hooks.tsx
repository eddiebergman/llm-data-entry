import { SetStateAction, useEffect, useReducer, useState } from "react";

export function useLocalStorageState<S>(
  key: string,
  initial: S,
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = useState<S>(initial);

  function setStateWithLocalStorage(newState: SetStateAction<S>): void {
    setState(newState);
    try {
      localStorage.setItem(key, JSON.stringify(newState));
    } catch (error) {
      console.error(`Error setting localStorage '${key}'\n${error}`);
    }
  }

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        setState(JSON.parse(storedData));
      } else {
        console.log(`Nothing in localStorage at '${key}'`);
      }
    } catch (error) {
      console.error(`Error getting from localStorage '${key}'\n${error}`);
    }
  }, [key]);

  return [state, setStateWithLocalStorage];
}

function useLocalStorageReducer<R extends React.Reducer<any, any>, S>(
  key: string,
  reducer: R,
  initial: S & React.ReducerState<R>,
): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
export function useLocalStorageReducer<S, A>(
  key: string,
  reducer: (state: S, action: A) => S,
  initial: S,
): [S, (action: A) => S] {
  const [state, dispatchState] = useReducer(reducer, initial);

  function reducerWhichSetsStorage(action: A) {
    dispatchState(action);
    try {
      localStorage.setItem(key, JSON.stringify(newState));
    } catch (error) {
      console.error(`Error setting localStorage '${key}'\n${error}`);
    }
  }

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        dispatchState(JSON.parse(storedData));
      } else {
        console.log(`Nothing in localStorage at '${key}'`);
      }
    } catch (error) {
      console.error(`Error getting from localStorage '${key}'\n${error}`);
    }
  }, [key]);

  return [state, reducerWhichSetsStorage];
}

export default useLocalStorageReducer;
