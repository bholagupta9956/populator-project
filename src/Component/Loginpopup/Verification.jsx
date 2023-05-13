// In this component we are going to desing the otp verification popup ;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Logo from "./LoginImages/Logo.svg";
import Lockicon from "./LoginImages/lock.svg";
import Cut from "./LoginImages/cut.svg";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Login.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../../utils/Loader";
import {
  cutAuthenication,
  showReward,
  userProfile,
  updateUserNumber,
  logedIn,
  updateUserImage,
  updateSignUpData,
  hideScreenPopup,
} from "../../actions";

const Verification = () => {
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.authenication.token);
  const [loading, setLoading] = useState(false);
  const [errors,setErrors] = useState("");

  const codeAndNum = useSelector((state) => state.authenication.codeAndNumber);

  const { t, i18n } = useTranslation();

  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const data = otp.join("");
  const baseUrl = `${api}signup-verify`;

  const verifyOtp = () => {
    setLoading(true);
    axios
      .post(
        baseUrl,
        { otp: `${data}` },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res , "this is the res whcih we are getting here")
        setLoading(false);
       
        if (res.data.success) {
          const userImage = res.data.data.fullimage;
          dispatch(updateUserImage(userImage));
          dispatch(showReward());
          dispatch(userProfile(Token));
          dispatch(logedIn());
        }
        else if (res.data.msg == "OTP not matched. Please try again!") 
        {
          setErrors(t("OTP does not matched !"))
        }
         else {
          setErrors(t("Something error with the server"))
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("there is some error with server");
      });
  };

  // here we are getting the signup details just for resending otp ;

  const signUpDetails = useSelector((state) => state.signUpData.userDetails);

  const resendOtp = () => {
    const baseUrl = `${api}signup`;
    setLoading(true);
    dispatch(updateSignUpData(signUpDetails));
    axios
      .post(baseUrl, signUpDetails, { headers: { Accept: "application/json" } })
      .then((res) => {
        console.log(res);
        if (res.data.msg === "User registered") {
          const access_token = res.data.data.token;
          setLoading(false);
          dispatch(hideScreenPopup());
          // dispatch(showVerification(access_token));
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        show={true}
        //  aria-labelledby="contained-modal-title-vcenter"
        aria-labelledby="modal-footer"
        centered
        style={{ marginTop: "auto" }}
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
            <h5>{t("SMS Verification")}</h5>
          </div>
          <div className="verification_row2">
            <span style = {{textAlign : "center"}}>
              {t("Enter the OTP sent to")} - {codeAndNum.email}
            </span>
          </div>
          <div className="verification_row3">
            {otp.map((data, index) => {
              return (
                <input
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>

          <div className="verification_row4">
            <span>{t("Don't receive the OTP?")}</span>
            <span onClick={resendOtp} style={{ cursor: "pointer" }}>
              {t("Resend OTP")}
            </span>
          </div>
          <div className="verification_btn" onClick={verifyOtp}>
            <button>{t("Verify & Login")} </button>
          </div>

          {/* here cut bottom is defined ; */}
          <div
            className="verification_cut_icon"
            onClick={() => dispatch(cutAuthenication())}
          >
            <img src={Cut} alt="cut.icon" />
          </div>
          
          {/* here we are adding loader  */}

          {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exportiing the verfication popup ;
export default Verification;
