// here we  are goin to design a popup which will be used to login directly by phoneNumber and oTp;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Logo from "./LoginImages/Logo.svg";
import Cut from "./LoginImages/cut.svg";
import "./Login.css";
import Mobile from "./LoginImages/phoneicon.svg";
import {
  showLoginPopup,
  cutAuthenication,
  showVerification,
  showLoginByOtpVerification,
  saudiLocation,
  showCountryCode,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Saudicurrency from "./LoginImages/saudiarabia.svg";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

const LoginByOtp = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const [number, setNumber] = useState({
    mobile_number: "",
  });
  const [loading, setLoading] = useState(false);
  const api = useSelector((state) => state.apiStore.url);

  const urlLink = `${api}login-with-otp`;

  const submitNumber = () => {
    setLoading(true);
    if (number.mobile_number.length !== country_code.digits) {
      setLoading(false);
      setErrors(`Phone number must be ${country_code.digits} digits`);
    } else if (number.mobile_number.length === country_code.digits) {
      setErrors("");
      axios
        .post(urlLink, number)
        .then((res) => {
          const response = res.data.success;
          console.log(res)
          if (response) {
            setLoading(false);
            const userNumber = number.mobile_number;
            dispatch(showLoginByOtpVerification(userNumber));
          }
          else if(res.data.msg === "Please Enter A Valid Number !"){
            setErrors(t("Please enter a valid number"))
            setLoading(false)
          }
           else {
            setLoading(false);
            alert("Something went wrong ");
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("something went wrong with the server");
        });
    }
  };
  
  const country_code = useSelector((state) => state.countryCodeHandler.data)

  const selectCountryCode = () =>{
    dispatch(showCountryCode())
  }

  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="loginbyotp_container">
          <div className="loginbyotp_container_logo">
            <img src={Logo} alt="logo icon" />
          </div>
          <h5 className="loginbyotp_heading">{t("Login Via OTP")}</h5>
          <div className="loginbyotp_number">
            <h5 className="mobile">{t("Mobile No")}</h5>
            <div className="loginbyotp_number_input">
              {/* <img src={Saudicurrency} alt="mobile icon" /> */}

              <div className="loginbyotp_country" onClick = {selectCountryCode}>
                <img
                  src={country_code.image}
                  alt="currency icons"
                  style = {{width :"25px"}}
                />
                <span>{country_code.phone_code}</span>
              </div>

              <input
                type="number"
                placeholder={t("Enter Mobile Number")}
                value={number.mobile_number}
                onChange={(e) => setNumber({ mobile_number: e.target.value })}
              />
            </div>

            {errors && <span style={{ color: "red" }}>{errors}</span>}
          </div>

          <button className="loginbyotp_btn" onClick={submitNumber}>
            {t("Sent OTP")}
          </button>
          <div className="loginbyotp_sign">
            <h4>{t("Don't have an account ?")}</h4>
            <h4
              style={{ color: "var(--blue)" }}
              onClick={() => dispatch(showLoginPopup())}
            >
              {t("Go Back")}
            </h4>
          </div>

          <div
            className="loginbyotp_submit"
            onClick={() => dispatch(showLoginPopup())}
            style={{ cursor: "pointer" }}
          >
            <h5>{t("Login By UserName")}</h5>
          </div>

          {/* here we are addign the cut option which will  cut the popup */}

          <div
            className="loginbyotp_cut"
            onClick={() => dispatch(cutAuthenication())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
          {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exporting the file ;
export default LoginByOtp;
