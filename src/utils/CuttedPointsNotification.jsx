// here we will create a notification which will say that how much points will be cutted; here ;

import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  hideNotification,
  hidePointsNotification,
  disableCluster,
  disableHeatmap,
  enableCluster,
  enableHeatmap,
  openResultPanel,
} from "../actions";
import "./loader.css";
import { useTranslation } from "react-i18next";

const CuttedPointsNotification = () => {

  const myState = useSelector(
    (state) => state.pointsNotificationhandler.showPopup
  );

  const points = useSelector((state) => state.pointsNotificationhandler.points);
  const dispatch = useDispatch();
  const clusterState = useSelector((state) => state.clustersHanlders.show);
  const heatMapState = useSelector((state) => state.heatMapHandler.show);

  const { t, i18n } = useTranslation();

  const confirm = () => {
    dispatch(hidePointsNotification(true));
    dispatch(openResultPanel());
  };

  return (
    <>
      {myState ? (
        <Modal
          show={true}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <div className="cuttedPoints" style={{}}>
            <h4 style={{ fontSize: "20px", textAlign: "center" }}>
              {t("Your")} <span style={{ color: "red" }}>{points}</span>{" "}
              {t("points  will be  deducted from wallet!")}
            </h4>
            <div className="cuttedPoints_btn">
              <button
                style={{ background: "rgb(248, 40, 40)" }}
                onClick={() => dispatch(hidePointsNotification(false))}
              >
                {t("Cancel")}
              </button>
              <button style={{ background: "var(--blue)" }} onClick={confirm}>
                {t("Confirm")}
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default CuttedPointsNotification;
