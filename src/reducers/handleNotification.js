// we are writing the code which we are writing ;


const initialState = {
    show : false ,
    data  : ""
}

const handleNotification = (state = initialState , action) =>{
    if(action.type === "SHOW_NOTIFICATION"){
        return{
            ...state , show : true , data : action.payload
        }
    }
    else if(action.type === "HIDE_NOTIFICATION"){
        return {
            ...state , show : false , data : action.payload
        }
    }
    else {
        return state 
    }
}

export default handleNotification;