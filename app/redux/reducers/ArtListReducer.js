import { createActions, handleActions } from 'redux-actions';
import {
    StartFetchingArtList,
    FetchArtListWithSuccess,
    FetchArtListWithError
} from '../ActionTypes';
import * as NetworkStatus from '../../util/NetworkStatus';
import { API } from '../../constant/Constants';


export const { startFetchingArtList, fetchArtListWithSuccess, fetchArtListWithError } = createActions({
    StartFetchingArtList: (refreshing) => ({
        refreshing,
    }),
    FetchArtListWithSuccess: (event, recent_bids, data, refreshing) => ({
        event,
        recent_bids,
        data,
        refreshing,
    }),
    FetchArtListWithError: (error, refreshing) => ({
        error,
        refreshing,
    }),
});



/*
根据event_ID获取ArtList
*/
export const fetchArtList = (event_id) => {
    return (dispatch) => {
        dispatch(startFetchingArtList(true));
        const fullURL = API.fetch_artsList_api + `?size=100&id=${event_id}&page=1&mode=1&user_id=0`;
        console.log('RequestURL: ' + fullURL);
        return fetch(fullURL).then((response) => {
            // console.warn(response);
            if (response.status !== 200) {
                throw new Error('Request failed with status ' + response.status);
            }
            response.json().then((jsonResult) => {
                if (jsonResult.state === '100') {
                    dispatch(fetchArtListWithSuccess(jsonResult.event_row, jsonResult.recent_bid, jsonResult.data, false));
                }
                else {
                    let error = new TypeError(jsonResult.desc != null ? jsonResult.desc : 'Request failed!');
                    dispatch(fetchArtListWithError(error, false));
                }
            }).catch((error) => {
                dispatch(fetchArtListWithError(error, false));
            });
        }).catch((error) => {
            dispatch(fetchArtListWithError(error, false));
        });
    };
}


const reducer = handleActions({

    StartFetchingArtList: (state, { payload: { refreshing } }) => ({
        ...state,
        status: NetworkStatus.StatusLoading,
        refreshing: refreshing,
    }),
    FetchArtListWithSuccess: (state, { payload: { refreshing, event, recent_bids, data } }) => ({
        ...state,
        status: NetworkStatus.StatusSuccess,
        refreshing,
        event,
        recent_bids,
        data,
    }),
    FetchArtListWithError: (state, { payload: { refreshing, error } }) => ({
        ...state,
        status: NetworkStatus.StatusFailed,
        error: error,
        refreshing: refreshing,
    }),
}, { status: NetworkStatus.StatusLoading });

export default reducer;