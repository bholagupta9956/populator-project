// In this file we will keep the record of map location ;

const initialState = {
    coordinates : [21.48123417641119, 39.226418773645065],
    zoom : 9 ,
}

const mapLocation = (state = initialState , action) =>{
    if(action.type === "UPDATE_MAP_LOCATION"){
        return {
            ...state , coordinates : action.payload.coordinates , zoom : action.payload.zoom
        }
    }
    else if(action.type === "SAUDI_LOCATION"){
        return {
            ...state , coordinates : [21.48123417641119, 39.226418773645065] , zoom : 9
        }
    }
    else {
        return state;
    }
}

export default mapLocation ;