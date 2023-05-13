const initialState = {
    togglePanel : false ,
    text : 0
}

const toggleAllPanel = (state = initialState , action , ) =>{

    if(action.type === "SHOW_CONTROL"){
        return {
            ...state , togglePanel : true  , text : action.payload
        }
    }
    else if(action.type === "HIDE_CONTROL"){
        return {
            ...state , togglePanel : false , text : action.payload
        }
    }
    else {
        return state ;
    }
}

export default toggleAllPanel ;