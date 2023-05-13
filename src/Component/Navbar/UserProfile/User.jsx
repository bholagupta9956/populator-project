// here we are creating the normal component which will used instead of the login/signup button after registration;

import React, { useContext, useEffect, useState } from "react";
import "./user.css";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "../Navbar.css";
import Wallet from "./UserImages/wallet.svg";
import Email from "./UserImages/email.png";
import SaudiMen from "./UserImages/saudimen.png";
import Import from "./UserImages/import.svg";
import Share from "./UserImages/share.svg";
import Coin from "./UserImages/coins.svg";
import UserProfile from "./UserImages/user.svg";
import Logout from "./UserImages/logout.svg";
import Arrow from "./UserImages/arrow.svg";
import Sharelink from "./UserImages/link.svg";
import {Marker} from "react-leaflet";
import {
  showProfile,
  showPointsHistory,
  showReferEarn,
  showPoints,
  cutProfileScreen,
  userLogin,
  updateCsvData ,
  showFileImporter ,
  updateWalletData,
  userProfile,
  showVerification,
  cutAuthenication,
  disableCluster,
  disableHeatmap,
  hideCluster,
  removeShapeRecord,
  hideNotification,
  HideSweetAlert,
  hideHeatMap,
  panel1,
  showToolsScreen,
  showTable,
  clearResultScreenData,
  clearFeaturesRecord,
  clearShapeData,
  hideControl,
  clearUserInfo,
  clearWalletData,
  openWelcome,
  saudiLocation,
  logedOut,
  changeLanguage,
  clearGeojsonKmlData,
  openGuidedTour,
  showGuidedTour,
  clearPoiMarkerData,
  showEmail,
  showFlyersScreen,
  unableMapFly,
  removeToken,
  clearCatchementData,
  clearRadiusData,
  disableCatchment,
  hideCatchmentResultScreen,
  hideCatchmentSaveFile,
  clearSelectedCatchment,
  hideSelectedCatchmentOnmap,
  clearComparisonDetails,
  hideFeedback,
  disableMapFlying,
  hideGuidedTour,
  closeGuidedTour,
  closeVideo,
  closeVideoSection,
  defualtLanguage,
  hideLoadShapes,
  clearAllCheckedItems,
  hidePoi,
  hidePoiDetails,
  hidePoiNotification,
  hidePointsNotification,
  showGraphicalDatas,
  clearShapeDetails,
  clearSelectedShapeData,
  clearShapesName,
  clearSignUpData,
  showCatchment,
  clearUserEmail
} from "../../../actions/index";
import { useDispatch } from "react-redux";
import History from "./UserImages/history.svg";
import Flyers from "./UserImages/flyer.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import TableView from "../../PointsHistory/TableView";


