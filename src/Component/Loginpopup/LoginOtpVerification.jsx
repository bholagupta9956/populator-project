// In this component we are going to desing the otp verification popup ;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Logo from "./LoginImages/Logo.svg";
import Lockicon from "./LoginImages/lock.svg";
import Cut from "./LoginImages/cut.svg";
import axios from "axios"
import "./Login.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Loader from "../../utils/Loader"
import { cutAuthenication ,updateUserInfo , showReward , userProfile , logedIn, showNotification} from "../../actions";


const LoginOtpVerification = () => {
  
  const {t , i18n} = useTranslation();

  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch()
  const Token = useSelector((state) => state.authenication.token)
  const [loading , setLoading] = useState(false);
  const userNumber = useSelector((state) => state.authenication.userNumber)
  const [errors , setErrors] = useState("")

  const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {

        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

   
    const data = otp.join('')
    const baseUrl = `${api}login-otp-verify`;
    const orgData = {
      mobile_number : userNumber ,
      login_otp : data
    }

    const verifyOtp =  ()  =>{
      if(data.length !== 4){
        setErrors(t("Please Enter Valid OTP"))
      }
      else {
      setLoading(true);
    axios({
      method: 'post',
      url: baseUrl ,
      data: orgData ,
      headers : {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
      .then((res) =>{
          console.log(res , "this is the response which we are getting from the loginotpverification")
          if(res.data.success){
            setLoading(false)
            const token = res.data.data.token;
            const loginData = res.data.data;
            dispatch(updateUserInfo(loginData));
            dispatch(userProfile(token));
            dispatch(logedIn());
            dispatch(cutAuthenication());

          }
          else {
            setLoading(false)
            alert("Something went wrong ")
          }
        }) 
        .catch((err) =>{
          setLoading(false)
          alert("something went wrong with the server")
        })
         }
        }
  
        //  here we are writing the function  which will be used to resend otp ;

        const resendOtp = () =>{
          setLoading(true)
          const url = `${api}login-with-otp`
          const number = {mobile_number : userNumber}
          axios.post(url , number )
          .then((res) =>{
            const response = res.data.success ;
            if(response){
              setLoading(false);
              dispatch(showNotification(t("OTP resended successfully !")))
            }
            else {
              setLoading(false)
              alert(t("Something went wrong with the server"))
            }
          })
          .catch((err) => {
            setLoading(false)
            alert(t("something went wrong with the server"))
          })
          
        }
    
  return (
    <>
      <Modal
        show={true}
      //  aria-labelledby="contained-modal-title-vcenter"
        aria-labelledby="modal-footer"
        centered
        style = {{marginTop : "auto"}}
      >
        <div className="verification">
          <div className="verification_container1">
            <img src={Logo} alt="" />
          </div>
          <div className="verification_lock">
            <img src={Lockicon} alt="lock icon" />
          </div>
          {errors && <p style={{color : "red" , fontSize : "14px" , textAlign : "center"}}>{errors}</p> }
          <div className="verification_row1">
            <h5>{t('SMS Verification')}</h5>
          </div>
          <div className="verification_row2">
            <span>{t('Enter the OTP sent to')} {userNumber}</span>
          </div>
          <div className="verification_row3" >
            {
              otp.map((data, index) =>{
               
                return(
                  <input
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
              />
                )
              })
            }
             </div>
           
         

          <div className="verification_row4">
            <span>{t("Don't receive the OTP?")}</span>
            <span style={{cursor : "pointer"}} onClick = {resendOtp}>{t("Resend OTP")}</span>
          </div>
          <div className="verification_btn" onClick={verifyOtp}>
            <button>{t("Verify & Login")} </button>
          </div>

          {/* here cut bottom is defined ; */}
          <div className="verification_cut_icon" onClick={() => dispatch(cutAuthenication())}>
            <img src={Cut} alt="cut.icon" />
          </div>
          {/* here we are adding loader  */}
         {loading && <Loader /> }
        </div>
      </Modal>
    </>
  );
};

// exportiing the verfication popup ;
export default LoginOtpVerification;
