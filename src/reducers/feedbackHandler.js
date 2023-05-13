// here we are handling the feedback screen ;

const initialState = {
    show : false
}

const feedbackHandler = (state = initialState , action ) =>{
    if(action.type === "SHOW_FEEDBACK") {
        return {
            ...state , show : true
        }
    }
    else if(action.type === "HIDE_FEEDBACK"){
        return {
            ...state , show : false 
        }
    }
    else {
        return state 
    }
}

export default feedbackHandler ;