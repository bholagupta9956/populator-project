// this is the p[oi notification handler it will be shown when the user has not selected any poi;

const initialState = {
    show : false 
}

const poiNotification = (state = initialState , action) => {
    if (action.type === "SHOW_POI_NOTIFICATION"){
        return {
            ...state , show : true
        }
    }
    else if(action.type === "HIDE_POI_NOTIFICATION"){
        return {
            ...state , show : false
        }
    }
    else {
        return state 
    }
}

export default poiNotification ;