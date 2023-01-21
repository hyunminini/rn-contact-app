import React from 'react';
import { ReactDOM } from 'react';
import { createStore, applyMiddleware} from 'redux'
import ApplicationNavigator from './Navigators/Application';


export default function App() {
  return (
   
    <ApplicationNavigator />
  );
}
