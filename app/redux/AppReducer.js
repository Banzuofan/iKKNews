import {
    combineReducers,
} from 'redux';

import AppNavigator from '../RoutersConfig';

import counterReducer from './reducers/CounterReducer';
import {ra_counter_reducer} from './ReduxActions';
import artCatalogReducer from './reducers/ArtReducer';


const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
    counter: counterReducer,
    ra_counter: ra_counter_reducer,
    art_catalog:artCatalogReducer,
});

export default appReducer;