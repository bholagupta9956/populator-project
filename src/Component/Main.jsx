// This is The main file of the project ;

import React, { useState,useEffect , useRef } from "react";
import "./Main.css";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  MapConsumer,
} from "react-leaflet";
import Video from  "../Component/GuidedTour/Videos"
import L from "leaflet";
import Navbar from "./Navbar/Navbar";
import Welcomepopup from "./Welcome/Welcomepopup";
import icon from "leaflet/dist/images/marker-icon.png";
import Focus from "./mainimages/focus.svg";
import Chat from "./mainimages/chat.svg";
import Reload from "./mainimages/load.png";
import Radius from "./Catchment/Radius";
import ComparisonDetails from "./Comparison/ComparisonDetails";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Plus from "./Navbar/NavbarImages/plus.svg";
import ComparisonScreen from '../Component/Comparison/ComparisonScreen';
import LogedOut from "./LogedOut";
import Subtract from "./Navbar/NavbarImages/subtract.svg";
import World from "./Navbar/NavbarImages/world.svg";
import Control from "./ControlPanel/Control";
import Refresh from "./mainimages/refresh.svg";
import WebTour from "./GuidedTour/WebTour";
import LoginMaster from "./Loginpopup/LoginMaster";
import EditToolbar from "./Shapes/EditToolbar";
import Flyers from "./Flyers/Flyers";
import CatchmentSave from "./Catchment/CatchmentResult/CatchmentSave";
import Videos from "../Component/GuidedTour/Videos"
import Minimap from "./Minimap/Minimap";
import CatchmentResult from "./Catchment/CatchmentResult/CatchmentResult";
import Catchment from "../Component/Catchment/Catchment"
import LayersControler from "./Shapes/LayersControler";
import Add from "./mainimages/add.svg";
import PoiMarker from "./Result/Graphs/Poi's/PoiMarker";
import Print from "../Component/Print/Print";
import Minus from "./mainimages/minus.svg";
import PrinterComponent from "./Shapes/Printer";
import GuidedTour from "./GuidedTour/GuidedTour";
import FeedBack from "./FeedBack/FeedBack";
import FeedBackIcon from "./mainimages/feedback.svg";
import LoadShape from "./LoadShape/LoadShape";
import ToolsIcon from "./Tools/ToolsImages/tools.svg";
import "./Shapes/shapes.css";
import { useLocation } from "react-router";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import ProfilePopupController from "./Navbar/UserProfile/ProfilePopupController/ProfilePopupController";
import { useDispatch, useSelector } from "react-redux";
import {
  showControl,
  openControlPanel,
  showToolsScreen,
  showLoginPopup ,
  showChangePassword ,
  saveMap,
  showNotification,
  showLoadShapes,
  showFeedback,
  updateUrl,
} from "../actions/index";
import CuttedPointsNotification from "../utils/CuttedPointsNotification";
import SweetAlerts from "./SweetAlerts";
import CsvDataResult from "./Navbar/UserProfile/FileImporter/CsvDataResult";
import PopupController from "./PopupController";
import KmlData from "./Navbar/UserProfile/FileImporter/KmlData";
import { ScreenCapture } from "react-screen-capture";
import Heatmap from "./Result/Heatmap";
import Youtube from "./GuidedTour/Youtube";
import PoiLayers from "./Result/PoiLayers";
import Compasses from "../Component/Compass/Compass"
import poiNotification from "../reducers/poiNotificationHandler";
import Clusters from "./Result/Clusters";
import Countrycode from "./Loginpopup/CountryCode";
import Loader from "../utils/Loader";
import CompareMain from "../Component/Comparison/CompareMain";
import Notification from "../utils/Notification";
import GeoJsonResult from "./Navbar/UserProfile/FileImporter/GeoJSonResult";
import ResultPanel1 from "./Result/ResultPanel1";
import { useTranslation } from "react-i18next";
import PoiNotification from "../utils/PoiNotification";
import EarnedPoints from "./Loginpopup/EarnedPoints";


