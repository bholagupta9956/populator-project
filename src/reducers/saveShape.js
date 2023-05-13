import { accordionActionsClasses } from "@mui/material"

// In this file we are going to create a function which will handle to save the shape with the name ;
const initialState = {
    data : {}
}

const saveShape = (state = initialState , action) =>{
    if(action.type === "UPDATE_SHAPE_DETAILS") {
        return {
            ...state , data : action.payload
        }
    }
    else if(action.type === "CLEAR_SHAPE_DETAILS"){
       return { ...state , data : {}}
    }
    else {
       return state
    }
}

export default saveShape;