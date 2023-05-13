// here we are going to create a function which will be able handle the authenication part of the project ;

const initialstate = {
    show : null ,
    token : null,
    showUser : true ,
    userNumber : "" ,
    codeAndNumber : {} ,
}

const authenication = (state = initialstate , action) =>{
    if(action.type === "LOGIN_POPUP"){
        return  {
            ...state , show : "openLoginPopup"
        }
    }
    else if(action.type === "FORGOT_PASSWORD"){
        return {
            ...state , show : "openForgotPassword"
        }
    }
    else if(action.type === "CHANGE_PASSWORD"){
        return {
            ...state , show : "openChangePassword"
        }
    }
    else if(action.type === "VERIFICATION"){
        return {
            ...state , show : "openVerification" ,
                      token : action.payload
        }
    }
    else if(action.type === "LOGIN_BY_OTP"){
         return {
             ...state , show : "openLoginByOtp"
         }
    }
    else if(action.type === "CUT_AUTHENICATION"){
        return {
            ...state , show : "cutAuthenication"
        }
    }
    else if(action.type === "REWARD_SCREEN"){
        return {
            ...state , show : "rewardScreen"
        }
    }
    else if(action.type === "USER_LOGIN"){
        return {
            ...state , showUser: true
        }
    }
    else if(action.type === "USER_PROFILE"){
        return{
            ...state , showUser : false , token : action.payload 
        }
    }
    else if(action.type === "REMOVE_TOKEN"){
        return {
            ...state , token : null , codeAndNumber : {}
        }
    }
    else if(action.type === "LOGIN_BY_OTP_VERIFICATION"){
        return {
            ...state , show : 'loginByOtpVerificaton' , userNumber : action.payload
        }
    }
    else if(action.type === "UPDATE_USER_NUMBER"){
        return {
            ...state , codeAndNumber : action.payload 
        }
    }
    else return state 
}

export default authenication ;