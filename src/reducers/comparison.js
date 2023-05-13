// here we keep the details of the comparison screen ;
const initialState = {
    allShapesData : [] ,
}

const comparison = (state = initialState , action) =>{
    if(action.type === "UPDATE_COMPARISON_DETAILS"){
        return {
            ...state , allShapesData : action.payload
        }
    }
    else if(action.type === "CLEAR_COMPARISON_DETAILS"){
        return {
            ...state , allShapesData : []
        }
    }
   
    else {
        return state
    }
}

// exporting the component ;
export default comparison