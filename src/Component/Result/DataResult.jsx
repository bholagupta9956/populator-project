// In this component we will show data results in panel;
import React, { useEffect, useState, createRef } from "react";
import Menu from "./ResultImages/menuicon.svg";
import Marker from "./ResultImages/marker.svg";
import Save from "./ResultImages/save.svg";
import Tools from "./ResultImages/tools.svg";
import MarkerWhite from "./ResultImages/markerwhite.svg";
import Graphs from "./Graphs/Graphs";
import PointOfInterest from "./Graphs/Poi's/PointOfInterest";
import "./Result.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  closeResultPanel,
  getShapeData,
  showNotification,
  updateResultScreenData,
  updateWalletData,
} from "../../actions";
import Loader from "../../utils/Loader";


const DataResult = () => {

  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.authenication.token);
  const ResultData = useSelector((state) => state.updateShapeData.rawData);
  const walletPoints = useSelector((state) => state.walletData.points);
  const [loading, setLoading] = useState(false);
  const cuttedPoints = useSelector(
    (state) => state.selectedFeaturesRecord.totalCuttedPoints
  );
  const selectedCategoryArray = useSelector(
    (state) => state.selectedFeaturesRecord.data
  );
  const remainingPoints = walletPoints - cuttedPoints;
  console.log("dataResult panel");

  const [icons, setIcons] = useState({
    saveIcon: Save,
    toolsIcon: Tools,
    menuIcon: Menu,
    poiIcon: { icon: Marker, background: "white", color: "var(--blue)" },
  });

  // here we are getting the date ;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  // here we are defining the function which will get result data from  the database ;

  useEffect(() => {
    const shape = ResultData.shape;
    const urlLink = `${api}get-scan-result`;

    if (shape === "circle") {
      setLoading(true);
      const lat = ResultData.coords.center.lat;
      const lng = ResultData.coords.center.lng;
      const radius = ResultData.coords.radius;

      const data = {
        lat: lng,
        radius: radius,
        lng: lat,
        type: shape,
        total_points_deducted: cuttedPoints,
        services: selectedCategoryArray,
        date: today,
      };

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      };

      axios
        .post(urlLink, data, { headers: headers })
        .then((res) => {
          setLoading(false);
         
          if (res.data.success === true) {
            dispatch(updateResultScreenData(res.data));
            dispatch(updateWalletData(remainingPoints));
          } else if (res.data.success === false) {
            setLoading(false)
            dispatch(closeResultPanel())
            dispatch(showNotification("No data available for the selected region"))
          }
          else if(res.data.message === "Insufficient funds"){
            setLoading(false)
            dispatch(closeResultPanel())
            dispatch(showNotification("Insufficient points please refill"))
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (shape === "polygon") {
      setLoading(true);
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

      const Data = {
        latlng: latlngs,
        total_points_deducted: cuttedPoints,
        services: selectedCategoryArray,
        date: today,
      };

      axios
        .post(urlLink, Data, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            dispatch(updateResultScreenData(res.data));
            dispatch(updateWalletData(remainingPoints));
          } else if (res.data.success === false) {
            dispatch(closeResultPanel())
            dispatch(showNotification("No data available for the selected region"))
            setLoading(false);
          }
          else if(res.data.message === "Insufficient funds"){
            setLoading(false)
            dispatch(closeResultPanel())
            dispatch(showNotification("Insufficient points please refill"))
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else if (shape === "rectangle") {
      
      setLoading(true);
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

      const Data = {
        latlng: latlngs,
        total_points_deducted: cuttedPoints,
        services: selectedCategoryArray,
        date: today,
      };

      axios
        .post(urlLink, Data, { headers: headers })
        .then((res) => {
          setLoading(false);
          console.log(res , "rectangle response whi")
          if (res.data.success === true) {
            dispatch(updateResultScreenData(res.data));
            dispatch(updateWalletData(remainingPoints));
          } else if (res.data.success === false) {
            setLoading(false);
            dispatch(closeResultPanel())
            dispatch(showNotification("No data available for the selected region"))
          }
          else if(res.data.message === "Insufficient funds"){
            setLoading(false)
            dispatch(closeResultPanel())
            dispatch(showNotification("Insufficient points please refill"))
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [ResultData]);

  return (
    <>
      <Graphs />
      {loading && <Loader />}
    </>
  );
}

// exporting the file ;
export default DataResult;