const User = (props) => {

  // here we are using useDispatch method just for calling the function from the redux method ;
  
  const api = useSelector((state) => state.apiStore.url);
  const {t , i18n} = useTranslation();
    const token = useSelector((state) => state.authenication.token);

  const dispatch = useDispatch();
  
  const [visible, setVisible] = useState("none");
  const showPopup = () => {
    setVisible("flex");
  };
  const hidePopup = () => {
    setVisible("none");
  };

  const map = useMap();
  map.addEventListener("click", () => {
    setVisible("none");
  });

  map.addEventListener("drag", () => {
    setVisible("none");
  });

  // adding the wallet api ;

  // const [points , setPoints] = useState(500)
  const points = useSelector((state) => state.walletData.points)

  useEffect(() => {
    const url = `${api}wallet-point`;
    
    const head = { 
      Accept: 'application/json',
      Authorization : `Bearer ${token}`
    }     
  
    axios.get(url,{headers : head})
    .then((res) => {
         dispatch(updateWalletData(res.data.points))
    })
 
  },[])

  const selectedLanguages = i18n.language;

  const userImage = useSelector((state) => state.userInfoData.image)

  
// here we are going to refresh and logout all the pages ;after logout ;
  const logout = () =>{
    dispatch(userProfile())
    dispatch(updateCsvData())
    dispatch(cutAuthenication())
    dispatch(disableCluster())
    dispatch(disableHeatmap())
    dispatch(hideCluster());
    dispatch(removeShapeRecord())
    dispatch(hideNotification(""))
    dispatch(HideSweetAlert())
    dispatch(hideHeatMap());
    dispatch(panel1());
    dispatch(showTable());
    dispatch(clearResultScreenData());
    dispatch(clearFeaturesRecord());
    dispatch(clearShapeData());
    dispatch(clearCatchementData());
    dispatch(clearRadiusData());
    dispatch(hideControl(0));
    dispatch(disableCatchment());
    dispatch(hideLoadShapes());
    dispatch(HideSweetAlert());
    dispatch(saudiLocation());
    dispatch(clearUserInfo());
    dispatch(removeShapeRecord())
    dispatch(hideNotification());
    dispatch(defualtLanguage());
    dispatch(hideHeatMap());
    dispatch(disableCluster());
    dispatch(clearComparisonDetails());
    dispatch(hideFeedback());
    dispatch(closeVideo())
    dispatch(hideGuidedTour());
    dispatch(closeGuidedTour());
    dispatch(clearGeojsonKmlData())
    dispatch(closeVideoSection());
    dispatch(disableMapFlying());
    dispatch(disableHeatmap());
    dispatch(hideCluster());
    dispatch(hideCatchmentResultScreen());
    dispatch(hideCatchmentSaveFile());
    dispatch(clearSelectedCatchment());
    dispatch(hideSelectedCatchmentOnmap());
    dispatch(removeToken())
    dispatch(clearPoiMarkerData());
    dispatch(clearComparisonDetails());
    dispatch(unableMapFly());
    dispatch(showGraphicalDatas());
    dispatch(clearSelectedShapeData());
    dispatch(logedOut());
    dispatch(clearShapeData());
    dispatch(clearWalletData());
    dispatch(clearShapeDetails());
    dispatch(clearResultScreenData());
    dispatch(clearGeojsonKmlData());
    dispatch(clearFeaturesRecord());
    dispatch(clearGeojsonKmlData())
    dispatch(userLogin());
    dispatch(hideControl());
    dispatch(clearUserEmail());
    dispatch(clearUserInfo());
    dispatch(showCatchment());
    // dispatch(TableView());
    dispatch(clearSignUpData());
    dispatch(clearShapesName());
    dispatch(hidePointsNotification());
    dispatch(hidePoi());
    dispatch(hidePoiNotification());
    dispatch(cutProfileScreen());
    dispatch(hidePoiDetails());
    dispatch(clearPoiMarkerData());
    dispatch(clearAllCheckedItems());
    map.flyTo([21.48123417641119, 39.226418773645065] , 14)

  }

  return (
    <>
      <div className="user">
        <div className="navbar_right_col2">
          <div className="navbar_right_col2_left">
            <img src={Wallet} alt="wallet icons" width="30px" />
          </div>
          <div className="navbar_right_col2_right">
            <div className="navbar_right_col2_right1">
              <span>{t("Balance")}</span>
            </div>
            <div className="navbar_right_col2_right2">
              <span>{points} {t("Points")}</span>
            </div>
          </div>

          <div
            className="user_icon"
            onMouseOver={showPopup}
            onClick={showPopup}
          >
            <div className="user_icon_img">
              <img src={userImage} alt="" />
            </div>
            <img src={Arrow} alt="arrow icon" className = "user_icon_arrow" />
          </div>

          {/* here we are going to create the popup which will be show onhover on the image ; */}
          
          <div
            className="user_popup"
            style={{ display: visible }}
            onClick={hidePopup}
          >
            <div
              className="user_popup_list"
              onClick={() => dispatch(showProfile())}
            >
              <img src={UserProfile} alt="user icon" />
              <h6>{t("Profile")}</h6>
            </div>
            <div
              className="user_popup_list"
              onClick={() => dispatch(showPoints())}
            >
              <img src={Coin} alt="coin icon" style={{width : "17px"}}/>
              <h6 style={{marginLeft : "-1px"}}>{t("Purchase Points")}</h6>
            </div>
            <div
              className="user_popup_list"
              onClick={() => dispatch(showReferEarn())}
            >
              <img src={Share} alt="share icon" />
              <h6>{t("Refer & Earn")}</h6>
            </div>

            <div
              className="user_popup_list"
              onClick={() => dispatch(showPointsHistory())}
            >
              <img
                src={History}
                alt="history icon"
                style={{ width: "18px", marginLeft: "-3px" }}
              />
              <h6>{t("Points History")}</h6>
            </div>
            <div
              className="user_popup_list"
              onClick={() => dispatch(showFlyersScreen())}
            >
              <img
                src={Flyers}
                alt="history icon"
                style={{ width: "18px", marginLeft: "-3px" }}
              />
              <h6>{t("Download Flyers")}</h6>
            </div>

            <div className="user_popup_list"  onClick = {()  => dispatch(showEmail())}>
              <img
                src={Email}
                alt="Download Flyers icon"
                style={{ width: "18px", marginLeft: "-3px" }}
              />
              <h6>{t("Share Via Email")}</h6>
            </div>

            <label htmlFor="importFile">
              <div className="user_popup_list" id="importFile" onClick={() => dispatch(showFileImporter())}>
                <img src={Import} alt="Import icon" />
                
               <h6>{t("Import")}</h6>
              </div>
            </label>

            <div
              className="user_popup_list"
              onClick={logout}
            >
              <img src={Logout} alt="logout icon" />
              <h6>{t("Logout")}</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// exporting the user file ;
export default User;

// this component has been used inside the navbar component;
