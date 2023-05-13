// here we are going to design the changePassword screen which will be used to change password;
import React, { useState, useEffect } from "react";
import Cut from "./ChangePasswordImages/cut.svg";
import Logo from "./ChangePasswordImages/Logo.svg";
import GreyLock from "./ChangePasswordImages/greylock.svg";
import Eye from "./ChangePasswordImages/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import Lock from "./ChangePasswordImages/changePassword.svg";
import "../ChangePassword/ChangePassword.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router";
import Loader from "../../utils/Loader";
import axios from "axios";
import Eyeoff from "./ChangePasswordImages/eyeoff.svg";
import {
  showNotification,
  updateUserInfo,
  userProfile,
  logedIn,
  cutAuthenication,
  updateUserImage,
  showChangePassword,
} from "../../actions";

const ChangePassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const api = useSelector((state) => state.apiStore.url);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {t , i18n} = useTranslation();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [confVisiblePassword, setConfVisiblePassword] = useState(false);

  //here we are getting the token which will be used for the change password ;
  const Location = useLocation();

  const token = new URLSearchParams(Location.search).get("token");
  
  const userEmail = useSelector((state) => state.userEmail.email);

  
  let history = useHistory();

  const submitPassword = () => {
    if (password.length < 5) {
      setErrors(t("Password must be greater then 5 character"));
    } else if (password !== confirmPassword) {
      setErrors(t("Password doesn't match !"));
    } else {
      setErrors("");
      const urlLink = `${api}password/reset`;
      setLoading(true);
      const data = {
        password: password,
        password_confirmation: confirmPassword,
        token: token,
        email: userEmail,
      };

      axios
        .post(urlLink, data, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          console.log("this is the response which we are getting", res);
          if (res.data.sucess) {
            setLoading(false);

            dispatch(
              showNotification(t("Password has been changed successfully"))
            );
            history.push("/");

            // here we are writing the code by which the user will be directly logedIn with his email and new password ;
            const loginData = {
              email: userEmail,
              password: password,
            };

            const loginUrl = `${api}login`;
            axios.post(loginUrl, loginData).then((res) => {
              if (res.data.access_token) {
                const userImage = res.data.user.fullimage;
                dispatch(updateUserImage(userImage));
                const token = res.data.access_token;
                const loginData = res.data.user;
                dispatch(updateUserInfo(loginData));
                dispatch(userProfile(token));
                setLoading(false);
                dispatch(logedIn());
                dispatch(cutAuthenication());
              }
            });
          } else if (
            res.data.error === "Your link has been expired try again"
          ) {
            setLoading(false);
            dispatch(
              showNotification(t("Your link has been expired , Please try again "))
            );
            dispatch(cutAuthenication());
            props.history.push("/");
          } else {
            alert("Something wrong with the server");
            dispatch(cutAuthenication());
            props.history.push("/");
          }
          setLoading(false);
        })
        .catch((err) => {});
    }
  };

  const showPassword = () =>{setVisiblePassword(true)}
  const hidePassword = () =>{setVisiblePassword(false)}
  const showConfirmPassword = () =>{setConfVisiblePassword(true)}
  const hideConfirmPassword = () =>{setConfVisiblePassword(false)}


  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="changePassword_container">
          <div className="changePassword_logo">
            <img src={Logo} alt="logo icon" />
          </div>{" "}
          <div className="changePassword_mainImg">
            <img src={Lock} alt=" main img" />
            <span>{t("Change Password")} </span>
          </div>
          <div className="changePassword_new1">
            <div className="changePassword_new_col1">
              <img src={GreyLock} alt="greylock icon" />
              <input
                type={visiblePassword ? "text" : "password"}
                placeholder={t("New Password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {visiblePassword ? (
              <img
                src={Eyeoff}
                alt="eye icon"
                className="changePassword_eyeIcon1"
                onClick={hidePassword}
                style={{cursor : "pointer" , width : "20px"}}
              />
            ) : (
              <img
                src={Eye}
                alt=""
                alt="eye icon"
                className="changePassword_eyeIcon1"
                onClick={showPassword}
                style={{cursor : "pointer" , }}
              />
            )}
          </div>

          <div className="changePassword_new2">
            <div className="changePassword_new_col2">
              <img src={GreyLock} alt="greylock icon" />
              <input
                type={confVisiblePassword ? "true" : "password"}
                placeholder={t("Confirm New Password")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            {confVisiblePassword ? (
              <img
                src={Eyeoff}
                alt="eye icon"
                className="changePassword_eyeIcon1"
                onClick={hideConfirmPassword}
                style={{cursor : "pointer" , width : "20px"}}
              />
            ) : (
              <img
                src={Eye}
                alt=""
                alt="eye icon"
                className="changePassword_eyeIcon1"
                onClick={showConfirmPassword}
                style={{cursor : "pointer"}}
              />
            )}
          </div>
          {errors && (
            <div
              style={{
                textAlign: "center",
                margin: "auto",
                width: "70%",
                marginTop: "-10px",
                marginBottom: "-20px",
              }}
            >
              <span style={{ fontSize: "12px", color: "red" }}>{errors}</span>
            </div>
          )}
          {/* <NavLink exact to="/" style={{textDecoration : "none"}}> */}
          <button className="forgotPassword_link" onClick={submitPassword}>
            {t("Change Password")}
          </button>
          {/* </NavLink> */}
          <div
            className="forgotPassword_cut"
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

// exporting the component ;
export default ChangePassword;

//http://localhost:3000/~temppopulator?showPasswordScreen=true&token=wmutzCcQrOBsWUx0RGdWAFJK28yfulawCJ0Clox96c6DADElrt4pi2Cly5ZE

//  http://184.168.123.10/~temppopulator/changePassword&token=04GclooTY2Zk7X8reHVZ1LnowUwONmvRK1hQF2cwhBPFdsH9rWg3MST3VcCqtPoX5s

