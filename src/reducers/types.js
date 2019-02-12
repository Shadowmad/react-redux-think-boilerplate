import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type Action = {
  +type: string,
  +action: {}
};

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
