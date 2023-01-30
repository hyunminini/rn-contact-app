// import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// import themeReducer from './themeSlice';

// export const store = configureStore({
//     reducer: {
//       theme: themeReducer,
//     },
//   });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;


// import thunk from 'redux-thunk';
// import {
//     applyMiddleware,
//     combineReducers,
//     compose,
//     legacy_createStore,
// } from 'redux';
// import { logger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import { UserInfo } from './modules';

// const middlewares = [thunk];

// const reducers = combineReducers({
//     UserInfo,
// });

// let store;

// if (process.env.NODE_ENV === 'development') {
//     middlewares.push(logger);

//     store = legacy_createStore(
//         reducers,
//         composeWithDevTools(applyMiddleware(...middlewares)),
//     );
// } else {
//     store = legacy_createStore(
//         reducers,
//         compose(applyMiddleware(...middlewares)),
//     );
// }

// export default store;


