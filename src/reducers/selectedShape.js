// In this file we are going to create a function which will store the selected shape details ;
const initialState = {
    data : [] ,
    show : false
}

const selectedShape = (state = initialState , action) =>{
    if(action.type === "UPDATE_SELECTED_SHAPE_DATA"){
        return {
            ...state , data : action.payload , show : true
        }
    }
    else if(action.type === "CLEAR_SELECTED_SHAPE_DATA"){
        return {
            ...state , data : [] , show : false
        }
    }
    else {
        return state 
    }
}

// exporting the component ;
export default selectedShape ;