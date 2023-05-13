// In this file we are going to get the poiDetails ;

import React, { useState, useEffect, cloneElement, useRef } from "react";
import { useMap, Marker, Tooltip } from "react-leaflet";
import pptxgen from "pptxgenjs";
import L, { latLng } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Export from "../../ResultImages/export.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  closeResultPanel,
  showNotification,
  updatePoiMarkerData,
} from "../../../../actions";
import DistanceCalculator from "distance-calculator-js";
import Navigate from "../../ResultImages/navigate.svg";
import axios from "axios";
import jsPDF from "jspdf";
import Rough from "./Rough";
import PointOfInterest from "./PointOfInterest";

import { useTranslation } from "react-i18next";
import { fontSize } from "@mui/system";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const PoiDetails = () => {
  const dispatch = useDispatch();
  const map = useMap();
  const zoom = map._zoom;
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);

  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );

  const [poiDetails, setPoiDetails] = useState([]);

  const [distance, setDistance] = useState([]);

  // here we are going to get the user location ;
  const { t, i18n } = useTranslation();

  const [markerLocation, setMarkerLocation] = useState([21.4858, 39.1925]);
  const ResultData = useSelector((state) => state.updateShapeData.rawData);
  const [loading, setLoading] = useState(false);

 
  //   here we are writing the function which will directly navigate to the map ;
  const navigateToMap = (crds, ind) => {
    dispatch(closeResultPanel());
    const center = { lat: crds.lat, lng: crds.long };
    map.flyTo(center, zoom);
    const dat = poiDetails[ind];
    const data = {
      center: center,
      val: dat,
    };
    dispatch(updatePoiMarkerData(data));
  };

  const choosedlanguage = i18n.language;

  //  here we are using the poiDetails ;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lats = position.coords.latitude;
        const lngs = position.coords.longitude;

        const shape = ResultData.shape;
        setLoading(true);
        const urlLink = `${api}poi-details-data`;

        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
          "X-localization" : choosedlanguage
        };

        if (shape === "circle") {
          // console.log("you have created a circle");

          const lat = ResultData.coords.center.lat;
          const lng = ResultData.coords.center.lng;
          const radius = ResultData.coords.radius;

          const data = {
            lat: lng,
            radius: radius,
            lng: lat,
            type: shape,
            poi: poiCheckedData,
            userLat: lats,
            userLng: lngs,
          };

          console.log(data, "this is the data");

          axios
            .post(urlLink, data, { headers: headers })
            .then((res) => {
              console.log(res);
              const val = res.data.poi_details;
              setPoiDetails(val);
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
            "X-localization" : choosedlanguage
          };

          const Data = {
            latlng: latlngs,
            type: "polygon",
            poi: poiCheckedData,
            userLat: lats,
            userLng: lngs,
          };

          axios
            .post(urlLink, Data, { headers: headers })
            .then((res) => {
              const val = res.data.poi_details;
              // console.log(res);
             setPoiDetails(val);
            })
            .catch((err) => {
              setLoading(false);
            });
        }
      });
    }
  }, []);

  
  const ref = useRef(null);
  //  here we are adding the export details ;
  const exportDetails = () => {};

  const myState = useSelector((state) => state.poiHandler.poiDetails);

  return (
    <>
      {myState && (
        <div className="poiDetails">
          <div className="poi_details_heading">
            <h4>{t("POI Details")}</h4>
            <div className="dataresult_header_export"   onClick={exportDetails} style={{visibility : "hidden"}}>
              <img src={Export} alt="export icon" />
              <span>{t("Export")}</span>
            </div>
          </div>
          <div className="poiDetails_data">
            <div style={{ width: "100%" }}>
              <Rough value={poiDetails} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// exporting the component ;
export default PoiDetails;
