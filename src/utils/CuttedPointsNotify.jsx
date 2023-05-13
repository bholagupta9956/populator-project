// here we will create a notification which will say that how much points will be cutted; here ;

import React, { useEffect } from "react";
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
  showNotification,
  updateWalletData,
  showData,
} from "../actions";
import "./loader.css";
import { useTranslation } from "react-i18next";
import axios from "axios";


const CuttedPointsNotify = (props) => {

  const { showCuttedPoints, points, setShowCuttedPoints,  setAllPoiShow, setLoading } =  props;

  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  
  const walletPoints = useSelector((state) => state.walletData.points);
  const { t } = useTranslation();
  const remainingPoints = walletPoints - points;
  const dispatch = useDispatch();

  // here we are getting the date ;

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const confirm = () => {

    if(points !== 0){
      
    const url = `${api}coins-detected`;
    const val = {
      total_points_deducted: points,
      date: today,
      services: [],
    };

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    };

    setLoading(true)
    axios
      .post(url, val, { headers: headers })
      .then((res) => {
        setLoading(false)
        if(res.data.message === "Insufficient funds"){
          dispatch(showNotification("Insufficient points , Please refill ."))
          setShowCuttedPoints(false)
        }
       else  if (res.data.success) {
         
          setAllPoiShow(true);
          setShowCuttedPoints(false);
          dispatch(updateWalletData(remainingPoints));

        } else if (res.data.success === false) {
          dispatch(showNotification("Something went wrong with the server"));
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
    }
    else if(points === 0){
      
    }
  };
 

  return (
    <>
    {points !== 0 ? 
      <Modal
        show={points !== 0 ? showCuttedPoints : false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="cuttedPoints">
          <h4 style={{ fontSize: "20px", textAlign: "center" }}>
            {t("Your")} <span style={{ color: "red" }}>{points}</span>{" "}
            {t("points  will be  deducted from wallet!")}
          </h4>
          <div className="cuttedPoints_btn">
            <button
              style={{ background: "rgb(248, 40, 40)" }}
              onClick={() => setShowCuttedPoints(false)}
            >
              {t("Cancel")}
            </button>
            
          <button style={{ background: "var(--blue)" }}
              onClick={confirm}
            >
              {t("Confirm")}
            </button>
          </div>
        </div>
      </Modal> :  confirm()}
    </>
  );
};

// exporting the cuttedPointsNotification ;
export default CuttedPointsNotify;

