// here we are writing the function when the user is logged out then all the conditions should be followed ;

import React, { useState, useEffect } from "react";
import {
  hidePoiNotification,
  showProfile,
  showPointsHistory,
  showReferEarn,
  showPoints,
  cutProfileScreen,
  userLogin,
  updateCsvData,
  showFileImporter,
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
  hidePointsNotification,
  showGraphicalDatas,
  clearShapeDetails,
  clearSelectedShapeData,
  clearShapesName,
  clearSignUpData,
  showCatchment,
  clearUserEmail,
} from "../actions";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const LogedOut = () => {
  const Location = useLocation();
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();
  const map = useMap();
  const referCode = new URLSearchParams(Location.search).get("code");
  const token = new URLSearchParams(Location.search).get("token");
  const urlSecretCode = new URLSearchParams(Location.search).get(
    "secretCode"
  );

  useEffect(() => {
    if (referCode) {
      dispatch(userProfile());
      dispatch(updateCsvData());
      dispatch(cutAuthenication());
      dispatch(disableCluster());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(removeShapeRecord());
      dispatch(hideNotification(""));
      dispatch(HideSweetAlert());
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
      dispatch(removeShapeRecord());
      dispatch(hideNotification());
      dispatch(defualtLanguage());
      dispatch(hideHeatMap());
      dispatch(disableCluster());
      dispatch(clearComparisonDetails());
      dispatch(hideFeedback());
      dispatch(closeVideo());
      dispatch(hideGuidedTour());
      dispatch(closeGuidedTour());
      dispatch(clearGeojsonKmlData());
      dispatch(closeVideoSection());
      dispatch(disableMapFlying());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(hideCatchmentResultScreen());
      dispatch(hideCatchmentSaveFile());
      dispatch(clearSelectedCatchment());
      dispatch(hideSelectedCatchmentOnmap());
      dispatch(removeToken());
      dispatch(clearComparisonDetails())
      dispatch(clearPoiMarkerData());
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
      dispatch(clearGeojsonKmlData());
      dispatch(userLogin());
      dispatch(hideControl());
      dispatch(clearUserEmail());
      dispatch(clearUserInfo());
      dispatch(showCatchment());
      dispatch(clearSignUpData());
      dispatch(clearShapesName());
      dispatch(hidePointsNotification());
      dispatch(hidePoi());
      dispatch(hidePoiNotification());
      dispatch(cutProfileScreen());
      dispatch(hidePoiDetails());
      dispatch(clearPoiMarkerData());
      dispatch(clearAllCheckedItems());
      map.flyTo([21.48123417641119, 39.226418773645065], 14);
    }
    else if(token){
      dispatch(userProfile());
      dispatch(updateCsvData());
      dispatch(cutAuthenication());
      dispatch(disableCluster());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(removeShapeRecord());
      dispatch(hideNotification(""));
      dispatch(HideSweetAlert());
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
      dispatch(removeShapeRecord());
      dispatch(hideNotification());
      dispatch(defualtLanguage());
      dispatch(hideHeatMap());
      dispatch(disableCluster());
      dispatch(clearComparisonDetails());
      dispatch(hideFeedback());
      dispatch(closeVideo());
      dispatch(hideGuidedTour());
      dispatch(closeGuidedTour());
      dispatch(clearGeojsonKmlData());
      dispatch(closeVideoSection());
      dispatch(disableMapFlying());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(hideCatchmentResultScreen());
      dispatch(hideCatchmentSaveFile());
      dispatch(clearSelectedCatchment());
      dispatch(hideSelectedCatchmentOnmap());
      dispatch(removeToken());
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
      dispatch(clearGeojsonKmlData());
      dispatch(userLogin());
      dispatch(hideControl());
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
      map.flyTo([21.48123417641119, 39.226418773645065], 14);
    }
    else if(urlSecretCode){
      dispatch(userProfile());
      dispatch(updateCsvData());
      dispatch(cutAuthenication());
      dispatch(disableCluster());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(removeShapeRecord());
      dispatch(hideNotification(""));
      dispatch(HideSweetAlert());
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
      dispatch(removeShapeRecord());
      dispatch(hideNotification());
      dispatch(defualtLanguage());
      dispatch(hideHeatMap());
      dispatch(disableCluster());
      dispatch(clearComparisonDetails());
      dispatch(hideFeedback());
      dispatch(closeVideo());
      dispatch(hideGuidedTour());
      dispatch(closeGuidedTour());
      dispatch(clearGeojsonKmlData());
      dispatch(closeVideoSection());
      dispatch(disableMapFlying());
      dispatch(disableHeatmap());
      dispatch(hideCluster());
      dispatch(hideCatchmentResultScreen());
      dispatch(hideCatchmentSaveFile());
      dispatch(clearSelectedCatchment());
      dispatch(hideSelectedCatchmentOnmap());
      dispatch(removeToken());
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
      dispatch(clearGeojsonKmlData());
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
    }
  }, []);

  return (
    <>
      <div className="logedOut"></div>
    </>
  );
};

// exporting the component ;
export default LogedOut;
