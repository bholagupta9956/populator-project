// here the getScanresutl button will enable it to show the heatmap and the clusters ;

const initialState = {
    cluster : false,
    heatmap : false , 
    poiLayers : false ,
    refresh : 0  ,
    delete : 0 
}

const enableClusterHeatmap = (state = initialState , action) => {
    if(action.type === "ENABLE_HEATMAAP"){
        return {
            ...state , heatmap : true
        }
    }else if(action.type === "ENABLE_CLUSTER"){
        return {
            ...state , cluster : true
        }
    }
    else if(action.type === "DISABLE_CLUSTER"){
        return {
            ...state , cluster : false
        }
    }
    else if(action.type === "DISABLE_HEATMAP"){
        return {
            ...state , heatmap : false
        }
    }
    else if(action.type === "ENABLE_POI_LAYERS"){
        return {
            ...state , poiLayers : true
        }
    }
    else if(action.type === "DISABLE_POI_LAYERS"){
        return {
            ...state , poiLayers : false
        }
    }
    else if(action.type === "REFRESH_HEATMAP_CLUSTER"){
        return {
            ...state , refresh : action.payload
        }
    }
    else if(action.type === "DELETE_ALL_FROM_MAP"){
        return {
            ...state , delete : action.payload 
        }
    }
    else {
        return state 
    }
}

export default enableClusterHeatmap ;