const Main = () => {
  const mapLocation = useSelector((state) => state.mapLocation.coordinates);
  const zoomVal = useSelector((state) => state.mapLocation.zoom);
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.authenication.token);
  const position = mapLocation;
  const api = useSelector((state) => state.apiStore.url);
  //  const position = [21.4843706, 39.2355432]  //jaddah coordinates
  //  const position = [26.850000, 80.949997] india coordintes lucknow
  //  const position = [51.51, -0.12]; // london coordinates
  const [usersCurrentLocation , setUsersCurrentLocation] = useState(mapLocation);


  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState([0, 0]);

  const [register, setRegister] = useState(false);

  const shows = () => {
    setRegister(true);
  };
  const hides = () => {
    setRegister(false);
  };

  // here navbar open close function is defined ;
  const [open, setOpen] = useState(true);

  // adding css to the marker icon ;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // adding second nav functions below ;

  const [upDownSlide, setUpDownSlide] = useState({
    top: "65px",
  });

  const [loading, setLoading] = useState(false);

  const slidingUpDown = () => {
    if (upDownSlide.top === "65px") {
      setUpDownSlide({ top: "0px" });
    } else {
      setUpDownSlide({ top: "65px" });
    }
  };

  const slides = {
    zIndex: 1001,
    position: "absolute",
    top: upDownSlide.top,
    right: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "8px 12px",
    transition: "0.4s",
  };
  

  // here we are writing the function which will send you to the changePassword screen ;
  
  const Location = useLocation();
  const passwordToken = new URLSearchParams(Location.search).get("token");
  const showPasswordScreen = new URLSearchParams(Location.search).get('showPasswordScreen');

    if(showPasswordScreen){
      dispatch(showChangePassword())
    }

  // adding location tracker ; here

  const traceLocation = () => {
    console.log("tracelocation from here")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.flyTo([lat, lng], 14);
      });
    } else {
      console.log("sorry your browser doesn't support geolocation !");
      dispatch(
        showNotification("Sorry, Your browser doesn't support geolocation !")
      );
    }
  };

  // here we are defining the zoom level increment and decrement function ;

  const [zoomLevel, setZoomLevel] = useState(14.65);
  //const zoomvaluetext = (zoomLevel / 18) * 100;
  const [zoomValue, setZoomValue] = useState(77);

  const increaseZoomLevel = () => {
    if (zoomLevel < 18) {
      const int = Math.round((zoomLevel / 18) * 100);
      setZoomValue(int);
      setZoomLevel(zoomLevel + 1);
      map.setZoom(zoomLevel + 1);
    }
  };

  const decreaseZoomLevel = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
      map.setZoom(zoomLevel - 1);
      const int = Math.round((zoomLevel / 18) * 100);
      setZoomValue(int);
    }
  };

  const inputZoomValue = (e) => {
    const inputvalue = e.target.value
    const orgval = inputvalue * 0.18;
    setZoomLevel(orgval);
    setZoomValue(inputvalue);
    map.setZoom(orgval);
  };


  const { t, i18n } = useTranslation();

  const toolScreens = () =>{
    if(Token){
      dispatch(showToolsScreen("toolsScreen"))
    }
    else {
      dispatch(showLoginPopup());
    } 
  }

  // here we are writing the function for the load shapes ;
  const poiRef = useRef();

  const openLoadShapes = () =>{
    if(Token){
      dispatch(showLoadShapes())
    }
    else {
      dispatch(showLoginPopup())
    }
  };

  return (
    <>
      <div className="main_container">
        <MapContainer
          whenCreated={setMap}
          center={usersCurrentLocation}
          zoom={zoomLevel}
          rotation={Math.PI / 12}
          zoomControl={false}
          scrollWheelZoom={true}
          drawControl = {true}
          doubleClickZoom={false}
          className="leaflet_container"
          zoomSnap={0}
          zoomDelta={0.18}
          maxZoom={18}
        >
          <MapConsumer>
            {(map) => {
              dispatch(saveMap(map));
              map.addEventListener("zoom", () => {
                const zoomValues = Math.round(map.getZoom());
                setZoomLevel(zoomValues)
                const val = Math.round((zoomValues / 18) * 100);
                setZoomValue(val);
              });
              return null;
            }}
          </MapConsumer>

          {/* here we are importing layersControl */}
          <LayersControler />

          {/* here we are adding minimapcontrol */}
          <Minimap />
          {/* <ZoomControl position="bottomleft" style={{ marginLeft: "22px" }} /> */}

          {/* adding printercomponent for print option  */}
          <PrinterComponent />

          {/* adding editToolbar which will control shapes  */}
          <EditToolbar />

          {/* adding marker which will be shown at user's location  */}
          <Marker position={userLocation} icon={DefaultIcon}>
            <Popup>This is the location</Popup>
          </Marker>

          {/* Adding welcome popup here  */}
          <Welcomepopup />

          {/* here we are adding navbar which we have  imported from navbar folder  */}

          <Navbar open={open} showpopup={shows} sliding={slidingUpDown} />
          {/* here we are adding the control panel which will control the basics requirement of map */}
          

          <div className="secondnav" style={slides}>
            <div
              className="secondnav_col3"
              onClick={() =>
                Token ? dispatch(showControl(0)) : dispatch(showLoginPopup())
              }
            >
              <img src={World} alt="world icon" width="19px" />
              <span>{t("Find Opportunities")}</span>
            </div>
          </div>

          {/* here we are adding the control panel  which will be controlled by the find opportunities button*/}
          <Control />

          <div className="chat_info_icon">
            <img src={Chat} alt="chat icon"  style ={{display : "none"}}/>

            <div className="chat_feedback" onClick={() => dispatch(showFeedback())}>
              <img src={FeedBackIcon} alt="feedback icon" />
              <span>{t("Feedback")}</span>
            </div>
          </div>

          {/* here we are adding the location tracker  */}
          <div className="location_tracker" onClick={traceLocation}>
            <img src={Focus} alt="location tracker icon" />
          </div>

          {/* adding loginmaster component here */}

          <LoginMaster show={register} hidePopup={hides} />

          {/* here we are going to add plus and minus icon with zoom entering value  */}

          <div className="zoom_control">
            <img src={Add} alt="add icon" onClick={increaseZoomLevel} />
            <div className="zoomcontrol_value" htmlFor="zoomvalue">
              <input
                type="text" pattern="[0-9]*"
                value={zoomValue}
                id="zoomvalue"
                readOnly={true}
               // onChange={inputZoomValue}
              />
              <span htmlFor="zoomvalue">%</span>
            </div>
            <img src={Minus} alt="minus icon" onClick={decreaseZoomLevel} />
          </div>

          {/* here we are adding UserProfilePopup which will show activity when user hover on the profile icons  */}

          <ProfilePopupController />

          {/* here we are adding feedback screen where user can easily give there feedback */}

          <FeedBack />

          {/* here we are using  sweet alert which will alert according the need  */}

          <SweetAlerts />

          {/* here we are adding the notification  */}
          <Notification />

          {/* here we are importing the csvdataresult just for demo purpose */}
          <CsvDataResult />

          {/* here we are adding the popupController  */}
          <PopupController />

          {/* here we are adding the kmldata  */}
          <KmlData />

          {/* here we are creating tools icon which will be used to toggle the toolScreen panel ; */}

          <div
            className="tools"
            onClick={toolScreens}
          >
            <img src={ToolsIcon} alt="tools icon" style={{ width: "18px" }} />
            <h5>{t("Tools")}</h5>
          </div>

          {/* here we are adding the heat map just for demo purpose */}
          <Heatmap />
          <Clusters />
          <PoiLayers />

         
          {/* here we are adding the result panel */}
          <ResultPanel1 />

          {/* here we are adding the points notification popup  */}
          <CuttedPointsNotification />

          {/* here we are adding poi notifications  */}
          <PoiNotification />

          {/* here we are adding a country code ; */}
          <Countrycode />

          {/* here we are adding a geoJson file which will be shown  */}
          <GeoJsonResult />

          {/* here we are adding a guided tour which will be usefull for the user ; */}
          <WebTour />
          <GuidedTour />

          {/* here we are adding a poimarker  */}
          <PoiMarker/>

          {/* here we are adding compass to the map  */}
          <Compasses />

          {/* here we are adding the print options  */}
          <Print />

          {/* here we are adding the video just of demo screen  */}
          <Videos/>

          {/* here we are adding the youtube video popup */}
          <Youtube />

          {/* here we are adding the catchment part to the project  */}
          <div className="catchh">
          <Catchment/>
          </div>
            
     
          {/* here we are adding the radius part to the main component */}
          <Radius />

          {/* here we are adding the loader just for better user experience  */}

          {/* here we are adding the pptxfile  */}
          {/* <Pptxfile/> */}

          {/* here we are adding the catchment save file  */}
          <CatchmentSave />

          {/* here we are adding the catchemnt result screen */}
          <CatchmentResult />


          {/* here we are creating a load shape button */}
          <div className="loadShpe" onClick={openLoadShapes}>
              <span>{t("Load Shape")}</span>
          </div>

          <LoadShape />

          {/* here we are adding the  some of the component just for the testing  purpose */}

          <LogedOut />
            
          {loading && <Loader />}
        </MapContainer>
      </div>
    </>
  );
};
// exporting the main file
export default Main;
