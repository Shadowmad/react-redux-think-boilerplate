// // @flow
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
}
// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
// import thunk from 'redux-thunk';
// import { createBrowserHistory, createMemoryHistory } from 'history';
// import createRootReducer from '../reducers';
// import { createLogger } from 'redux-logger';
//
// // A nice helper to tell us if we're on the server
// export const isServer = !(
//   typeof window !== 'undefined' &&
//   window.document &&
//   window.document.createElement
// );
//
// export let history = null;
//
// const rootReducer = createRootReducer(history);
//
// export function createStoreOwn(url: string = '/') {
//   // Create a history depending on the environment
//   history = isServer
//     ? createMemoryHistory({
//         initialEntries: [url]
//       })
//     : createBrowserHistory();
//
//   const enhancers = [];
//
//   // Dev tools are helpful
//   if (process.env.NODE_ENV === 'development' && !isServer) {
//     const devToolsExtension = window.devToolsExtension;
//
//     if (typeof devToolsExtension === 'function') {
//       enhancers.push(devToolsExtension());
//     }
//   }
//
//   const middleware = [thunk, routerMiddleware(history)];
//   if (process.env.NODE_ENV === 'development' && !isServer) {
//     // Logging Middleware
//     const logger = createLogger({
//       level: 'info',
//       collapsed: true
//     });
//
//     // Skip redux logs in console during the tests
//     if (process.env.NODE_ENV !== 'test') {
//       middleware.push(logger);
//     }
//   }
//   const composedEnhancers = compose(
//     applyMiddleware(...middleware),
//     ...enhancers
//   );
//
//   // Do we have preloaded state available? Great, save it.
//   const initialState = !isServer ? window.__PRELOADED_STATE__ : {};
//
//   // Delete it once we have it stored in a variable
//   if (!isServer) {
//     delete window.__PRELOADED_STATE__;
//   }
//
//   // Create the store
//   const store = createStore(
//     createRootReducer(history),
//     initialState,
//     composedEnhancers
//   );
//
//   if (process.env.NODE_ENV !== "production") {
//     if (module.hot) {
//       module.hot.accept(
//         '../reducers',
//         () => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
//       );
//     }
//   }
//
//   return {
//     store,
//     history
//   };
// };
