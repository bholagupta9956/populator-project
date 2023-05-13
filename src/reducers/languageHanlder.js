// This is the language handler ; which will handle the language ;

const  initialState = {
    language : "English"
}

const languageHanlder = (state = initialState , action ) =>{
    if(action.type === "CHANGE_LANGUAGE") {
        return {
            ...state , language : action.payload
        }
    }
    else if(action.type === "DEFAULT_LANGUAGE"){
        return {
            ...state , language : "English"
        }
    }
    else {
        return state
    }
} 

export default languageHanlder ;