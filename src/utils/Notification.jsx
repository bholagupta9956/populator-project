// here we are creating a notification ;
import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { hideNotification, showNotification } from "../actions";
import "../App.css";

const Notification = () => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.handleNotification.data);

  var notificationState = useSelector((state) => state.handleNotification.show);
  const {t , i18n} = useTranslation();

  const button = {
    width: "120px",
    height: "30px",
    textAlign: "center",
    background: "var(--blue)",
    color: "white",
    border: "none",
    borderRadius: "3px",
    marginTop: "20px",
  };

  return (
    <>
      {notificationState ? (
        <Modal
          show={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="notification"> 
              <h5 style ={{textAlign :"center" , color : "var(--grey)" , fontSize
            : "16px"}}>{text} </h5> 
              <button
                style={button}
                onClick={() => dispatch(hideNotification(""))}
              >
               {t("Ok")}
              </button>

          </div>
        </Modal>
      ) : null}
    </>
  );
};

// exporting the notification her e;
export default Notification;
