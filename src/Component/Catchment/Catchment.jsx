// In this file we are going to implement the catchment to the project ;
import React, { useEffect, useState } from "react";
import CatchmentImg from "./images/catchment.svg";
import Travel from "./images/travel.svg";
import L, { marker } from "leaflet";
import Direction from "./images/direction.svg";
import Play from "./images/play.svg";
import "./catchment.css";
import axios from "axios";
import {
  Polyline,
  Circle,
  Polygon,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import {
  clearSelectedCatchment,
  cutProfileScreen,
  hideSelectedCatchmentOnmap,
  showCatchmentResultScreen,
  showCatchmentSaveFile,
  showLoginPopup,
  showNotification,
  showPoiNotification,
  showToolsScreen,
  updateMarkerArray,
  updateRadiusBasedMarker,
  updateRemoveRadiusBasedName,
  updateRemoveRoadBasedName,
  updateRoadBasedMarker,
} from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import ToolsScreen from "../Tools/ToolsScreen";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";
import Save from "./images/save.svg";
import Share from "./images/share.svg";
import MarkerIcon from "../mainimages/markers.svg";
import Remove from "./images/bluecut.svg";
import { circle } from "leaflet";

const Catchment = () => {
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const [loading, setLoading] = useState(false);
  const Token = useSelector((state) => state.authenication.token);
  const feedbackState = useSelector((state) => state.feedbackHandler.show);
  const [roadPolylineData, setRoadPolylineData] = useState([]);
  const [roadLinesData, setRoadLinesData] = useState([]);
  const [radiusPolylineData, setRadiusPolylineData] = useState([]);
  const [radiusLinesData, setRadiusLinesData] = useState([]);
  const [markerArray, setMarkerArray] = useState([]);
  const [radiusMarkerArray, setRadiusMarkerArray] = useState([]);
  const [roadMarkerArray, setRoadMarkerArray] = useState([]);

  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );

  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesCheckedItems
  );

  const datass = { poi: poiCheckedData };

  const toolScreenData = useSelector((state) => state.catchmentData.data);
  const type = toolScreenData.type;
  const { t, i18n } = useTranslation();
  const [circleData, setCircleData] = useState([]);
  const choosedLanguage = i18n.language;

  const catchmentState = useSelector(
    (state) => state.catchmentData.startCatchment
  );

  const markerArrayData = useSelector(
    (state) => state.AllCreatedShapes.markerArray
  );

  // here we are writing the function which will clear all the created shapes ;

  useEffect(() => {
    if (markerArrayData.length === 0) {
      setRoadLinesData([]);
      setRadiusLinesData([]);
      setRoadPolylineData([]);
      setRadiusPolylineData([]);
      setCircleData([]);
    }
  }, [markerArrayData]);

  let DefaultIcon = L.icon({
    iconUrl: MarkerIcon,
    iconSize: 50,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const map = useMap();

  const showCatchment = (item) => {
    const coord = item.latlng;
    if (Token) {
      const saveUrl = `${api}catch-shapes`;
      const headers = {
        Authorization: `Bearer ${Token}`,
        Accept: "application/json",
      };

      if (catchmentState) {
        setLoading(true);

        if (type == "Radius") {
          const val = toolScreenData.dist / 5;

          const circleVal = [
            { rad: val, color: "purple", center: coord },
            { rad: val * 2, color: "green", center: coord },
            { rad: val * 3, color: "rgb(0,161,228)", center: coord },
            { rad: val * 4, color: "orange", center: coord },
            { rad: val * 5, color: "red", center: coord },
          ];

          const vals = {
            coord: circleVal,
            name: item.name,
            radius: toolScreenData.dist,
          };

          setCircleData((item) => [...item, vals]);

          const url = `${api}catchment`;

          const radiusData = {
            radius: toolScreenData.dist,
            lat: coord[0],
            lng: coord[1],
            based: 2,
          };

          const markerData = {
            lat: coord[1],
            lng: coord[0],
            radius: toolScreenData.dist,
            type: "circle",
            name: item.name,
          };

          setRadiusMarkerArray((item) => {
            return [...item, markerData];
          });

          const mrkrData = [...radiusMarkerArray, markerData];
          dispatch(updateRadiusBasedMarker(mrkrData));

          axios
            .post(url, radiusData, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
                "X-localization": choosedLanguage,
              },
            })
            .then((res) => {
              if (res.data) {
                setLoading(false);
                const value = res.data.data.area;

                const linesValue = res.data.data.lines;
                setRadiusLinesData((item) => {
                  return [...item, linesValue];
                });
                setRadiusPolylineData((item) => {
                  return [...item, value];
                });

                // here we are writing function to save this catchment ;

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                today = dd + "-" + mm + "-" + yyyy;

                const catchmentSave = {
                  center: coord,
                  type: "radiusBased",
                  date: today,
                  radius: toolScreenData.dist,
                  unique_id: item.name,
                  lineData: linesValue,
                  polylineData: value,
                  lat: coord[1],
                  lng: coord[0],
                  saved: 0,
                };

                axios
                  .post(saveUrl, catchmentSave, { headers: headers })
                  .then((res) => {
                    console.log(res, "radiusbased");
                  });
              } else {
                setLoading(false);
              }
            })
            .catch((err) => {
              alert("Something went wrong! ");
              setLoading(false);
            });
        } else if (type == "Road") {
          const url = `${api}catchment`;

          const radiusData = {
            radius: toolScreenData.dist,
            lat: coord[0],
            lng: coord[1],
            based: 1,
          };

          axios
            .post(url, radiusData, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
                "X-localization": choosedLanguage,
              },
            })
            .then((res) => {
              if (res.data) {
                setLoading(false);
                const value = res.data.data.area;

                const dttt = {
                  coord: value,
                  name: item.name,
                };

                setRoadMarkerArray((item) => {
                  return [...item, dttt];
                });
                const mrkrData = [...roadMarkerArray, dttt];
                dispatch(updateRoadBasedMarker(mrkrData));

                const linesValue = res.data.data.lines;

                const val = {
                  coords: value,
                  center: coord,
                  name: item.name,
                  radius: toolScreenData.dist,
                };

                setRoadLinesData((item) => {
                  return [...item, linesValue];
                });

                setRoadPolylineData((item) => {
                  return [...item, val];
                });

                // here we are writing function to save this catchment ;
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                today = dd + "-" + mm + "-" + yyyy;

                let latlngs = "";
                const shapeData1 = value;
                const shapeData = [...shapeData1, shapeData1[0]];
                for (let i = 0; i < shapeData.length; i++) {
                  latlngs = latlngs + `${shapeData[i][1]} ${shapeData[i][0]},`;
                }

                latlngs = latlngs.replace(/,$/, "");

                const catchmentSave = {
                  center: coord,
                  type: "roadBased",
                  date: today,
                  radius: toolScreenData.dist,
                  unique_id: item.name,
                  lineData: linesValue,
                  polylineData: value,
                  latlng: latlngs,
                  lat: coord[1],
                  lng: coord[0],
                  saved: 0,
                };

                axios
                  .post(saveUrl, catchmentSave, { headers: headers })
                  .then((res) => {
                    console.log(res, "roadbased");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                setLoading(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              alert("Something went wrong !");
            });
        }
      } else {
        dispatch(
          showNotification(t("Please check the start catchment option!"))
        );
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  const showCatchmentScreen = (data, index) => {
    const polygonAllData = {
      type: "road",
      center: data.center,
      radius: toolScreenData.dist,
      polygonBorder: roadPolylineData[index],
      polygonLineData: roadLinesData[index],
    };

    if (Token) {
      if (servicesCheckedData.length > 2) {
        dispatch(showCatchmentResultScreen(polygonAllData));
        dispatch(cutProfileScreen());
      } else if (servicesCheckedData.length < 2) {
        dispatch(showPoiNotification());
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  const showCatchmentScreens = (data, index) => {
    const circleAllData = {
      type: "radius",
      center: data.center,
      radius: data.rad,
      radiusCicumference: radiusPolylineData[index],
      radiusPolylineData: radiusLinesData[index],
    };

    if (Token) {
      if (servicesCheckedData.length > 2) {
        dispatch(showCatchmentResultScreen(circleAllData));
        dispatch(cutProfileScreen());
      } else if (servicesCheckedData.length < 2) {
        dispatch(showPoiNotification());
      }
    } else {
      dispatch(showLoginPopup());
    }
  };

  const showCatchmentSaveScreen = (data, index) => {
    const polygonAllData = {
      type: "road",
      center: data.center,
      radius: data.radius,
      polygonBorder: roadPolylineData[index],
      polygonLineData: roadLinesData[index],
      unique_id: data.name,
    };

    dispatch(showCatchmentSaveFile(polygonAllData));
    dispatch(cutProfileScreen());
  };

  const showCatchmentSaveScreens = (data, index, item) => {
    const circleAllData = {
      type: "radius",
      center: data.center,
      radius: item.radius,
      radiusCicumference: radiusPolylineData[index],
      radiusPolylineData: radiusLinesData[index],
      unique_id: item.name,
    };

    dispatch(showCatchmentSaveFile(circleAllData));
    dispatch(cutProfileScreen());
  };

  // here we are going to get the selected data from the saved catchment ;

  const selectedData = useSelector(
    (state) => state.catchmentData.selectedCatchmentData
  );

  const [selectedCircleBorder, setSelectedCircleBorder] = useState([]);
  const [selectedCircleLine, setSelectedCircleLine] = useState([]);
  const [selectedPolygonBorder, setSelectedPolygonBorder] = useState([]);
  const [selectedPolygonline, setSelectedPolygonline] = useState([]);
  const [selectedCirleData, setSelectedCircleData] = useState([]);

  const selectedCatchmentState = useSelector(
    (state) => state.catchmentData.showSelectedCatchment
  );

  useEffect(() => {
    if (selectedData.type == "radius" && selectedCatchmentState === true) {
      map.flyTo(selectedData.center, 16);

      const val = selectedData.radius / 5;
      setSelectedCircleData([
        { rad: val, color: "purple" },
        { rad: val * 2, color: "green" },
        { rad: val * 3, color: "rgb(0,161,228)" },
        { rad: val * 4, color: "orange" },
        { rad: val * 5, color: "red" },
      ]);

      const url = `${api}catchment`;

      const radiusData = {
        radius: selectedData.radius,
        lat: selectedData.center[0],
        lng: selectedData.center[1],
        based: 2,
      };

      axios
        .post(url, radiusData, {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
            "X-localization": choosedLanguage,
          },
        })
        .then((res) => {
          if (res.data) {
            dispatch(hideSelectedCatchmentOnmap());
            setLoading(false);
            const value = res.data.data.area;

            const linesValue = res.data.data.lines;

            setSelectedCircleBorder(value);
            setSelectedCircleLine(linesValue);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          alert("Something went wrong here! ", err);
          console.log(err, "this is the error which we are getting");
          setLoading(false);
        });
    } else if (selectedData.type == "road" && selectedCatchmentState == true) {
      map.flyTo(selectedData.center, 16);
      const url = `${api}catchment`;

      const radiusData = {
        radius: selectedData.radius,
        lat: selectedData.center[0],
        lng: selectedData.center[1],
        based: 1,
      };

      axios
        .post(url, radiusData, {
          headers: {
            Authorization: `Bearer ${Token}`,
            Accept: "application/json",
            "X-localization": choosedLanguage,
          },
        })
        .then((res) => {
          if (res.data) {
            dispatch(hideSelectedCatchmentOnmap());
            setLoading(false);
            const value = res.data.data.area;
            const linesValue = res.data.data.lines;
            setSelectedPolygonBorder(value);
            console.log(value, "this is the road data");
            setSelectedPolygonline(linesValue);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert("Something went wrong !");
        });
    }
  }, [selectedData]);

  const showSelectedCircleCatchmentScreens = (
    type,
    center,
    radius,
    border,
    line
  ) => {
    const circleAllData = {
      type: "radius",
      center: center,
      radius: radius,
      radiusCicumference: border,
      radiusPolylineData: line,
    };
    dispatch(showCatchmentResultScreen(circleAllData));
    dispatch(cutProfileScreen());
  };

  const showSelectedPolygonCatchmentScreens = (
    type,
    center,
    radius,
    border,
    line
  ) => {
    const polygonAllData = {
      type: "road",
      center: center,
      radius: radius,
      polygonBorder: border,
      polygonLineData: line,
    };
    dispatch(showCatchmentResultScreen(polygonAllData));
    dispatch(cutProfileScreen());
  };

  // here we are writing the function which is used to remove the selected shapes ;

  const removeCircleShapes = (items, index) => {
    const filterCircleData = circleData.filter((item, i) => i !== index);
    setCircleData(filterCircleData);

    const filterBorderData = radiusPolylineData.filter(
      (item, i) => i !== index
    );
    setRadiusPolylineData(filterBorderData);

    const filterLinesData = radiusLinesData.filter((item, i) => i !== index);
    setRadiusLinesData(filterLinesData);
    const val = { name: items.name, id: index };

    const filterMarkerArray = markerArrayData.filter(
      (it, ind) => it.name !== items.name
    );
    dispatch(updateMarkerArray(filterMarkerArray));
    dispatch(updateRemoveRadiusBasedName(val));
  };

  const removePolygonShapes = (items, index) => {
    const filterBorderData = roadPolylineData.filter((item, i) => i !== index);
    setRoadPolylineData(filterBorderData);

    const filterLinesData = roadLinesData.filter((item, i) => i !== index);
    setRoadLinesData(filterLinesData);
    const val = { name: items.name, id: index };

    const filterMarkerArray = markerArrayData.filter(
      (it, ind) => it.name !== items.name
    );
    dispatch(updateMarkerArray(filterMarkerArray));

    dispatch(updateRemoveRoadBasedName(val));
  };

  return (
    <>
      {/* here we are adding the polyline for the catchment purpose ; */}
      {catchmentState &&
        circleData.map((items, indexx) => {
          return items.coord.map((item, index) => {
            return (
              <Circle
                center={item.center}
                key={index}
                radius={item.rad}
                pathOptions={{ color: item.color, fill: false }}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  click: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup>
                  <div className="result_popup">
                    <li onClick={() => showCatchmentScreens(item, indexx)}>
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
                    <li
                      onClick={() =>
                        showCatchmentSaveScreens(item, indexx, items)
                      }
                    >
                      <img
                        src={Save}
                        alt="save icon"
                        width="13px"
                        style={{ margin: "0px 5.6px" }}
                      />
                      <span>{t("Save")}</span>
                    </li>

                    <li onClick={() => removeCircleShapes(items, indexx)}>
                      <img
                        src={Remove}
                        alt="remove icon"
                        width="27px"
                        style={{ marginLeft: "-1px", marginTop: "2px" }}
                      />
                      <span>{t("Remove")}</span>
                    </li>
                  </div>
                </Popup>
              </Circle>
            );
          });
        })}

      {catchmentState && (
        <Polyline
          pathOptions={{ color: "rgb(89, 87, 87)" }}
          positions={radiusLinesData}
        />
      )}

      {type == "Radius" && catchmentState && (
        <Polyline
          pathOptions={{ color: "pink" }}
          positions={radiusPolylineData}
        />
      )}

      {/* here we are drawing the shapes of the road based  */}

      {catchmentState &&
        roadPolylineData.map((item, index) => {
          return (
            <>
              <Polygon
                pathOptions={{ color: "rgb(245, 24, 54)", fill: false }}
                positions={item.coords}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.openPopup();
                  },
                  click: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup>
                  <div className="result_popup">
                    <li onClick={() => showCatchmentScreen(item, index)}>
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
                    <li onClick={() => showCatchmentSaveScreen(item, index)}>
                      <img
                        src={Save}
                        alt="save icon"
                        width="13px"
                        style={{ margin: "0px 5.6px" }}
                      />
                      <span>{t("Save")}</span>
                    </li>

                    <li onClick={() => removePolygonShapes(item, index)}>
                      <img
                        src={Remove}
                        alt="remove icon"
                        width="27px"
                        style={{ marginLeft: "-1px", marginTop: "2px" }}
                      />
                      <span>{t("Remove")}</span>
                    </li>
                  </div>
                </Popup>
              </Polygon>
            </>
          );
        })}

      {catchmentState &&
        roadLinesData.map((item, index) => {
          return (
            <Polyline
              pathOptions={{ color: "rgb(89, 87, 87)" }}
              positions={item}
            />
          );
        })}

      {/* here we are adding the loader  */}
      {loading && <Loader />}

      {/* here we are going to render the selected catchment on the map for the user */}

      {selectedData.type == "radius" &&
        selectedCirleData &&
        selectedCirleData.map((item, index) => {
          return (
            <Circle
              center={selectedData.center}
              key={index}
              radius={item.rad}
              pathOptions={{ color: item.color, fill: false }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                click: (e) => {
                  e.target.openPopup();
                },
              }}
            >
              <Popup>
                <div className="result_popup">
                  <li
                    onClick={() =>
                      showSelectedCircleCatchmentScreens(
                        selectedData.type,
                        selectedData.center,
                        selectedData.radius,
                        selectedCircleBorder,
                        selectedCircleLine
                      )
                    }
                  >
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

                  <li onClick={() => dispatch(clearSelectedCatchment())}>
                    <img
                      src={Remove}
                      alt="remove icon"
                      width="27px"
                      style={{ marginLeft: "-1px", marginTop: "2px" }}
                    />
                    <span>{t("Remove")}</span>
                  </li>
                </div>
              </Popup>
            </Circle>
          );
        })}

      {selectedData.type == "radius" && selectedCircleBorder && (
        <Polyline
          pathOptions={{ color: "red" }}
          positions={selectedCircleBorder}
        />
      )}

      {selectedData.type == "radius" && selectedCircleLine && (
        <Polyline
          pathOptions={{ color: "rgb(89, 87, 87)" }}
          positions={selectedCircleLine}
        />
      )}

      {/* here we are drawing the shapes of the road based  */}

      {selectedData.type == "road" && selectedPolygonBorder && (
        <Polygon
          pathOptions={{ color: "rgb(245, 24, 54)", fill: false }}
          positions={selectedPolygonBorder}
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup();
            },
            click: (e) => {
              e.target.openPopup();
            },
          }}
        >
          <Popup>
            <div className="result_popup">
              <li
                onClick={() =>
                  showSelectedPolygonCatchmentScreens(
                    selectedData.type,
                    selectedData.center,
                    selectedData.radius,
                    selectedPolygonBorder,
                    selectedPolygonline
                  )
                }
              >
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

              <li onClick={() => dispatch(clearSelectedCatchment())}>
                <img
                  src={Remove}
                  alt="remove icon"
                  width="27px"
                  style={{ marginLeft: "-1px", marginTop: "2px" }}
                />
                <span>{t("Remove")}</span>
              </li>
            </div>
          </Popup>
        </Polygon>
      )}

      {selectedData.type == "road" && selectedPolygonline && (
        <Polyline
          pathOptions={{ color: "rgb(89, 87, 87)" }}
          positions={selectedPolygonline}
        />
      )}

      {markerArrayData.map((item, index) => {
        return (
          <Marker
            position={item.latlng}
            icon={DefaultIcon}
            key={index}
            eventHandlers={{
              mouseover: (e) => {
                if (feedbackState === false && Token) {
                  dispatch(showToolsScreen());
                  e.target.openPopup();
                }
              },
              click: (e) => {
                e.target.openPopup();
              },
            }}
          >
            <Popup>
              <div className="result_popup catchment">
                <div className="catch_img" onClick={() => showCatchment(item)}>
                  <img
                    src={CatchmentImg}
                    alt="catchment img"
                    style={{ width: "61%" }}
                  />
                  <span style={{ marginBottom: "-14px" }}>
                    {t("Catchment")}
                  </span>
                </div>

                <h3 className="line"></h3>
                <div className="catch_img">
                  <img
                    src={Travel}
                    alt="travel img"
                    onClick={() =>
                      dispatch(showNotification("Development is in progress"))
                    }
                  />
                  <span>{t("Travel")}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default Catchment;
