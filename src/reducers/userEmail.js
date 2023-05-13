// This is the email which will be stored while the user forget the password ;

const initialState = {
    email : ""
}

const userEmail = (state = initialState , action) => {
    if(action.type === "UPDATE_USER_EMAIL"){
        return {
            ...state , email : action.payload
        }
    }else if(action.type === "CLEAR_USER_EMAIL"){
        return {
            ...state ,email : ""
        }
    }
    else {
        return state
    }
}


export default userEmail ;