// Here we are going to create a login popup ;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Cut from "./LoginImages/cut.svg";
import Logo from "./LoginImages/Logo.svg";
import Login from "./Login";
import Signup from "./SignUp";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { cutAuthenication } from "../../actions/index";
import { useTranslation } from "react-i18next";

function Loginpopup() {
  // here we are going to define the onclick function on login and sign up button ;
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const [openlogin, setOpenlogin] = useState(true);
  const [border, setBorder] = useState({
    login: {
      border: "0.2px solid rgb(102, 100, 100 ,0.5)",
      height: "0.2px",
      width: "100%",
      background: "rgb(88, 85, 85,0.7)",
    },
    signup: {
      border: "none",
      height: "0px",
      width: "0px",
      background: "rgb(88, 85, 85,0.7)",
    },
  });

  const logins = () => {
    setOpenlogin(true);
    setBorder({
      login: {
        border: "0.2px solid rgb(102, 100, 100 ,0.5)",
        height: "0.2px",
        width: "100%",
        background: "rgb(88, 85, 85,0.7)",
      },
      signup: {
        border: "none",
        height: "0px",
        width: "0px",
        background: "rgb(88, 85, 85,0.7)",
      },
    });
  };
  const signups = () => {
    setOpenlogin(false);
    setBorder({
      login: {
        border: "none",
        height: "0px",
        width: "0px",
        background: "rgb(88, 85, 85,0.7)",
      },
      signup: {
        border: "0.2px solid rgb(102, 100, 100 ,0.5)",
        height: "0.2px",
        width: "100%",
        background: "rgb(88, 85, 85,0.7)",
      },
    });
  };

  const login = {
    border: border.login.border,
  };
  const underline1 = {
    height: border.login.height,
    width: border.login.width,
    background: border.login.background,
  };

  const signup = {
    border: border.signup.border,
  };

  const underline2 = {
    height: border.signup.height,
    width: border.signup.width,
    background: border.signup.background,
  };

  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="login_modal_small_container">
          <div className="modal_small_container1">
            <img src={Logo} alt="" />
          </div>

          <h6>{t("Opportunites All Around Us")}</h6>
          <div className="modal_small_container2">
            <div className="modal_small_container2_col1" onClick={logins}>
              <h5 style={login}>{t("Login")}</h5>
              <hr style={underline1} />
            </div>
            <div className="modal_small_container2_col2" onClick={signups}>
              <h5 style={signup}>{t("Sign Up")}</h5>
              <hr style={underline2} />
            </div>
          </div>
          <div className="modal_small_container3">
            {/* here we are using toogle option for login and signup option */}

            {openlogin ? <Login /> : <Signup />}
          </div>

          {/* here cut bottom is defined ; */}
          <div
            className="login_cut_icon"
            onClick={() => dispatch(cutAuthenication(0))}
          >
            <img src={Cut} alt="cut.icon" />
          </div>
        </div>
      </Modal>
    </>
  );
}

// exporting the loginpopup here ;
export default Loginpopup;
