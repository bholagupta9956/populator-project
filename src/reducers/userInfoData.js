// here we will keepp all the data related to the user after login ;

const initialState = {
    data : {} , 
    image : "" ,
    userBalance  : 500
}

const userInfoData = (state = initialState , action ) =>{

    if(action.type === "UPDATE_USER_INFO"){
        return {
            ...state , data : action.payload 
        }
    }
    else if(action.type === "CLEAR_USER_INFO"){
        return {
            ...state , data : {} , image : "" ,  
        }
    }
    else if(action.type === "UPDATE_USER_IMAGE"){
        return {
            ...state , image : action.payload
        }
    }
    else if(action.type === "UPDATE_USER_BALANCE"){
        return {
            ...state , userBalance : action.payload 
        }
    }
    else {
        return state 
    }
}

export default userInfoData ;