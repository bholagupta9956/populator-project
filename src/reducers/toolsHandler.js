// here we are writing the function which will handle the tools screen ;

const initialState = {
    data : "Catchment"
}

const toolsHanlder = (state = initialState , action) =>{
    if(action.type === "SHOW_CATCHMENT"){
        return {
            ...state , data : "Catchment"
        }
    }
    else if(action.type === "SHOW_OTHERS"){
        return {
            ...state , data : "Others"
        }
    }
    else {
        return state
    }
}   

export default toolsHanlder ;