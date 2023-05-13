// In this tutorial we are  going to desing the language dropdown ;

import React, { useEffect, useState } from "react";
import "./WelcomePopup.css";
import { Dropdown } from "react-bootstrap";
import World from "./WelcomeImages/world.svg";
import Arrow from "./WelcomeImages/down.svg";
import Saudi from "./WelcomeImages/saudiarabia.svg";
import India from "./WelcomeImages/india.svg";
import China from "./WelcomeImages/china.svg";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../actions";

import Germany from "./WelcomeImages/germany.svg";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const WelcomeDrop = () => {
  const dispatch = useDispatch();
  // here we are using the api to get the languages ;
  const api = useSelector((state) => state.apiStore.url);
  const selectedLanguages = useSelector(
    (state) => state.languageHanlder.language
  );
  const [language, setLanguage] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const { t, i18n } = useTranslation();

  // adding to get the languages ;
  useEffect(() => {
    const urlLink = `${api}get-language`;
    axios
      .get(urlLink, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const value = res.data.data;
        const img = res.data.welcomeImage;
        setLanguage(value);
      });

    if (selectedLanguages === "English") {
      i18n.changeLanguage("en");
    } else if (selectedLanguages === "العربية") {
      i18n.changeLanguage("ar");
    } else if (selectedLanguages === "हिंदी") {
      i18n.changeLanguage("hn");
    }
  }, []);

  const changeLanguages = (lang) => {
   
    setShowResult(!showResult);
    dispatch(changeLanguage(lang));
    if (lang === "English") {
      i18n.changeLanguage("en");

    } else if (lang === "العربية") {
      i18n.changeLanguage("ar");

    } else if (lang === "हिंदी") {
      i18n.changeLanguage("hn");
    
    }
  };

  return (
    <>
      <div className="language">
        <div
          className="language_name"
          onClick={() => setShowResult(!showResult)}
        >
          <div>
            <img src={World} alt="" width="22px" />
            <span>{selectedLanguages}</span>
          </div>
          <img src={Arrow} alt="" width="18px" />
        </div>

        {showResult && (
          <div className="language_result">
            {language
              ? language.map((data, index) => {
                  return (
                    <div
                      className="language_box"
                      onClick={() => changeLanguages(data.language)}
                      key={index}
                    >
                      <img src={data.fullimage} alt="" />
                      <span key={index.toString()}>{data.language}</span>
                    </div>
                  );
                })
              : null}
          </div>
        )}
      </div>
    </>
  );
};

// exporting the file ;
export default WelcomeDrop;
