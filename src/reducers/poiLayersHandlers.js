// here we are adding the cluster to the project ;

const initialState = {
    show : false  ,
    value : 0 ,
}

const poiLayersHandlers = (state = initialState , action) =>{
    if(action.type === "SHOW_POI_LAYERS"){
        return {
            ...state , show : true 
        }
    }
    else if(action.type === "HIDE_POI_LAYERS"){
        return {
            ...state , show : false 
        }
    }
    else if(action.type === "UPDATE_POI_LAYERS_VALUE"){
        return {
            ...state , value : action.payload
        }
    }
    else {
        return state ;
    }
}

export default poiLayersHandlers ;