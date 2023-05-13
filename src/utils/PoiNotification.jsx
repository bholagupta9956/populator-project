import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { hidePoiNotification, showControl, panel2 } from "../actions";
import { useTranslation } from "react-i18next";

import "./loader.css";

const PoiNotification = () => {
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.poiNotification.show);

  const proceed = () => {
    dispatch(hidePoiNotification());
    dispatch(panel2());
    dispatch(showControl(0));
  };

  const cancel = () => {
    dispatch(hidePoiNotification());
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      {myState ? (
        <Modal
          show={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="cuttedPoints">
            <h4 style={{ fontSize: "14px" , textAlign :"center"}}>
            
              {t(
                "You have not selected any sevices or poi , If you want to select services & poi then click proceed !"
              )}
            </h4>
            <div className="cuttedPoints_btn">
              <button
                style={{ background: "rgb(248, 40, 40)" }}
                onClick={cancel}
              >
                {t("Cancel")}
              </button>
              <button style={{ background: "var(--blue)" }} onClick={proceed}>
                {t("Proceed")}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

// exporting the cuttedPointsNotification ;
export default PoiNotification;
