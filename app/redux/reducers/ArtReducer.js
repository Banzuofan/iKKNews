import { createActions, handleActions } from 'redux-actions';
import { 
    StartFetchingArtCatalog, 
    FetchArtCatalogWithSuccess, 
    FetchArtCatalogWithError} from '../ActionTypes';
import * as NetworkStatus from '../../util/NetworkStatus';
import { API } from '../../constant/Constants';


export const { startFetchingArtCatalog, fetchArtCatalogWithSuccess, fetchArtCatalogWithError } = createActions({
    StartFetchingArtCatalog : (refreshing) => ({
        refreshing,
    }),
    FetchArtCatalogWithSuccess: (events, refreshing, curr, next) => ({
        events,
        refreshing,
        curr,
        next,
    }),
    FetchArtCatalogWithError : (error, refreshing) => ({
        error,
        refreshing,
    }),
});


export const fetchArtCatalog = (pageNo) => {
    return (dispatch) => {
        dispatch(startFetchingArtCatalog(true));
        const fullURL = API.fetch_catalog_api + `?size=20&start=${pageNo}`;
        console.warn('RequestURL: '+fullURL);
        return fetch(fullURL,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
        }).then((response) => {
            // console.warn(response);
            if (response.status !== 200) {
                throw new Error('Request failed with status ' + response.status);
            }
            response.json().then((jsonResult) => {
                // console.warn(jsonResult);
                if (jsonResult.state === 100) {
                    // 没有更多数据
                    if (jsonResult.events.length < 20 || jsonResult.events.length==0){
                        dispatch(fetchArtCatalogWithSuccess(jsonResult.events, false, jsonResult.start, jsonResult.start));
                    }
                    else{
                        dispatch(fetchArtCatalogWithSuccess(jsonResult.events, false, jsonResult.start, jsonResult.start+1));
                    }
                }
                else {
                    let error = new TypeError(jsonResult.desc != null ? jsonResult.desc : 'Request failed!');
                    dispatch(fetchArtCatalogWithError(error, false));
                }
            }).catch((error) => {
                dispatch(fetchArtCatalogWithError(error, false));
            });
        }).catch((error) => {
            dispatch(fetchArtCatalogWithError(error, false));
        });
    };
}

const handleEvents = (state, events, curr) => {
    if(curr==0){
        return events;
    }
    return [
        ...state.events,
        ...events,
    ];
}

const reducer = handleActions({

    StartFetchingArtCatalog: (state, { payload: { refreshing } }) => ({
        ...state,
        status: NetworkStatus.StatusLoading,
        refreshing: refreshing,
    }),
    FetchArtCatalogWithSuccess: (state, { payload: { refreshing, events, curr, next } }) => ({
        ...state,
        status: NetworkStatus.StatusSuccess,
        curr,
        next,
        refreshing,
        events: handleEvents(state, events, curr),
    }),
    FetchArtCatalogWithError: (state, { payload: { refreshing, error } }) => ({
        ...state,
        status: NetworkStatus.StatusFailed,
        error: error,
        refreshing: refreshing,
    }),
}, { status: NetworkStatus.StatusLoading});

export default reducer;


