import React from 'react';
import { ReactDOM } from 'react';
// import { createStore, applyMiddleware} from 'redux'
// import {Provider} from 'react-redux';
// import store from './Store';
import ApplicationNavigator from './Navigators/Application';
// import {store} from './Store';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    // <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ApplicationNavigator />
    </QueryClientProvider>
    // </Provider>
  );
}
