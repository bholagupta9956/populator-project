// here we are going to create point of interest component which will be places the graphs;

import React, { useEffect, useState } from "react";
import Grocery from "./PoiImages/grocery.svg";
import SelfService from "./PoiImages/selfservice.svg";
import Medical from "./PoiImages/medical.svg";
import HeartBeat from "./PoiImages/heartbeat.svg";
import Hospital from "./PoiImages/hospital.svg";
import Mall from "./PoiImages/mall.svg";
import Money from "./PoiImages/money.svg";
import Pharmacy from "./PoiImages/pharmacy.svg";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../utils/Loader";
import Notification from "../../../../utils/Notification";
import "./Poi.css";
import PoiDetails from "./PoiDetails";
import axios from "axios";
import { showNotification } from "../../../../actions";
import { useTranslation } from "react-i18next";
import { textFieldClasses } from "@mui/material";
import PoisGraph from "./PoisGraph";

const PointOfInterest = () => {
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const ResultData = useSelector((state) => state.updateShapeData.rawData);
  
  
  const myState = useSelector((state) => state.poiHandler.show);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const urlLink = `${api}poi`;
  const [poiData, setPoiData] = useState([]);
  const choosedLanguage = i18n.language;
  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );

  useEffect(() => {
    const shape = ResultData.shape;
    setLoading(true);

    if (shape === "circle") {
       
      const lat = ResultData.coords.center.lat;
      const lng = ResultData.coords.center.lng;
      const radius = ResultData.coords.radius;

      const data = {
        lat: lng,
        radius: radius,
        lng: lat,
        type: shape,
        poi: poiCheckedData,
      };

      fetch(urlLink, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${Token}`,
          "X-localization" : choosedLanguage
        },
      })
        .then((res) => res.json())
        .then((orgData) => {
          setLoading(false)
          if (orgData) {
            setLoading(false);
          }
          const value = orgData.poi;
          if (value) {
            setPoiData([value]);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (shape === "polygon" || "rectangle") {
      let latlngs = "";
      const shapeData1 = ResultData.coords.coord;
      const shapeData = [...shapeData1, shapeData1[0]];
      for (let i = 0; i < shapeData.length; i++) {
        latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
      }

      latlngs = latlngs.replace(/,$/, "");

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      };

      const Data = { latlng: latlngs, type: "polygon", poi: poiCheckedData };

      fetch(urlLink, {
        method: "POST",
        body: JSON.stringify(Data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${Token}`,
          "X-localization" : choosedLanguage,
        },
      })
        .then((res) => res.json())
        .then((orgData) => {
         
          if (orgData) {
            setLoading(false);
          }
          const value = orgData.poi;
          if (value) {
            setPoiData([value]);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div className="pois">
        {poiData.length > 0 &&
          poiData.map((item, index) => {
            
            return Object.entries(item).map((key, index) => {
              
              return (
                <div key={index}>
                  <h5 className="pois_headings">{key[0]}</h5>
                  <div className="pois_first_row">
          
                        <div className="pois_first_row_box" key={index}>
                          <div className="pois_first_row_box_img">
                            <img
                              src={key[1].image}
                              alt="cash icon"
                              width="65px"
                            />
                            <small>{key[1].count}</small>
                          </div>
                          <span>{key[1].name}</span>
                        </div>
                      
                  </div>
                </div>
              );
            });
          })}

        {poiData[0] && poiData[0].length === 0 && (
          <div>
            <h5>{t("Sorry, No data available !")}</h5>
          </div>
        )}
        <PoisGraph poiData={poiData}/>

        {loading && <Loader />}

        <PoiDetails />
      </div>
    </>
  );
};

// exporting the file ;
export default PointOfInterest;
