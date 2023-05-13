// here all the fuctions will be define that how to do ;
import {combineReducers} from "redux";
import updateShapeData from "./shapeData";
import manageProfile from "./profileUpdate";
import authenication from "./authenication";
import createShapesRecord from "./createdShapeRecord";
import PointHistory from "./pointsHistory";
import popupController from "./popupController"
import findOpportunities from "./opportunities" ;
import toggleAllPanel from "./toggleControlPanel";
import handleSweetAlert from "./handleSweetAlert";
import resultScreenData from "./resultScreenData";
import selectedFeaturesRecord from "./selectedFeaturesRecord";
import comparison from './comparison'
import walletData from "./walletData";
import countryCodeHandler from "./countryCodeHandler"
import feedbackHandler from "./feedbackHandler";
import poiHandler from "./poiHandler";
import selectedShape from "./selectedShape";
import poiMarkerData from "./poiMarkerData";
import shapesName from "./shapesName";
import poiLayersHandlers from "./poiLayersHandlers";
import panel3 from "./panel3";
import toolsHanlder from "./toolsHandler";
import apiStore from "./apiStore";
import loadShapes from "./loadShapes";
import fileImporter from "./fileImporter";
import resultPanelHandler from "./resultPanelHandler"; 
import heatMapHandler from "./heatMapHandler";
import userInfoData from "./userInfoData";
import mapLocation from "./mapLocation";
import guidedTour from "./guidedTour";
import catchmentData from "./catchmentData";
import userEmail from "./userEmail";
import pointsNotificationhandler from "./PointsNotificationhandler"
import handleNotification from "./handleNotification";
import saveShape  from "./saveShape";
import updateMap from "./updateMap";
import signUpData from "./signUpData";
import languageHanlder from "./languageHanlder";
import userLoged from "./userLoged";
import poiCheckedItem from "./poiCheckedItem";
import poiNotification from "./poiNotificationHandler";
import clustersHanlders from "./clustersHandlers";
import AllCreatedShapes from "./AllCreatedShapes";
import welcomeHandler from "./welcomeHandler";
import enableClusterHeatmap from "./clusters&HeatmapHandler";
import api from "./api";
import removeAllPoiFromMap from "./removeAllPoiFromMap";

const rootReducer = combineReducers({
    updateShapeData ,
    manageProfile ,
    authenication ,
    createShapesRecord,
    PointHistory ,
    findOpportunities,
    toggleAllPanel ,
    poiMarkerData ,
    comparison ,
    handleSweetAlert,
    updateMap,
    toolsHanlder ,
    popupController,
    fileImporter ,
    selectedFeaturesRecord ,
    AllCreatedShapes ,
    resultScreenData,
    walletData ,
    welcomeHandler,
    feedbackHandler ,
    loadShapes,
    poiLayersHandlers ,
    shapesName ,
    panel3 ,
    signUpData ,
    apiStore ,
    userLoged,
    saveShape ,
    pointsNotificationhandler,
    selectedShape,
    poiHandler,
    catchmentData ,
    guidedTour ,
    languageHanlder ,
    userEmail ,
    clustersHanlders,
    heatMapHandler,
    countryCodeHandler ,
    resultPanelHandler,
    poiCheckedItem ,
    mapLocation ,
    poiNotification,
    enableClusterHeatmap,
    userInfoData ,
    removeAllPoiFromMap ,
    handleNotification ,
    api
})

export default rootReducer ;