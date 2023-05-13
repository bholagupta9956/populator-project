// This is  data which will shown on the right side of the result screen in graph and other all ;

const initialState = {
    result : {}
}

const resultScreenData = (state = initialState , action ) =>{
    
    if(action.type === 'UPDATE_RESULT_SCREEN_DATA'){
        return {
            ...state , result : action.payload
        }
    }
    else if(action.type === "CLEAR_RESULT_SCREEN_DATA"){
        return {
            ...state , result : {}
        }
    }
    else{
        return state 
    }
}

export default resultScreenData ;