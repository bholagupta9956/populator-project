// here we are going to design the changePassword screen which will be used to change password;
import React, { useState } from "react";
import "./ChangePassword.css";
import Cut from "./ChangePasswordImages/cut.svg";
import Logo from "./ChangePasswordImages/Logo.svg";
import GreyLock from "./ChangePasswordImages/greylock.svg";
import Eye from "./ChangePasswordImages/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import Lock from "./ChangePasswordImages/changePassword.svg";
import { NavLink } from "react-router-dom";
import { Redirect, useLocation } from "react-router";
import Loader from "../../utils/Loader";
import axios from "axios";
import { showNotification  , updateUserInfo , userProfile , logedIn , cutAuthenication , updateUserImage} from "../../actions";


const ChangePassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const api = useSelector((state) => state.apiStore.url);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //here we are getting the token which will be used for the change password ;
  const Location = useLocation();

  const token = new URLSearchParams(Location.search).get("token");

  const userEmail = useSelector((state) => state.userEmail.email);

  console.log(userEmail, "this is the user email ");

  const submitPassword = () => {
    if (password.length < 5) {
      setErrors("Password must be greater then 5 character");
    } else if (password !== confirmPassword) {
      setErrors("Password doesn't match !");
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
          setLoading(false);
          console.log("this is the response which we are getting", res);
          if (res.data.sucess) {

            dispatch(
              showNotification("Password has been changed successfully")
            );
            props.history.push("/");

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
                setLoading(false)
                dispatch(logedIn());
                dispatch(cutAuthenication());
              }
            })
          }
           else if (
            res.data.error === "Your link has been expired try again"
          ) {
            setLoading(false);
            dispatch(
              showNotification("Your link has been expired , Please try again ")
            );
            props.history.push("/");
          } else {
            alert("Something went wrong with the server");
            props.history.push("/");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err , "change Password")
        });
    }
  };

  return (
    <>
      <div className="changePassword">
        <div className="changePassword_container">
          <div className="changePassword_logo">
            <img src={Logo} alt="logo icon" />
          </div>{" "}
          <div className="changePassword_mainImg">
            <img src={Lock} alt=" main img" />
            <span>Change Password </span>
          </div>
          <div className="changePassword_new1">
            <div className="changePassword_new_col1">
              <img src={GreyLock} alt="greylock icon" />
              <input
                type="password"
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <img src={Eye} alt="eye icon" className="changePassword_eyeIcon1" />
          </div>
          <div className="changePassword_new2">
            <div className="changePassword_new_col2">
              <img src={GreyLock} alt="greylock icon" />
              <input
                type="password"
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <img src={Eye} alt="eye icon" className="changePassword_eyeIcon2" />
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
            change Password
          </button>
          {/* </NavLink> */}
        </div>
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the component ;
export default ChangePassword;

