
// here we will call a function which will update the only shape data ;
const initialstate = {
    rawData : {},
    resultOfShapes : {} ,
    markerAddress : null
}
const updateShapeData = (state = initialstate , action) =>{
    
    if(action.type === "UPDATE_SHAPE_DATA"){
        return {
            ...state ,
            rawData : {
                shape : action.payload.shape  ,
                coords : action.payload.coords ,
                center : action.payload.center
            }
        }
    }
    else if(action.type === "UPDATE_MARKER_ADDRESS"){
        return {
            ...state ,
            markerAddress : action.payload
        }
    }
    else if(action.type === "CLEAR_SHAPE_DATA"){
        return {
            ...state , rawData : {} , resultOfShapes : {} , markerAddress : null
        }
    }
    else return state ;
}

export default updateShapeData ;