// // @flow
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import history from './history';
// import { routerMiddleware } from 'connected-react-router';
// import createRootReducer from '../reducers';
// import type { counterStateType } from '../reducers/types';
//
// const rootReducer = createRootReducer(history);
// const router = routerMiddleware(history);
// const enhancer = applyMiddleware(thunk, router);
//
// function configureStore(initialState?: counterStateType) {
//   return createStore(rootReducer, initialState, enhancer);
// }
//
// export default { configureStore, history };
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import createRootReducer from '../reducers';

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export let history = null;

export function createStoreOwn(url: string = '/') {
  // Create a history depending on the environment
  history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const enhancers = [];

  const middleware = [thunk, routerMiddleware(history)];

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Do we have preloaded state available? Great, save it.
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    createRootReducer(history),
    initialState,
    composedEnhancers
  );

  return {
    store,
    history
  };
};
