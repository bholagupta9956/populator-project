// In this file we are going to desing the login file for the login popup it will be used as an component ;

import React, { useState, useRef } from "react";
import User from "./LoginImages/user.svg";
import padlock from "./LoginImages/padlock.svg";
import facebook from "./LoginImages/facebook.svg";
import linkedinImg from "./LoginImages/linkedin.svg";
import gmail from "./LoginImages/gmail.svg";
import "./Login.css";
import SocialButton from "./SocialButton";
import Loader from "../../utils/Loader";
import Eye from "./LoginImages/eye.png";
import Eyeoff from "./LoginImages/eyeoff.png";
import https from "https";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2";
import axios from "axios";
import {
  showLoginByOtp,
  showForgotPassword,
  updateUserInfo,
  userProfile,
  cutAuthenication,
  ShowSweetAlert,
  logedIn,
  updateUserImage,
  showNotification,
  updateUrl,
} from "../../actions";
import { useDispatch } from "react-redux";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  IResolveParams,
  TypeCrossFunction,
} from "reactjs-social-login";

const Login = () => {

  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const submitForm = (e) => {
    e.preventDefault();
    if (!loginData.email) {
      setErrors({ email: t("E-mail is required") });
    } else if (
      /^[A-Z0-9._%+-] +@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginData.email)
    ) {
      setErrors({ email: t("Invalid E-mail Id") });
    } else if (!loginData.password) {
      setErrors({ password: t("Password is required") });
    } else {
      // now post the data through api ;
      setLoading(true);
      const baseUrl = `${api}login`;
      // const baseUrl = "/admin/public/api/v1/login"

      const agent = new https.Agent({
        requestCert: true,
        rejectUnauthorized: false,
      });

      axios
        .post(baseUrl, loginData, { httpsAgent: agent })
        .then((res) => {
          if (res.data.access_token) {
            const userImage = res.data.user.fullimage;
            dispatch(updateUserImage(userImage));
            const token = res.data.access_token;
            const loginData = res.data.user;
            dispatch(updateUserInfo(loginData));
            dispatch(userProfile(token));
            dispatch(logedIn());
            setLoading(false);
            dispatch(cutAuthenication());
            //  dispatch(ShowSweetAlert("Login SuccessFully"));
          } else if ((res.data.message = "Invalid credentials!")) {
            setLoading(false);
            setErrors({ All: t("Invalid E-mail Id or Password") });
          }
        })
        .catch((err) => {
          setLoading(false);
          dispatch(cutAuthenication());
          dispatch(showNotification("Network error !"));
        });
    }
  };

  // here we are writing a function which will handle login through social media ;

  const handleSocialLogin = (user) => {
    const socialLoginUrl = `${api}social-media`;

    const val = {
      email: user._profile.email,
      firstName: user._profile.firstName,
      lastName: user._profile.lastName,
      id: user._profile.id,
      provider: user._provider,
      token: user._token.accessToken,
      expiresAt: user._token.expiresAt,
      name: user._profile.name,
      profile_pic: user._profile.profilePicURL,
    };

    axios
      .post(socialLoginUrl, val)
      .then((res) => {
        
        if (res.data.status) {
          const userImage = res.data.data.fullimage;
          dispatch(updateUserImage(userImage));
          const token = res.data.access_token;
          const loginData = res.data.data;
          dispatch(updateUserInfo(loginData));
          dispatch(userProfile(token));
          dispatch(logedIn());
          setLoading(false);
          dispatch(cutAuthenication());
        }        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSocialLoginFailure = (error) => {
    console.log(error);
  };

  const [visiblePassword, setVisiblePassword] = useState(false);
  const togglePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  // const { linkedInLogin } = useLinkedIn({
  //   clientId: "78py20cejetdt3",
  //   redirectUri: `${window.location.origin}/linkedin`,
  //   // redirectUri: `https://populator.co/linkedin`,
  //   // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
  //   onSuccess: (code) => {
  //     console.log(code , "hello world");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const { linkedInLogin } = useLinkedIn({
    clientId: "86vhj2q7ukf83q",
    redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="popup_login">
        <div className="popup_login_row1">
          {errors.All && <p className="signUp_error_content">{errors.All}</p>}

          <form action="" onSubmit={submitForm}>
            <div className="popup_login_row1_col1">
              <img src={User} alt="user.icon" width="18px" />
              <input
                type="text"
                placeholder={t("Enter e-mail")}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            {errors.email && (
              <p className="signUp_error_content">{errors.email}</p>
            )}

            <div className="popup_login_row1_col2">
              <img src={padlock} alt="password icon" width="18px" />
              <input
                type={visiblePassword ? "text" : "password"}
                placeholder={t("password")}
                className="login_password"
                s
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <img
                src={visiblePassword ? Eyeoff : Eye}
                alt="eye icons"
                className="login_password_img"
                onClick={togglePassword}
              />
            </div>
            {errors.password && (
              <p className="signUp_error_content">{errors.password}</p>
            )}

            <button className="popup_login_submit" type="submit">
              {t("Submit")}
            </button>
          </form>
          <div className="popup_login_row1_col2_5">
            <h6
              className="loginviaotp"
              onClick={() => dispatch(showLoginByOtp())}
            >
              {t("Login Via OTP")}
            </h6>

            <h6 onClick={() => dispatch(showForgotPassword())}>
              {t("Forget Password?")}
            </h6>
          </div>
          <div className="popup_login_row1_col3">
            <hr />
            <span>{t("Or")}</span>
            <hr />
          </div>
          <div className="popup_login_row1_col4">
            <SocialButton
              provider="facebook"
              appId="335841790437382"
              // appId="473238460755675"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              // key={'facebook'}
            >
              <img
                src={facebook}
                alt="facebook icon"
                width="48px"
                height="48px"
              />
            </SocialButton>

            <SocialButton
              provider="google"
              appId="292066014682-44kuvj8g5kp6eesnpj8i6hg7916ogjiv.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              // key={"google"}
              // scope={"https://www.googleapis.com/auth/user.gender.read"}
            >
              <img src={gmail} alt="gmail icon" width="48px" height="48px" />
            </SocialButton>

            {/* <img
              onClick={linkedInLogin}
              src={linkedinImg}
              width="43px"
              height="43px"
              alt="Sign in with Linked In"
              style={{ maxWidth: "180px", cursor: "pointer" }}
            /> */}
          </div>
        </div>

        {/* here we are adding a spinner */}
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the file ;
export default Login;
