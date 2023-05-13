// here we storing the signupData just for resending otp ;

const initialState = {
    userDetails : {}
}

const signUpData = (state = initialState , action) => {
    if(action.type === "UPDATE_SIGNUP_DATA"){
        return {
            ...state , userDetails : action.payload
        }
    }
    else if(action.type=== "CLEAR_SIGNUP_DATA"){
        return {
            ...state , userDetails : {}
        }
    }
    else {
        return state
    }
}

export default signUpData ;