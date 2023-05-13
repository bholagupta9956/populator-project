const initialState = {
    show : false
}


const removeAllPoiFromMap = (state = initialState , action) =>{
    if(action.type === "REMOVE_ALL_POI_FROM_MAP"){
         
        return {
            ...state , show : !state.show
        }
    }
    else {
        return state;
    }
}

export default removeAllPoiFromMap ;