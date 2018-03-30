import * as ActionTypes from '../ActionTypes';

export default function counterReducer(state = { count: 0 }, action) {
    const { count } = state;
    switch (action.type) {
        case ActionTypes.CounterIncrease:
            return { count: count+1 };
        case ActionTypes.CounterDecrease:
            return { count: count-1 };
        default:
            return state;
    }
}