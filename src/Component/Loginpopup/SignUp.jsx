import React, { useEffect, useState } from "react";
import Saudicurrency from "./LoginImages/saudiarabia.svg";
import Corporation from "./LoginImages/corporation.svg";
import { useMap } from "react-leaflet";
import Graduated from "./LoginImages/graduated.svg";
import Government from "./LoginImages/goverment.svg";
import Enterpreneur from "./LoginImages/idea.svg";
import Others from "./LoginImages/others.svg";
import axios from "axios";
import "./Login.css";
import { hidePoiDetails, showCountryCode, showVerification, updateSignUpData, updateUserBalance, updateUserNumber,  showProfile ,clearUserEmail} from "../../actions";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";
import Eye from "./LoginImages/eye.png"
import Eyeoff from "./LoginImages/eyeoff.png"
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const {t , i18n} = useTranslation();
  const map = useMap();



  const country_code = useSelector((state) => state.countryCodeHandler.data);

  // here validation is added ;
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    phone_code: country_code.phone_code,
    designation: "student",
    code: null,
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  
   // here we are going to fetch the data for the country code ;
  // const [counteryCode, setCountryCode] = useState([]); 

  const handleSubmit = (e) => {
    
    e.preventDefault();
    if (!values.name) {
      setErrors({ name: t('Name is required') });
    } else if (values.name.length <= 3) {
      setErrors({ name: t('Name must be greater than 3 character') });
    } else if (!values.email) {
      setErrors({ email: t('E-mail is required') });
    } else if (/^[A-Z0-9._%+-] +@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      setErrors({ email: t('Invalid E-mail Id') });
    } else if (!values.password) {
      setErrors({ password: t('Password is required') });
    } else if (values.password.length <= 5) {
      setErrors({ password:  t('Password must be greater than 5 character')});
     } else if (!values.phone_no) {
      setErrors({ number: t('Phone number is required') });
    }
    else if( values.phone_no.length !== country_code.digits){   
          setErrors({number : `Phone number must be of ${country_code.digits} digit`})
    }

     else {
      const baseUrl = `${api}signup`;
      setLoading(true);
      dispatch(updateSignUpData(values))
      console.log(values , "this is the values which we are sending ")
      axios
        .post(baseUrl, values, { headers: { Accept: "application/json" } })
        .then((res) => {
          console.log(res , "this is the response sent by th e signup api")
          if (res.data.success) {
           
            const  access_token = res.data.access_token ;
            const ballance = res.data.data.wallet.balance;
            dispatch(updateUserBalance(ballance))
           
            const data = {
              code : country_code.phone_code , 
              number : values.phone_no ,
              email : values.email
            }

            setLoading(false);
            dispatch(updateUserNumber(data))
            dispatch(showVerification(access_token));
          
          } else if (res.data.msg === "Email already exists") {
            setLoading(false);
            setErrors({ email: t("Email already exists") });
          } else if (res.data.msg === "Phone number already exists") {
            setLoading(false);
            setErrors({ number: t('Phone number already exists') });
          } else {
            setLoading(false);
            alert("something went wrong");
          }
        })

        .catch((err) => {
          setLoading(false)
          console.log("this is the error send by server", err);
          if (err) {
            alert("Something went wrong with the server");
          }
        });
    }
  };

  // here we are going to write function which will get the refercode if the site is refered byf someone and will use it in registeration ;

  const Location = useLocation();
  const referCode = new URLSearchParams(Location.search).get("code");
  

  useEffect(() => {

    if (referCode) {

      setValues({
        ...values,
        referral_code : referCode ,
      });
    }
  }, []);


  const chooseCountryCode = () =>{
    dispatch(showCountryCode())
  }
  
  const [visiblePassword , setVisiblePassword] = useState
  (false)
  const togglePassword = () =>{
    setVisiblePassword(!visiblePassword
      )
  }

  
  return (
    <>
      <form className="popup_signup" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder={t('Name')}
          value={values.name}
          onChange={(e) => {
            setValues({ ...values, name: e.target.value });
          }}
        />

        {errors.name && <p className="signUp_error_content">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder={t('Enter e-mail')}
          value={values.email}
          onChange={(e) => {
            setValues({ ...values, email: e.target.value });
          }}
        />

        {errors.email && <p className="signUp_error_content">{errors.email}</p>}
        <div className = "signUp_password">
        <input
          type={visiblePassword ? 'text' : "password"}
          name="password"
          className ="signUp_passwword_input"
          placeholder={t('password')}
          value={values.password}
          onChange={(e) => {
            setValues({ ...values, password: e.target.value });
          }}
        />

        <img src={visiblePassword  ?Eyeoff : Eye} alt="eye icons" onClick={togglePassword}/>
        </div>
        {errors.password && (
          <p className="signUp_error_content">{errors.password} </p>
        )}

        <div className="popup_signup_row1">
          
          <div className="box_container">
            <div className="popup_signup_row1_col1" onClick = {chooseCountryCode} >
              <img
                src={country_code.image}
                alt="saudicurrency icon"
                width="25px"
                height="25px"
              />
              <span>{country_code.phone_code}</span>
            </div>

          </div>

          <div className="popup_signup_row1_col2">
            <input
              type="number"
              placeholder={t('Mobile Number')}
              name="phone_no"
              value={values.phone_no}
              onChange={(e) => {
                setValues({ ...values, phone_no: e.target.value });
              }}
            />
          </div>
        </div>

        {errors.number && (
          <p className="signUp_error_content">{errors.number}</p>
        )}

        <div
          className="popup_signup_row2"
          type="select"
          onChange={(e) =>
            setValues({ ...values, designation: e.target.value })
          }
        >
          <div className="popup_signup_row2_col1">
            <label htmlFor="student">
              <img src={Graduated} alt="male icon" width="80%" />
              <input
                type="radio"
                name="designation"
                value="student"
                id="student"
                defaultChecked
              />
            </label>
            <span>{t("Student")}</span>
          </div>

          <div
            className="popup_signup_row2_col1"
            style={{ transform: "translateX(4px)" }}
          >
            <label htmlFor="enterpreneur">
              <img src={Enterpreneur} alt="female" width="80%" />
              <input
                type="radio"
                name="designation"
                value="enterpreneur"
                id="enterpreneur"
              />
            </label>
            <span>{t('Enterpreneur')}</span>
          </div>

          <div className="popup_signup_row2_col1">
            <label htmlFor="corporation">
              <img src={Corporation} alt="female" width="80%" />
              <input
                type="radio"
                name="designation"
                value="corporation"
                id="corporation"
              />
            </label>
            <span>{t('Corporation')}</span>
          </div>

          <div
            className="popup_signup_row2_col1"
            style={{ transform: "translateX(-4px)" }}
          >
            <label htmlFor="government">
              <img src={Government} alt="female" width="55%" height="140%" />
              <input
                type="radio"
                name="designation"
                value="government"
                id="government"
              />
            </label>
            <span>{t('Government')}</span>
          </div>

          <div className="popup_signup_row2_col1">
            <label htmlFor="others">
              <img src={Others} alt="female" width="90%" />
              <input
                type="radio"
                name="designation"
                value="others"
                id="others"
              />
            </label>
            <span>{t("Others")}</span>
          </div>
        </div>
        <button
          type="submit"
          className="popup_login_submit"
          style={{
            margin: "12px 0px",
            marginBottom: "28px",
            fontWeight: "500",
          }}
        >
          {t('Sign Up')}
        </button>
        {/* here we are adding a loader  */}
        {loading && <Loader />}
      </form>
    </>
  );
};

// Exporting the signup page here ;
export default Signup;
