import { createAction, createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = { counter: 100 };

export const { incrAction, decrAction, reset } = createActions({
    'INCR_ACTION': (amount = 1) => ({ amount }),
    'DECR_ACTION': (amount = 1) => ({ amount: -amount }),
    'RESET': () => {},
});

export const ra_counter_reducer = handleActions({
    [incrAction](state, { payload: { amount } }) {
        return { 
            counter: state.counter + amount 
        }
    },
    [decrAction](state, { payload: { amount } }) {
        return { 
            counter: state.counter + amount 
        }
    },
    [reset](state){
        return defaultState
    }
}, defaultState);


// const ra_counter_reducer = handleAction(combineActions(incraction, decraction), {
//     next: (state, { payload: { amount } }) => ({ ...state, counter: state.counter + amount }),
//     throw: state => ({ ...state, counter: 0 }),
// }, defaultState)



///createAction的使用方式
///OK
// export const ra_increase = createAction('INCR');
// export const ra_decrease = createAction('DECR');

// export const ra_counter_reducer = handleActions({
//     [ra_increase](state) {        
//         return { counter: state.counter + 1 };
//     }, [ra_decrease](state) {
//         return { counter: state.counter - 1 };
//     }
// }, { counter: 13 });