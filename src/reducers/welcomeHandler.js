// This is the welcome handler ;

const initialState = {
    show : true 
}

const welcomeHandler = (state = initialState , action) =>{
    if(action.type === "CLOSE_WELCOME"){
        return {
            ...state , show : false
        }
    }
    else if(action.type === "OPEN_WELCOME"){
        return {
            ...state , show : true
        }
    }
    else {
        return state 
    }
}

export default welcomeHandler ;