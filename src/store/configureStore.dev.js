// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import history from './history';
// import { routerMiddleware, routerActions } from 'connected-react-router';
// import { createLogger } from 'redux-logger';
// import createRootReducer from '../reducers';
// import type { counterStateType } from '../reducers/types';
//
// const rootReducer = createRootReducer(history);
//
// const configureStore = (initialState?: counterStateType) => {
//   // Redux Configuration
//   const middleware = [];
//   const enhancers = [];
//
//   // Thunk Middleware
//   middleware.push(thunk);
//
//   // Logging Middleware
//   const logger = createLogger({
//     level: 'info',
//     collapsed: true
//   });
//
//   // Skip redux logs in console during the tests
//   if (process.env.NODE_ENV !== 'test') {
//     middleware.push(logger);
//   }
//
//   // Router Middleware
//   const router = routerMiddleware(history);
//   middleware.push(router);
//
//   // Redux DevTools Configuration
//   const actionCreators = {
//     ...routerActions
//   };
//   // If Redux DevTools Extension is installed use it, otherwise use Redux compose
//   /* eslint-disable no-underscore-dangle */
//   const composeEnhancers = process.env.BROWSER === 'true' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         // Options: http://extension.remotedev.io/docs/API/Arguments.html
//         actionCreators
//       })
//     : compose;
//   /* eslint-enable no-underscore-dangle */
//
//   // Apply Middleware & Compose Enhancers
//   enhancers.push(applyMiddleware(...middleware));
//   const enhancer = composeEnhancers(...enhancers);
//
//   // Create Store
//   const store = createStore(rootReducer, initialState, enhancer);
//   console.log(store);
//   if (module.hot) {
//     module.hot.accept(
//       '../reducers',
//       () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
//     );
//   }
//
//   return store;
// };
//
// export default { configureStore, history };

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const history = isServer
    ? createMemoryHistory({
        initialEntries: ['/']
      })
    : createBrowserHistory();

const rootReducer = createRootReducer(history);

export function createStoreOwn(url: string = '/') {
  // Create a history depending on the environment

  const enhancers = [];

  // Dev tools are helpful
  if (process.env.NODE_ENV === 'development' && !isServer) {
    const {devToolsExtension} = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV === 'development' && !isServer) {
    // Logging Middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
      middleware.push(logger);
    }
  }

  const composedEnhancers = composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  );

  // Do we have preloaded state available? Great, save it.
  /* eslint-disable no-underscore-dangle */
  const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

  // Delete it once we have it stored in a variable
  if (!isServer) {
    /* eslint-disable no-underscore-dangle */
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
	// composeWithDevTools
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      console.log("I should be replaced");
      module.hot.accept(
        '../reducers',
        () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
      );
    }
  }

  return {
    store,
    history
  };
};
