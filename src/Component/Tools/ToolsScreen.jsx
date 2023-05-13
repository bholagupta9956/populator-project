// In this component we are going to create d3 screen ;
// this toolscreen will be managed inside the profile popup controller ;

import React, { useState, useEffect } from "react";
import "./ToolsScreen.css";
import { useMap } from "react-leaflet";
import L from "leaflet";
import Tools from "./ToolsImages/tools.svg";
import Catchment from "./ToolsImages/catchment.svg";
import Clipboard from "./ToolsImages/clipboards.svg";
import Comparison from "./ToolsImages/comparison.svg";
import Search from "./ToolsImages/search.svg";
import Drill from "./ToolsImages/drill.svg";
import Kitchen from "./ToolsImages/kitchen.svg";
import Shoes from "./ToolsImages/shoes.svg";
import Ring from "./ToolsImages/ring.svg";
import Tshirt from "./ToolsImages/tshirt.svg";
import Suit from "./ToolsImages/suit.svg";
import Marker from "./ToolsImages/marker.svg";
import Modal from "@material-ui/core/Modal";
import Cut from "./ToolsImages/cut.svg";
import {
  cutProfileScreen,
  updateCatchmentData,
  showComparison,
  updateCheckedData,
  showOthers,
  showCatchment,
  updateRadiusData,
  clearRadiusData,
  showControl,
  panel2,
  disableCatchment,
  enableCatchment,
  showPoiNotification,
  hideControl,
} from "../../actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ToolsScreen = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const data = [
    {
      text: "clothing",
      img: Tshirt,
    },
    {
      text: "jewellery ",
      img: Ring,
    },
    {
      text: "shoe stores",
      img: Shoes,
    },
    {
      text: "tailors ",
      img: Suit,
    },
    {
      text: "Kitchen ",
      img: Kitchen,
    },
    {
      text: "Hardware ",
      img: Drill,
    },
  ];

  const myState = useSelector((state) => state.toolsHanlder.data);
  const toolScreenData = useSelector((state) => state.catchmentData.data);


  const type = toolScreenData.type;

  // here we are adding function which will handle input ;
  const [showInput, setShowInput] = useState(false);
  const [distance, setDistance] = useState(0);
  const [dist, setDist] = useState("500 m");

  const [based, setBased] = useState(type);

  const api = useSelector((state) => state.apiStore.url);
  const choosedLanguage = i18n.language;
  const Token = useSelector((state) => state.authenication.token);
  const map = useMap();
  const [poiSelectedItems , setPoiSelectedItems] = useState([])
  const [loading, setLoading] = useState(false);

  // here we are going to get all the selected poi's ;

  useEffect(() =>{  
    const url = `${api}poi-data`;
    axios.get(url , { headers: {
      Authorization: `Bearer ${Token}`,
      Accept: "application/json",
      "X-localization": choosedLanguage,
    }})
    .then((res) =>{
      if(res.data.success){
        const val = res.data.poi[0];
        setPoiSelectedItems(val)
      }
     
    })

  },[choosedLanguage]);

  const updateDistance = (e) => {
    const val = e.target.value;

    setDistance(e.target.value);
    if (val <= 10) {
      setDistance(0);
      setDist("500 m");
      const dta = {
        type: based,
        dist: 500,
      };
      dispatch(updateCatchmentData(dta));
    } else if (val > 10 && val <= 30) {
      setDistance(20);
      setDist("1 km");
      const dta = {
        type: based,
        dist: 1000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (val > 30 && val <= 50) {
      setDistance(40);
      setDist("2 km");
      const dta = {
        type: based,
        dist: 2000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (val > 50 && val <= 70) {
      setDistance(60);
      setDist("3 Km");
      const dta = {
        type: based,
        dist: 3000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (val > 70 && val <= 90) {
      setDistance(80);
      setDist("4 Km");
      const dta = {
        type: based,
        dist: 4000,
      };
      dispatch(updateCatchmentData(dta));
    }
     else if (val > 90) {
      setDistance(100);
      setDist("5 Km");
      const dta = {
        type: based,
        dist: 5000,
      };
      dispatch(updateCatchmentData(dta));
    }
  };

  const changeBased = (e) => {
    setBased(e.target.value);
    if (distance == 0) {
      const dta = {
        type: e.target.value,
        dist: 500,
      };
      dispatch(updateCatchmentData(dta));
    } else if (distance == 20) {
      const dta = {
        type: e.target.value,
        dist: 1000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (distance == 40) {
      const dta = {
        type: e.target.value,
        dist: 2000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (distance == 60) {
      const dta = {
        type: e.target.value,
        dist: 3000,
      };
      dispatch(updateCatchmentData(dta));
    } else if (distance == 80) {
      const dta = {
        type: e.target.value,
        dist: 4000,
      };
      dispatch(updateCatchmentData(dta));
    }
     else if (distance == 100) {
      const dta = {
        type: e.target.value,
        dist: 5000,
      };
      dispatch(updateCatchmentData(dta));
    }
  };
  
  const radiusData = useSelector((state) => state.catchmentData.radiusDta);
 
  // here we are writing the function for the radius ;
  const [radiusValue, setRadiusValue] = useState(radiusData.checked);
  const [radiusDistance, setRadiusDistance] = useState(0);
  const [radiusDist, setRadiusDist] = useState("50 m");

  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );

  const checkRadius = () => {

    if(poiCheckedData.length == 0 && servicesCheckedData.length == 0){
      dispatch(showPoiNotification());
    }
    else {
    if (!radiusValue) {
      setRadiusValue(true);
      if (radiusDistance == 0) {
        const dta = {
          checked: true,
          dist: 50,
        };
        dispatch(updateRadiusData(dta));
      } else if (radiusDistance == 20) {
        const dta = {
          checked: true,
          dist: 100,
        };
        dispatch(updateRadiusData(dta));
      } else if (radiusDistance == 40) {
        const dta = {
          checked: true,
          dist: 200,
        };
        dispatch(updateRadiusData(dta));
      } else if (radiusDistance == 60) {
        const dta = {
          checked: true,
          dist: 300,
        };
        dispatch(updateRadiusData(dta));
      } else if (radiusDistance == 80) {
        const dta = {
          checked: true,
          dist: 500,
        };
        dispatch(updateRadiusData(dta));
      } else if (radiusDistance == 100) {
        const dta = {
          checked: true,
          dist: 1000,
        };
        dispatch(updateRadiusData(dta));
      }
    } else if (radiusValue) {
      setRadiusValue(false);
      dispatch(clearRadiusData());
    }
  }
  };

  const updateRadiusDistance = (e) => {
    const val = e.target.value;

    setDistance(e.target.value);
    if (val <= 10) {
      setRadiusDistance(0);
      setRadiusDist("50 m");
      const dta = {
        checked: radiusValue,
        dist: 50,
      };
      dispatch(updateRadiusData(dta));
    } else if (val > 10 && val <= 30) {
      setRadiusDistance(20);
      setRadiusDist("100 m");
      const dta = {
        checked: radiusValue,
        dist: 100,
      };
      dispatch(updateRadiusData(dta));
    } else if (val > 30 && val <= 50) {
      setRadiusDistance(40);
      setRadiusDist("200 m");
      const dta = {
        checked: radiusValue,
        dist: 200,
      };
      dispatch(updateRadiusData(dta));
    } else if (val > 50 && val <= 70) {
      setRadiusDistance(60);
      setRadiusDist("300 m");
      const dta = {
        checked: radiusValue,
        dist: 300,
      };
      dispatch(updateRadiusData(dta));
    } else if (val > 70 && val <= 90) {
      setRadiusDistance(80);
      setRadiusDist("500 m");
      const dta = {
        checked: radiusValue,
        dist: 500,
      };
      dispatch(updateRadiusData(dta));
    } else if (val <= 100) {
      setRadiusDistance(100);
      setRadiusDist("1 km");
      const dta = {
        checked: radiusValue,
        dist: 1000,
      };
      dispatch(updateRadiusData(dta));
    }
  };


  const openPoiScreen = () => {
    dispatch(showControl());
    dispatch(panel2());
  };


  // here we are writing the function which will automatically update all the data ;

  useEffect(() =>{
    const radd = toolScreenData.dist;
    if(radd === 500){
      setDist("500 m")
      setDistance(0)
    }
    else if(radd === 1000){
      setDist("1 km")
      setDistance(20)
    }
    else if(radd === 2000){
      setDist("2 km")
      setDistance(40)
    }
    else if(radd === 3000){
      setDist("3 Km")
      setDistance(60)
    }
    else if(radd === 4000){
      setDist("4 Km")
      setDistance(80)
    }
    else if(radd === 5000){
      setDist("5 Km")
      setDistance(100)
    }
  },[])

  
  // here we are getting the data from the store ;
  const catchmentState = useSelector((state) => state.catchmentData.startCatchment);
  const changeCatchmentState = () =>{
    if(catchmentState){
      dispatch(disableCatchment())
    }
    else if(!catchmentState){
      dispatch(enableCatchment())
    }
  }

  // const dropMarker = () =>{
  //   if (map._controlContainer.childNodes[1].childNodes[0]) {
  //     map._controlContainer.childNodes[1].childNodes[0].childNodes[0].hidden = false;
  //   }
  // }

  return (
    <>
      <Modal
        open={true}
        className="bg-toolscreen"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="toolscreen">
          <div className="toolscreen_heading">
            <img src={Tools} alt="tools icon" />
            <h6>{t("Tools")}</h6>
          </div>
          <div className="tool_main">
          <div className="toolscreen_row1">
            <div
              className="toolscreen_row1_box"
              onClick={() => dispatch(showCatchment())}
            >
              <img
                src={Catchment}
                alt="catchment icon"
                style={{ width: "27px", marginBottom: "6px" }}
              />
              <h6
                style={{
                  color: myState === "Catchment" ? "var(--blue)" : "black",
                }}
              >
                {t("Catchment")}
              </h6>
            </div>
            <div
              className="toolscreen_row1_box"
              onClick={() => dispatch(showOthers())}
            >
              <img
                src={Clipboard}
                alt="Clipboard icon"
                style={{ width: "23px", marginBottom: "8.5px" }}
              />
              <h6
                style={{
                  color: myState === "Others" ? "var(--blue)" : "black",
                }}
              >
                {t("Others")}
              </h6>
            </div>
            <div
              className="toolscreen_row1_box"
              onClick={() => dispatch(showComparison())}
            >
              <img
                src={Comparison}
                alt="Comparison icon"
                style={{ width: "24px", marginBottom: "9.8px" }}
              />
              <h6>{t("Comparison")}</h6>
            </div>
          </div>

          {myState === "Catchment" && (
            <div className="">
              <div className="toolscreen_row2">
                <div className="tool_box">
                <input type="checkbox" id="start_catchment" checked={catchmentState} onChange={changeCatchmentState}/>

                <label htmlFor="start_catchment"><h6>{t("Start Catchment")}</h6></label>
                </div>
                
                <div className="toolscreen_row2_input">
                  <div className="toolscreen_row2_radio">
                    <input
                      type="radio"
                      id="road"
                      name="catchment"
                      checked={based == "Road" ? true : false}
                      value="Road"
                      onChange={changeBased}
                    />
                    <label htmlFor="road">{t("Road Based")}</label>
                  </div>
                  <div className="toolscreen_row2_radio">
                    <input
                      type="radio"
                      id="radius"
                      name="catchment"
                      checked={based == "Radius" ? true : false}
                      value="Radius"
                      onChange={changeBased}
                    />
                    <label htmlFor="radius">{t("Radius Based")}</label>
                  </div>
                </div>
              </div>

              <div className="toolscreen_row3">
                <h6>{t("Start Catchment")}</h6>
                <span>{dist}</span>
              </div>
              <input
                type="range"
                className="toolscreen_input"
                value={distance}
                min={0}
                max={100}
                onChange={(e) => updateDistance(e)}
              />
              <div className="toolscreen_input">
                <span>500 {t("m")}</span>
                <span>1 {t("Km")}</span>
                <span>2 {t("Km")}</span>
                <span>3 {t("Km")}</span>
                <span>4 {t("Km")}</span>
                <span>5 {t("Km")}</span>
              </div>
            </div>
          )}

          {/* here we are adding the radius catchment selection part ; */}

          {myState === "Others" && (
            <div className="">
              <div className="toolscreen_row2">
                <h6>{t("Start Catchment Size")}</h6>
                <div className="toolscreen_row2_input">
                  <div className="toolscreen_row2_radio">
                    <input
                      type="checkbox"
                      id="road"
                      name="catchment"
                      value="Road"
                      checked={radiusValue}
                      onChange={checkRadius}
                      style={{ width: "16px", height: "16px" }}
                    />
                    <label htmlFor="road" style={{ fontSize: "18px" }}>
                      {t("Radius")}
                    </label>
                  </div>
                </div>
              </div>

              <div className="toolscreen_row3" style={{ marginTop: "-10px" }}>
                <h6>{t("Select Radius")}</h6>
                <span>{radiusDist}</span>
              </div>
              <input
                type="range"
                className="toolscreen_input"
                value={radiusDistance}
                min={0}
                max={100}
                onChange={(e) => updateRadiusDistance(e)}
              />
              <div className="toolscreen_input">
                <span>50 {t("m")}</span>
                <span>100 {t("m")}</span>
                <span>200 {t("m")}</span>
                <span>300 {t("m")}</span>
                <span>500 {t("m")}</span>
                <span>1 {t("Km")}</span>
              </div>
            </div>
          )}

          <div className="toolscreen_row4">
            <h5>{t("Selected POI")}</h5>
            <div className="toolscreen_row4_right">
              {showInput ? <input type="text" /> : null}
              {/* <img
                src={Search}
                alt="search icon"
                onClick={() => setShowInput(!showInput)}
              /> */}
              <span onClick={openPoiScreen}>{t("More POI")}</span>
            </div>
          </div>

          <div className="toolscreen_scrollable">
            {poiSelectedItems && poiSelectedItems.map((item, index) => {
              return (
                <>
                  <div className="toolscreen_scrollable_box" key={index}>
                    <label htmlFor={item.name}>
                      <img src={item.fullimage} alt="icons" />
                    </label>
                    <span style={{ textAlign: "center" }}>{item.name}</span>
                  </div>
                </>
              );
            })}
          </div>

          <div className="toolscreen_btn" >
            <img src={Marker} alt="marker icon" style={{ width: "25px" }} />
            <span>{t("Drop A Marker on Map")}</span>
          </div>

          {/* adding cut button here ; */}
          <div
            className="toolscreen_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default ToolsScreen;
