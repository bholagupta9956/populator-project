// here we are going to add the all the created shapes name  from the edittoolbar ;

const initailState = {
    name : []
}

const shapesName = (state = initailState , action) =>{
    if(action.type === "UPDATE_SHAPES_NAME"){
        return  {
            ...state , name : action.payload
        }
    }
    else if(action.type === "CLEAR_SHAPES_NAME"){
        return {
            ... state , name : []
        }
    }
    else {
        return state
    }
}

export default shapesName ;