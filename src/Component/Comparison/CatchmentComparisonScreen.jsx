// This is the catchment Comparison screen where we will show you all the catchment ;

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Rectangle,
  useMap,
  Polyline,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import Cut from "../ControlPanel/ControlImages/cut.svg";
import {
  cutProfileScreen,
  showCatchmentComparisonDetails,
  showNotification,
} from "../../actions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import BackArrow from "./image/backArrow.png";
import Loader from "../../utils/Loader";
import "./comparison.css";

const CatchmentComparisonScreen = (props) => {
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const [loading, setLoading] = useState(false);
  const [shapesData, setShapesData] = useState([]);
  const map = useMap();
  const { selectedShape, setSelectedShape } = props;

  const zoom = map._zoom;
  const { t, i18n } = useTranslation();

  const [shapeId, setShapeId] = useState([]);

  const selectShape = (e, itm, index) => {
    if (selectedShape.some((item) => item.unique_id === itm.unique_id)) {
      const filterData = selectedShape.filter(
        (item, index) => item.unique_id !== itm.unique_id
      );
      setSelectedShape(filterData);
    } else {
      setSelectedShape((item) => [...item, itm]);
    }
  };

  const urlLin = `${api}catchment-shape-get`;

  const alreadySelectedShapes = useSelector(
    (state) => state.comparison.catchmentShapeDetails
  );

  useEffect(() => {

    setLoading(true);
    setShapeId(alreadySelectedShapes);
    const url = `${api}get-catchment-group`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          const val = res.data.groups;
          for (var i = 0; i < val.length; i++) {
            axios
              .post(
                urlLin,
                { group: val[i] },
                {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                    Accept: "application/json",
                  },
                }
              )
              .then((res) => {
               
                setLoading(false);
                if (res.data.success) {
                  const anotherVal = res.data.data;

                  for (var l = 0; l < anotherVal.length; l++) {
                    const actualVal = anotherVal[l];

                    if (actualVal.type === "radius") {
                      const center = [actualVal.lat, actualVal.lng];
                      const radiusVal = actualVal.radius / 5;
                      const lineCoord = JSON.parse(actualVal.coord);

                      const circleVal = [
                        { rad: radiusVal, color: "purple", center: center },
                        { rad: radiusVal * 2, color: "green", center: center },
                        {
                          rad: radiusVal * 3,
                          color: "rgb(0,161,228)",
                          center: center,
                        },
                        { rad: radiusVal * 4, color: "orange", center: center },
                        { rad: radiusVal * 5, color: "red", center: center },
                      ];

                      const data = {
                        name: actualVal.name,
                        date: actualVal.date,
                        circleVal: circleVal,
                        type: "radius",
                        radius: actualVal.radius,
                        group: actualVal.cGroup,
                        center: center,
                        unique_id: actualVal.unique_id,
                        lineCoord: lineCoord,
                        saved: actualVal.saved,
                      };

                      setShapesData((item) => {
                        return [...item, data];
                      });
                    } else if (actualVal.type === "road") {
                      const center = [actualVal.lat, actualVal.lng];
                      const lineCoord = JSON.parse(actualVal.coord);
                      const coord = JSON.parse(actualVal.latlng);

                      const data = {
                        name: actualVal.name,
                        date: actualVal.date,
                        type: "road",
                        radius: actualVal.radius,
                        group: actualVal.cGroup,
                        center: center,
                        coord: coord,
                        unique_id: actualVal.unique_id,
                        lineCoord: lineCoord,
                        saved: actualVal.saved,
                      };

                      setShapesData((item) => {
                        return [...item, data];
                      });
                    }
                  }
                }
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="comparison">
        <div className="comparison_body">
          {shapesData &&
            shapesData.map((item, index) => {
              return (
                <>
                  <div className="comparison_main_box" key={index}>
                    <MapContainer
                      center={item.center}
                      zoom={zoom}
                      zoomControl={false}
                      className="comparison_box"
                      scrollWheelZoom={true}
                      doubleClickZoom={false}
                      zoomSnap={0}
                      zoomDelta={0.18}
                      maxZoom={18}
                    >
                      <TileLayer
                        url="http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                      />
                      <input
                        type="checkbox"
                        className="comparison_input"
                        onChange={(e) => selectShape(e, item, index)}
                        checked={selectedShape.some(
                          (itmm) => itmm.unique_id === item.unique_id
                        )}
                      />
                      {/* here we are adding the shapes which are created at the main map */}

                      {item.type === "road" && item.coord && (
                        <Polyline
                          positions={item.coord}
                          pathOptions={{ color: "red" }}
                        />
                      )}

                      {item.type === "road" && item.lineCoord && (
                        <Polyline
                          positions={item.lineCoord}
                          pathOptions={{ color: "rgb(97, 94, 94)" }}
                        />
                      )}

                      {item.type === "radius" &&
                        item.circleVal.map((it, index) => {
                          return (
                            <Circle
                              center={it.center}
                              key={index}
                              radius={it.rad}
                              pathOptions={{ color: it.color, fill: false }}
                            />
                          );
                        })}

                      {item.type === "radius" && item.lineCoord && (
                        <Polyline
                          positions={item.lineCoord}
                          pathOptions={{ color: "rgb(97, 94, 94)" }}
                        />
                      )}
                    </MapContainer>
                    <div className="comp_rht_box">
                      <div className="comp_rht_box_ss">
                        <h6>{t("Name")} </h6> :<span>{item.name}</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Group")} </h6> :<span>{item.group}</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Radius")} </h6> : <span>{item.radius} m</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Type")} </h6> : <span>{item.type} </span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Date")} </h6> :<span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

          {shapesData && shapesData.length === 0 && (
            <h5 style={{ margin: "15px" }}>{t("Sorry ! No data available")}</h5>
          )}
        </div>

        {/* here we are adding  the loader  */}

        {loading && <Loader />}
      </div>
    </>
  );
};

export default CatchmentComparisonScreen;
