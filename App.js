/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { Provider, connect } from 'react-redux';
import PropTypes from 'prop-types';
import thunkMiddleware from 'redux-thunk'

import AppNavigator from './app/RoutersConfig';
import appReducer from './app/redux/AppReducer';


// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");


// type Props = {};
class StackedApp extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav,
        addListener,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(StackedApp);


const store = createStore(
  appReducer,
  applyMiddleware(
    middleware, 
    thunkMiddleware),
);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}