// This is the 3rd panel of the control part here we will create how panel ;

import React, { useEffect, useState } from "react";
import Heatmap from "./ControlImages/heatmap.svg";
import Clusters from "./ControlImages/clusters.svg";
import Visuals from "./ControlImages/visuals.svg";
import Poilayers from "./ControlImages/poilayers.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import {
  panel2,
  panel1,
  hideControl,
  showCluster,
  hideCluster,
  showHeatMap,
  hideHeatMap,
  disableCluster,
  disableHeatmap,
  showPoi,
  hidePoi,
  showWithInShape,
  showWithInBoundary,
  showPoiLayers,
  hidePoiLayers,
  enableCluster,
  enableHeatmap,
  enablePoiLayers,
  disablePoiLayers,
} from "../../actions";

import "./ControlPanel.css";

const Panel3 = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const clusterState = useSelector((state) => state.clustersHanlders.show);
  const heatMapState = useSelector((state) => state.heatMapHandler.show);
  const poiLayerState = useSelector((state) => state.poiLayersHandlers.show);

  const api = useSelector((state) => state.apiStore.url);

  const cluster = (e) => {
    if (!clusterState) {
      dispatch(showCluster());
      dispatch(enableCluster());
    } else if (clusterState) {
      dispatch(hideCluster());
      dispatch(disableCluster());
    }
  };

  const heatMap = () => {
    if (!heatMapState) {
      dispatch(showHeatMap());
      dispatch(enableHeatmap());
    } else if (heatMapState) {
      dispatch(hideHeatMap());
      dispatch(disableHeatmap());
    }
  };

  const poi = () => {
    if (!poiLayerState) {
      dispatch(showPoiLayers());
      dispatch(enablePoiLayers());
    } else if (poiLayerState) {
      dispatch(hidePoiLayers());
      dispatch(disablePoiLayers());
    }
  };

  const withInBoundary = useSelector((state) => state.panel3.withInBoundary);
  const withInShape = useSelector((state) => state.panel3.withInShape);

  const [switchOn, setSwitchOn] = useState(false);

  const handleSwitch = () => {
    dispatch(hideCluster());
    dispatch(hideHeatMap());
    dispatch(hidePoiLayers());
    dispatch(disablePoiLayers());
    dispatch(disableCluster());
    dispatch(disableHeatmap());

    if (!switchOn) {
      dispatch(showWithInShape());
      setSwitchOn(true);
      if (clusterState) {
        dispatch(showCluster());
        dispatch(enableCluster())
      }
      if (heatMapState) {
        dispatch(showHeatMap());
        dispatch(enableHeatmap());
      }
      if (poiLayerState) {
        dispatch(showPoiLayers());
        dispatch(enablePoiLayers());
      }
    } else if (switchOn) {
      dispatch(showWithInBoundary());
      setSwitchOn(false);
      if (clusterState) {
        dispatch(showCluster());
        dispatch(enableCluster());
      }
      if (heatMapState) {
        dispatch(showHeatMap());
        dispatch(enableHeatmap());
      }
      if (poiLayerState) {
        dispatch(showPoiLayers());
        dispatch(enablePoiLayers());
      }
    }
  };

  useEffect(() => {
    if (withInBoundary) {
      setSwitchOn(false);
    } else if (!withInBoundary) {
      setSwitchOn(true);
    }
  }, []);

  return (
    <>
      <div className="panel3">
        <div className="control_items">
          <div className="panel_row1">
            <h5 style={{ color: "var(--black)" }}>
              {" "}
              {t("Finding opportunities in as easy as 1-2-3")}
            </h5>
            <span>{t("Let's Explore")}</span>
          </div>
          <div className="panel_row2 ">
            <div className="panel_row2_col1" onClick={() => dispatch(panel1())}>
              <input type="text" value="1" name="1" readOnly={true} />
              <h6>{t("WHERE")}</h6>
            </div>
            <div className="panel_row2_col2" onClick={() => dispatch(panel2())}>
              <input
                type="text"
                value="2"
                name="2"
                readOnly={true}
                style={{
                  background: "var(--blue)",
                  color: "white",
                  border: "none",
                }}
              />
              <h6 style={{ color: "var(--blue)" }}>{t("WHAT")}</h6>
            </div>
            <div className="panel_row2_col3">
              <input
                type="text"
                value="3"
                name="3"
                readOnly={true}
                style={{
                  background: "var(--blue)",
                  color: "white",
                  border: "none",
                }}
              />
              <h6 style={{ color: "var(--blue)" }}>{t("HOW")}</h6>
            </div>
          </div>
        </div>
        <div className="panel3_heading">
          <h5>{t("What type of result you can see")}</h5>
        </div>

        {/* here we are adding the switch  */}

        <div className="switch">
          <h4>{t("Within Boundary")}</h4>
          <Switch
            checked={switchOn}
            onChange={handleSwitch}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
          <h4>{t("Within Shapes")}</h4>
        </div>

        <div className="panel3_row1">
          <div className="panel3_row1_col1">
            <label htmlFor="heatmap">
              <input
                type="checkbox"
                id="heatmap"
                onChange={heatMap}
                value={clusterState}
                checked={heatMapState}
              />
              <img src={Heatmap} alt="heatmap icon" />
            </label>
            <h6>{t("HEATMAP")}</h6>
          </div>
          <div className="panel3_row1_col1">
            <label htmlFor="clusters">
              <input
                type="checkbox"
                id="clusters"
                checked={clusterState}
                onChange={cluster}
                value={clusterState}
              />
              <img src={Clusters} alt="clustors icon" />
            </label>
            <h6>{t("CLUSTERS")}</h6>
          </div>
          <div className="panel3_row1_col1" style={{ display: "none" }}>
            <label htmlFor="paint">
              <img src={Visuals} alt="3d visual icon" />
            </label>
            <h6>{t("3D VISUALS")}</h6>
          </div>
          <div className="panel3_row1_col1">
            <label htmlFor="poi">
              <input
                type="checkbox"
                id="poi"
                checked={poiLayerState}
                onChange={poi}
                value={poiLayerState}
              />
              <img
                src={Poilayers}
                alt="POI layers icon"
                style={{ width: "35px" }}
              />
            </label>
            <h6>{t("POI LAYERS")}</h6>
          </div>
        </div>
        <div className="control_btn">
          <button onClick={() => dispatch(panel2())}>{t("Back")}</button>
          <button onClick={() => dispatch(hideControl(0))}>{t("Next")}</button>
        </div>
      </div>
    </>
  );
};

// exporting the 3rd panel
export default Panel3;
