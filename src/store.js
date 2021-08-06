
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from "./reducers";

const middleware = [thunkMiddleware];
var appliedMiddleware = applyMiddleware(...middleware);

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  const composeEnhancers = composeWithDevTools({ 
    trace: true, 
    traceLimit: 25 
  });
  appliedMiddleware = composeEnhancers(appliedMiddleware)

const reducer = rootReducer;

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
