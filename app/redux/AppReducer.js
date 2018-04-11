import {
    combineReducers,
} from 'redux';

import AppNavigator from '../RoutersConfig';

import artCatalogReducer from './reducers/ArtReducer';
import artListReducer from './reducers/ArtListReducer';


const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};

const appReducer = combineReducers({
    nav: navReducer,
    art_catalog: artCatalogReducer,
    art_list: artListReducer,
});

export default appReducer;