import * as ActionTypes from '../ActionTypes';

export const increaseAction = () =>{
    return {
        type: ActionTypes.CounterIncrease,
    };
}

export const decreaseAction = () => {
    return {
        type: ActionTypes.CounterDecrease,
    };
}