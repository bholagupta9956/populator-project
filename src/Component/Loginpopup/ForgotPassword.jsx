// This is forgot password page ;

import React, { useState } from "react";
import "./Login.css";
import { Modal } from "react-bootstrap";
import Cut from "./LoginImages/cut.svg";
import Logo from "./LoginImages/Logo.svg";
import Forgot from "./LoginImages/forgot.svg";
import { NavLink, Redirect } from "react-router-dom";
import { cutAuthenication, showChangePassword, showNotification, updateUserEmail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import { useTranslation } from "react-i18next";
import axios from "axios"

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const {t , i18n} = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const [loading , setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: t("E-mail is required") });
    } else if (/^[A-Z0-9._%+-] +@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      console.log("invalid email id");
      setErrors({ email: null  });
    }
    else {
        setErrors({email : null}) 
        dispatch(updateUserEmail(email))
        const data = {email : email}
        const urlLink = `${api}password/forgot-password`;
        setLoading(true);
        axios.post( urlLink ,data)
        .then((res) =>{
           
            if(res.data.success){
              setLoading(false)
                
                dispatch(showNotification(t("Reset password link has been sent to your e-mail account")));
                dispatch(cutAuthenication());
                
            } 
        })
    }
  };
  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="forgotPassword_container">
          <div className="forgotPassword_logo">
            <img src={Logo} alt="logo icon" />
          </div>
          <div className="forgotPassword_mainImg">
            <img src={Forgot} alt=" main img" />
            <span>{t("Forgot Password ?")}</span>
          </div>
          {/* here we are giving the errors  */}
          {errors.email && (
            <p
              style={{
                color: "red",
                width: "100%",
                textAlign: "center",
                marginTop: "-10px",
                padding: "0px",
              }}
            >
              {errors.email}
            </p>
          )}

          <form action="" onSubmit={handleSubmit}>
            <div className="forgotPassword_email">
              <input
                type="email"
                placeholder={t("Enter e-mail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <h6 className="forgotPassword_suggestion">
             {t("Reset password link will be sent to your Email address")}
            </h6>

            <NavLink
              exact
              to="/changePassword"
              style={{ textDecoration: "none" }}
            >
              
            </NavLink>
            <button className="forgotPassword_link" type="submit">
              {t("Send Link")}
            </button>
          </form>

          <div
            className="forgotPassword_cut"
            onClick={() => dispatch(cutAuthenication())}
          >
            <img src={Cut} alt="cut icon" />
          </div>

          {/* here we are adding a loader for better user experience */}

          {loading && <Loader/>}
        </div>
      </Modal>
    </>
  );
};

// exporting the file ;
export default ForgotPassword;
