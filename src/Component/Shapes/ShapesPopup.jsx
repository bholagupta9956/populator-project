// This is the shapes popup file ;
import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { useMap } from "react-leaflet";
import Play from "../mainimages/play.svg";
import { featureGroup } from "leaflet";
import Save from "../mainimages/save.svg";
import Share from "../mainimages/share.svg";
import SweetAlert from "react-bootstrap-sweetalert";
import Remove from "../mainimages/bluecut.svg";
import {
  disableCluster,
  disableHeatmap,
  enableCluster,
  enableHeatmap,
  getShapeData,
  hideCluster,
  hideHeatMap,
  showCluster,
  openResultPanel,
  cuttedPoints,
  showHeatMap,
  showNotification,
  showPoiNotification,
  showPointsNotification,
  showShareLink,
  updateShapesName,
  showPoi,
  enablePoiLayers,
  refreshHeatmapCluster,
  updatePoiLayersValue,
  updateClusterValue,
  udpateHeatmapValue,
} from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showLoginPopup } from "../../actions/index";
import "./shapes.css";
import { GetPoiData } from "../buildInFunctions/function";
import leafletCompassMin from "leaflet-compass/dist/leaflet-compass.min";

// import { borderRightWidth } from "html2canvas/dist/types/css/property-descriptors/border-width";
// import { BASE_OPTS_SUBTITLE } from "../Result/Graphs/Pptx/enums.mjs";

// here we are creating a component which will suggest the user to select poi's if the poi is not selected;


const ShapesPopup = forwardRef((props, ref) => {
  const { getPoi, poiRef } = props;

  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const dispatch = useDispatch();
  const map = useMap();
  const mapCenter = map.getCenter();

  const totalcuttedPoints = useSelector(
    (state) => state.selectedFeaturesRecord.totalCuttedPoints
  );

  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );
  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );

  const selectedCategoryArray = useSelector(
    (state) => state.selectedFeaturesRecord.data
  );

  const shapesNames = useSelector((state) => state.shapesName.name);

  const openResultPanels = () => {
    const shapeData = {
      shape: props.shape,
      coords: props.coords,
      center: mapCenter,
    };
    dispatch(getShapeData(shapeData));

    if (Token) {
      if (servicesCheckedData.length > 0) {
        if (shapesNames.indexOf(props.name) != -1) {
          const filterData = shapesNames.filter((itm) => itm != props.name);
          dispatch(updateShapesName(filterData));
          dispatch(showPointsNotification(totalcuttedPoints));
        } else if (shapesNames.indexOf(props.name) == -1) {
          // dispatch(cuttedPoints(0));
          dispatch(openResultPanel());
        }
      } else if (servicesCheckedData.length === 0) {
        dispatch(showPoiNotification());
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  // here we are getting the state of clusters heatmap and others ;

  const poiLayerState = useSelector((state) => state.poiLayersHandlers.show);
  const clusterState = useSelector((state) => state.clustersHanlders.show);

  const poiLayersValue = useSelector((state) => state.poiLayersHandlers.value);
  const clusterValue = useSelector((state) => state.clustersHanlders.value)
  const heatmapValue = useSelector((state) => state.heatMapHandler.value)
  

  const handlePoi = async () => {
    if (poiCheckedData.length > 0) {
      dispatch(enablePoiLayers());
      dispatch(enableCluster());
      dispatch(enableHeatmap());
      const val = Math.round(Math.random() * 1000);
      dispatch(refreshHeatmapCluster(val));
      dispatch(updatePoiLayersValue(poiLayersValue + 5));
      dispatch(updateClusterValue(clusterValue + 5));
      dispatch(udpateHeatmapValue(heatmapValue + 5));
    } else {
      dispatch(showPoiNotification());
    }
  };

  return (
    <>
      <div className="result_popup">
        <li onClick={openResultPanels}>
          <img
            src={Play}
            alt="play icon"
            width="23px"
            style={{
              marginTop: "2px",
            }}
          />
          <span>{t("Scan Selected Area")}</span>
        </li>
        <li onClick={handlePoi}>
          <img
            src={Play}
            alt="play icon"
            width="23px"
            style={{
              marginTop: "2px",
            }}
          />
          <span>{t("Get POI")}</span>
        </li>
        <li onClick={props.saveSelectedShape}>
          <img
            src={Save}
            alt="save icon"
            width="13px"
            style={{ margin: "0px 5.6px" }}
          />
          <span>{t("Save")}</span>
        </li>
        <li onClick={props.shareLink}>
          <img
            src={Share}
            alt="save icon"
            width="13px"
            style={{ margin: "0px 5.6px" }}
          />
          <span>{t("Share")} </span>
        </li>
        <li onClick={props.removeShapes}>
          <img
            src={Remove}
            alt="remove icon"
            width="27px"
            style={{ marginLeft: "-1px", marginTop: "2px" }}
          />
          <span>{t("Remove")}</span>
        </li>
      </div>
    </>
  );
});

export default ShapesPopup;
