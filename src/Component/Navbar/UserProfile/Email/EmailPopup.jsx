import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./email.css";
import Loader from "../../../../utils/Loader";
import axios from "axios";
import Cut from "../UserImages/cut.svg";
import EmailIcon from "./mail.png";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { cutProfileScreen, showNotification } from "../../../../actions";

const EmailPopup = () => {
  const [emails, setEmails] = useState();
  const [errors, setErrors] = useState("");
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    const url = `${api}send-email`;
    if (emails.length < 3) {
      setErrors(t("Please enter a valid email"));
    } else if (/^[A-Z0-9._%+-] +@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emails)) {
      setErrors(t("Invalid e-mail id !"));
    } else {
      setLoading(true);
      setErrors("");
      axios
        .post(
          url,
          { email: emails },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res, "this is the res which we are getting here");
          setLoading(false);
          if (res.data.success) {
            dispatch(showNotification(t("Mail sent successfully.")));
            dispatch(cutProfileScreen());
          } else {
            setErrors(t("Invalid e-mail id"));
          }
          console.log(res, "this is the response which we are getting here");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="email">
          <div className="email_img">
            <img src={EmailIcon} alt="email icons" />
          </div>
          {/* <h5>{t("Share via Email")}</h5> */}
          <input
            type="email"
            onChange={(e) => setEmails(e.target.value)}
            value={emails}
            placeholder={t("Enter Your Email")}
          />
          {errors && <p className="error">{errors}</p>}
          <button onClick={sendEmail}>{t("Share via Email")}</button>

          <div
            className="cut_options"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="" />
          </div>

          {/* here we are adding the loader  */}
          {loading && <Loader />}
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default EmailPopup;
