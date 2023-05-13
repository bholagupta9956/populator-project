// This is the feedback screen which we are going to desing ;

import React, { useState } from "react";
import "./FeedBack.css";
import Feedback from "./FeedBackImages/feedback.svg";
import Cut from "./FeedBackImages/cut.svg";
import Marker from "./FeedBackImages/marker.svg";
import Arrow from "./FeedBackImages/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideFeedback, showLoginPopup, ShowSweetAlert } from "../../actions";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const FeedBack = (props) => {
  const dispatch = useDispatch();
  const MarkerAddress = useSelector(
    (state) => state.updateShapeData.markerAddress
  );
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);

  const [data, setData] = useState({
    location: "",
    specific_issue: "",
    feedback: "",
  });

  const submitData = () => {
    if (Token) {
      const urlLink = `${api}feedback`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      };
      if (data.location && data.feedback && data.specific_issue) {
        axios.post(urlLink, data, { headers: headers }).then((res) => {
          if (res.data.status) {
            dispatch(ShowSweetAlert(t("FeedBack Send Successfully")));
            dispatch(hideFeedback());
          }
        });
      } else {
        alert("Please fill the require field");
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  const feedbackState = useSelector((state) => state.feedbackHandler.show);

  const [showOptions, setShowOptions] = useState(false);
  const [choosedLocation, setChoosedLocation] = useState();

  const selectedLocation = (item) => {
    setShowOptions(false);
    setData({ ...data, location: item });
    setChoosedLocation(item);
  };

  // here we are getting the error part of the feedback screen ;

  const urlLink = `${api}error-location`;
  const choosedLanguage = i18n.language;

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log("hello world");
    axios
      .get(urlLink, {
        headers: {
          Accept: "application/json",
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const val = res.data.data;
          setErrors(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  },[]);

  return (
    <>
      {feedbackState ? (
        <div className="feedback">
          <h4 className="feedback_heading">{t("Feedback")}</h4>
          <div className="feedback_row1">
            <img src={Marker} alt="marker icon" />
            <h6>
              {t(
                "Drag the drawing pin on the map to describe the problem (if necessary)"
              )}
            </h6>
          </div>

          <div className="feedback_row2">
            <h6 className="feedback_row2_text">
              {t("Tell us the problem area")}{" "}
              <span style={{ color: "red" }}>*</span>
            </h6>
            <div className="feedback_row2_select">
              <div className="cstSelectBox">
                <div
                  className="cstSelectFirst"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <h6>{choosedLocation ? choosedLocation : t("Select")}</h6>
                  <img src={Arrow} alt="arrow icons" />
                </div>
                {showOptions && (
                  <div className="cstSelectSecond">
                    {MarkerAddress &&
                      MarkerAddress.map((item, index) => {
                        return (
                          <h6
                            value={item}
                            key={index}
                            onClick={() => selectedLocation(item)}
                          >
                            {item}
                          </h6>
                        );
                      })}
                  </div>
                )}
              </div>
              {/* <div className="feedback_row2_select_arrow">
                <img src={Arrow} alt="arrow icon" width= "16px"/>
            </div> */}
            </div>
          </div>

          <div className="feedback_row2">
            <h6 className="feedback_row2_text">
              {t("Tell us an specific issue")}
            </h6>
            <div className="feedback_row2_select">
              <select
                name="Select"
                id="feedback_select1"
                onChange={(e) =>
                  setData({ ...data, specific_issue: e.target.value })
                }
              >

                {errors &&
                  errors.map((item, index) => {
                    return (
                      <>
                        <option value={item.error_location}>
                        {item.error_location} 
                        </option>
                      </>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="feedback_row3">
            <h6 className="feedback_row3_text">
              {t("Tell us more about the problem")}{" "}
              <span style={{ color: "red" }}>*</span>
            </h6>
            <textarea
              name="feedback_text"
              id=""
              cols="30"
              rows="10"
              className="feedback_textarea"
              onChange={(e) => setData({ ...data, feedback: e.target.value })}
              value={data.description}
            ></textarea>
          </div>

          {/* adding the last row  */}
          <div className="feedback_row4">
            <h6>
              {t("Required fields")} <span style={{ color: "red" }}>*</span>
            </h6>
            <button onClick={submitData}>{t("Send")}</button>
          </div>

          {/* adding cut icon */}
          <div
            className="feedback_cut"
            onClick={() => dispatch(hideFeedback())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
        </div>
      ) : null}
    </>
  );
};

// exporting the file ;
export default FeedBack;
