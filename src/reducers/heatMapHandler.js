// here we are writing the function which will handle the cluster on the map ;

const initialState = {
    show : false ,
    heatmap_layers : [] ,
    shapeDetails : [] ,
    value : 0
}

const heatMapHandler = (state = initialState , action) =>{
    if(action.type === "SHOW_HEATMAP"){
        return {
            ...state , show : true 
        }
    }
    else if(action.type === "HIDE_HEATMAP"){
        return {
            ...state , show : false 
        }
    }
    else if(action.type === "UPDATE_HEATMAP_SHAPE_DETAILS"){
        return {
            ...state , 
            shapeDetails : [...state.shapeDetails , action.payload]
        }
    }
    else if(action.type === "UPDATE_HEATMAP_SHAPE_DETAILS_ARRAY"){
        return {
            ...state , shapeDetails : action.payload 
        }
    }
    else if(action.type === "CLEAR_HEATMAP_SHAPE_DETAILS") {
        return {
            ...state , shapeDetails : []
        }
    }
    else if(action.type === "ADD_HEATMAP_LAYERS"){
        return {
            ...state , heatmap_layers : action.payload
        }
    }
    else if(action.type === "UPDATE_HEATMAP_VALUE"){
        return {
            ...state , value : action.payload
        }
    }
    else {
        return state 
    }
}

export default heatMapHandler ;