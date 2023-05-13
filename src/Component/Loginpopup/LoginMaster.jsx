// This is the login master file while all the component such  related to login and signup ;

import React, { useEffect, useState } from "react" ;
import "./Login.css";
import LoginPopup from "./LoginPopup"
import ChangePassword  from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import Verification from "./Verification";
import EarnedPoints from "./EarnedPoints";
import LoginByOtp from "./LoginByOtp";
import LoginOtpVerification from "./LoginOtpVerification";
import { useSelector } from "react-redux";

const LoginMaster = () =>{

    const data = useSelector((state) =>state.authenication.show)

    if(data === "openLoginPopup"){
        return <LoginPopup />
    }
    else if(data === "openForgotPassword"){
        return <ForgotPassword/>
    }
    else if(data === "openChangePassword"){
        return <ChangePassword/>
    }
    else if(data === "openVerification"){
        return <Verification/>
    }
    else if(data === "openLoginByOtp"){
        return <LoginByOtp/>
    }
    else if(data === "rewardScreen"){
        return <EarnedPoints/>
    }
    else if(data === "loginByOtpVerificaton"){
        return <LoginOtpVerification />
    }
    else if(data === "cutAuthenication"){
        return null
    }
   
      
    return(<>
    </>)
    
}

// exporting the login master ;
export default LoginMaster ;