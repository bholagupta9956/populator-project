// here we are creating a function for the poi layers ;

import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import Direction from "./ResultImages/direction.svg";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../utils/Loader";
import Refresh from "./ResultImages/refresh.svg";
import axios from "axios";
import { Tooltip, Popup } from "react-leaflet";
import { useTranslation } from "react-i18next";
import Shop from "./ResultImages/shop.jpg";
import L, { circle } from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  disablePoiLayers,
  showNotification,
  showPointsNotification,
  updatePoiLayersValue,
} from "../../actions";
import { Modal } from "react-bootstrap";
import CuttedPointsNotify from "../../utils/CuttedPointsNotify";


const PoiLayers = forwardRef((props, ref) => {

  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const poiLayerState = useSelector((state) => state.poiLayersHandlers.show);
  const clusterState = useSelector((state) => state.clustersHanlders.show);
  const { t, i18n } = useTranslation();
  const Token = useSelector((state) => state.authenication.token);

  const map = useMap();
  const [loading, setLoading] = useState(false);
  const [markerData, setMarkerData] = useState();
  const [polygonArrayData, setPolygonArrayData] = useState([]);
  const [rectangleArrayData, setRectangleArrayData] = useState([]);
  const [circleArrayData, setCircleArrayData] = useState([]);
  const [radiusBasedMarkerData, setRadiusBasedMarkerData] = useState([]);
  const [roadBasedMarkerData, setRaodBasedMarkerData] = useState([]);
  const [shapesName, setShapesName] = useState([]);
  const [showCuttedPoints, setShowCuttedPoints] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showAllPoi, setShowAllPoi] = useState(false);
  const [allPois, setAllPois] = useState([]);
  const [allPoiShow ,setAllPoiShow] = useState(false);

 
  const urlLink = `${api}poi-layers`;
  var screenBounds = map.getBounds();

  const poiCheckedData = useSelector(
    (state) => state.poiCheckedItem.poiCheckedItems
  );

  const servicesCheckedData = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );

  const refreshCluster = useSelector(
    (state) => state.enableClusterHeatmap.refresh
  );

  const withInBoundary = useSelector((state) => state.panel3.withInBoundary);
  const withInShape = useSelector((state) => state.panel3.withInShape);

  // here we are getting all the shapes which we have created on the map ;

  const polygonArray = useSelector(
    (state) => state.AllCreatedShapes.polygonArray
  );

  const rectangleArray = useSelector(
    (state) => state.AllCreatedShapes.rectangleArray
  );

  const RadiusBasedMarker = useSelector(
    (state) => state.AllCreatedShapes.radiusBasedMarker
  );

  const RoadBasedMarker = useSelector(
    (state) => state.AllCreatedShapes.roadBasedMarker
  );

  const circleArray = useSelector(
    (state) => state.AllCreatedShapes.circleArray
  );

  const choosedLanguage = i18n.language;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${Token}`,
    "X-localization": choosedLanguage,
  }

  const poiLayersEnableState = useSelector(
    (state) => state.enableClusterHeatmap.poiLayers
  );

  const poiLayersValue = useSelector((state) => state.poiLayersHandlers.value);

  const getPoiLayerData = (poiLayerState) => {
    
    if (poiLayersValue !== 0) {
      // setMarkerData([]);
      setTotalPoints(0);
      dispatch(updatePoiLayersValue(0));
      setAllPoiShow(false)

      if (poiLayerState === true && poiLayersEnableState === true) {
        if (withInBoundary) {
          setMarkerData([]);
          const zoomLevels = Math.round(map.getZoom());
          setLoading(true);

          const boundss = map.getBounds();

          const coordinates = [
            boundss._northEast.lng,
            boundss._northEast.lat,
            boundss._southWest.lng,
            boundss._southWest.lat,
          ];

          const data = {
            bounds: coordinates,
            poi: poiCheckedData,
            services: servicesCheckedData,
            type: "bounds",
          };

          screenBounds = boundss;
          axios
            .post(urlLink, data, { headers: headers })
            .then((res) => {
              if (res.data.Clusters) {
                setLoading(false);
                const data = res.data.Clusters;
                setMarkerData(data);

                res.data.Clusters.map((it, index) => {
                  if (!allPois.includes(it.id)) {
                    setTotalPoints((itmm) => {
                      return itmm + parseInt(it.points);
                    });
                  }
                });
                setShowCuttedPoints(true);
              }
            })
            .catch((err) => {
              setLoading(false);
              alert("something went wrong with the server");
            });
        } else if (withInShape) {

          if (polygonArray.length !== 0) {
            console.log("first");
            setLoading(true);
            for (var l = 0; l < polygonArray.length; l++) {
              const coord = polygonArray[l].coord;
              let latlngs = "";
              const shapeData1 = coord;
              const shapeData = [...shapeData1, shapeData1[0]];
              for (let i = 0; i < shapeData.length; i++) {
                latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
              }

              const name = polygonArray[l].name;

              latlngs = latlngs.replace(/,$/, "");

              if (shapesName.indexOf(name) === -1) {
                setShapesName((item) => {
                  return [...item, name];
                });

                const data = {
                  poi: poiCheckedData,
                  services: servicesCheckedData,
                  latlng: latlngs,
                  type: "polygon",
                };

                axios
                  .post(urlLink, data, { headers: headers })
                  .then((res) => {
                    if (res.data.Clusters) {
                      setLoading(false);

                      res.data.Clusters.map((it, index) => {
                        if (!allPois.includes(it.id)) {
                          setTotalPoints((itmm) => {
                            return itmm + parseInt(it.points);
                          });
                        }
                      });
                      
                      setShowCuttedPoints(true);
                      const data = res.data.Clusters;
                      setPolygonArrayData((item) => {
                        return [...item, data];
                      });
                    }
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err);
                  });
              }
            }
          }

          if (rectangleArray.length !== 0) {
            
            setLoading(true);
           
            for (var l = 0; l < rectangleArray.length; l++) {
              const coord = rectangleArray[l].coord;
              let latlngs = "";
              const shapeData1 = coord;
              const shapeData = [...shapeData1, shapeData1[0]];
              for (let i = 0; i < shapeData.length; i++) {
                latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
              }

              const name = rectangleArray[l].name;
              latlngs = latlngs.replace(/,$/, "");

              if (shapesName.indexOf(name) === -1) {
                setShapesName((item) => {
                  return [...item, name];
                });
              }

              const data = {
                poi: poiCheckedData,
                services: servicesCheckedData,
                latlng: latlngs,
                type: "polygon",
              };

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Clusters) {
                    console.log(res.data.Clusters , "cluster")
                    setLoading(false);
                    if (res.data.Clusters.length === 0) {
                      dispatch(showNotification("Sorry , No data available !"));
                    } else {
                      res.data.Clusters.map((it, index) => {
                        if (!allPois.includes(it.id)) {
                          setTotalPoints((itmm) => {
                            return itmm + parseInt(it.points);
                          });
                        }
                      });

                      setShowCuttedPoints(true);
                      const data = res.data.Clusters;
                      setRectangleArrayData((item) => {
                        return [...item, data];
                      });
                    }
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err , "this is the error here")
                });
            }
          }

          if (circleArray.length !== 0) {
            setLoading(true);
            for (var k = 0; k < circleArray.length; k++) {
              const radius = circleArray[k].radius;
              const lat = circleArray[k].center.lat;
              const lng = circleArray[k].center.lng;
              const name = circleArray[k].name;

              if (shapesName.indexOf(name) === -1) {
                setShapesName((item) => {
                  return [...item, name];
                });
              }

              const data = {
                lat: lng,
                radius: radius,
                lng: lat,
                poi: poiCheckedData,
                services: servicesCheckedData,
                type: "circle",
              }

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Clusters) {
                    setShowCuttedPoints(true);
                    setLoading(false);

                    res.data.Clusters.map((it, index) => {
                      if (!allPois.includes(it.id)) {
                        setTotalPoints((itmm) => {
                          return itmm + parseInt(it.points);
                        });
                      }
                    });
                    const data = res.data.Clusters;
                    setCircleArrayData((item) => {
                      return [...item, data];
                    });
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }

          // adding the radiusBasedMarker here ;

          if (RadiusBasedMarker.length !== 0) {
            setLoading(true);
            for (var l = 0; l < RadiusBasedMarker.length; l++) {
              const name = RadiusBasedMarker[l].name;
              if (shapesName.indexOf(name) === -1) {
                setShapesName((item) => {
                  return [...item, name];
                });
              }

              const data = {
                lat: RadiusBasedMarker[l].lat,
                lng: RadiusBasedMarker[l].lng,
                radius: RadiusBasedMarker[l].radius,
                poi: poiCheckedData,
                services: servicesCheckedData,
                type: "circle",
              };

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Clusters) {
                    setLoading(false);
                    setShowCuttedPoints(true);
                    res.data.Clusters.map((it, index) => {
                      if (!allPois.includes(it.id)) {
                        setTotalPoints((itmm) => {
                          return itmm + parseInt(it.points);
                        });
                      }
                    });
                    const data = res.data.Clusters;
                    setRadiusBasedMarkerData((item) => {
                      return [...item, data];
                    });
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }

          // adding the roadBasedMarker here ;

          if (RoadBasedMarker.length !== 0) {
            setLoading(true);
            for (var l = 0; l < RoadBasedMarker.length; l++) {
              const coord = RoadBasedMarker[l].coord;
              const name = RoadBasedMarker[l].name;

              let latlngs = "";
              const shapeData1 = coord;
              const shapeData = [...shapeData1, shapeData1[0]];
              for (let i = 0; i < shapeData.length; i++) {
                latlngs = latlngs + `${shapeData[i][1]} ${shapeData[i][0]},`;
              }

              latlngs = latlngs.replace(/,$/, "");

              const data = {
                latlng: latlngs,
                poi: poiCheckedData,
                services: servicesCheckedData,
                type: "polygon",
              };

              if (shapesName.indexOf(name) === -1) {
                setShapesName((item) => {
                  return [...item, name];
                });
              }

              axios
                .post(urlLink, data, { headers: headers })
                .then((res) => {
                  if (res.data.Clusters) {
                    res.data.Clusters.map((it, index) => {
                      console.log(it.id, "id");
                      if (!allPois.includes(it.id)) {
                        setTotalPoints((itmm) => {
                          return itmm + parseInt(it.points);
                        });
                      }
                    });

                    setLoading(false);
                    setShowCuttedPoints(true);
                    const data = res.data.Clusters;
                    setRaodBasedMarkerData((item) => {
                      return [...item, data];
                    });
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        }
      } else if (!poiLayerState) {
        setMarkerData([]);
        setLoading(false);
      } else if (!poiLayersEnableState) {
        setMarkerData([]);
        setLoading(false);
      }
    }
  };

 

  useEffect(() => {
    getPoiLayerData(poiLayerState);
  }, [RadiusBasedMarker, RoadBasedMarker, refreshCluster, poiLayersValue]);

  // here we are writing the function just for removing the selected Clusters ;

  const removeCircleShapeName = useSelector(
    (state) => state.AllCreatedShapes.removeCircleShapeName
  );

  const removePolygonShapeName = useSelector(
    (state) => state.AllCreatedShapes.removePolygonShapeName
  );

  const removeRectangleShapeName = useSelector(
    (state) => state.AllCreatedShapes.removeRectangleShapeName
  );

  const removeRadiusBasedName = useSelector(
    (state) => state.AllCreatedShapes.removeRadiusBasedName
  );

  const removeRoadBasedName = useSelector(
    (state) => state.AllCreatedShapes.removeRoadBasedName
  );

  useEffect(() => {
    const filterData = roadBasedMarkerData.filter(
      (item, index) => removeRoadBasedName.id !== index
    );
    setRaodBasedMarkerData(filterData);
  }, [removeRoadBasedName]);

  useEffect(() => {
    const filterData = radiusBasedMarkerData.filter(
      (item, index) => removeRadiusBasedName.id !== index
    );
    setRadiusBasedMarkerData(filterData);
  }, [removeRadiusBasedName]);

  useEffect(() => {
    const id = removePolygonShapeName.id;
    const filterData = polygonArrayData.filter((item, index) => index !== id);
    setPolygonArrayData(filterData);
  }, [removePolygonShapeName]);

  useEffect(() => {
    const id = removeRectangleShapeName.id;
    const filterData = rectangleArrayData.filter((item, index) => index !== id);
    setRectangleArrayData(filterData);
  }, [removeRectangleShapeName]);

  useEffect(() => {
    const id = removeCircleShapeName.id;
    const filterData = circleArrayData.filter((item, index) => index !== id);
    setCircleArrayData(filterData);
  }, [removeCircleShapeName]);

  const RemoveAllPoiFromMap = useSelector(
    (state) => state.removeAllPoiFromMap.show
  );


  useEffect(() => {
    setRectangleArrayData([]);
    setPolygonArrayData([]);
    setCircleArrayData([]);
    setRadiusBasedMarkerData([]);
    setRaodBasedMarkerData([]);
  }, [RemoveAllPoiFromMap]);


  useImperativeHandle(ref, () => ({
    getNormalData() {
      alert("bhola gupta here we are here to guide you");
    },
  }))

  const updatePoiLayers = () => {
    dispatch(updatePoiLayersValue(poiLayersValue + 5));
  };


  return (
    <>

      <div className="cluster">
        {poiLayerState === true &&
        poiLayersEnableState === true &&
        allPoiShow === true &&
        markerData
          ? markerData.map((item, index) => {
              const position = item.position;
              const coordinates = [position.lat, position.lon];

              if (!allPois.includes(item.id)) {
                setAllPois((itm) => {
                  return [...itm, item.id];
                });
              }

              // adding css to the marker icon ;
              let DefaultIcon = L.icon({
                iconUrl: item.image,
                iconSize: 60,
              });

              L.Marker.prototype.options.icon = DefaultIcon;

              return (
                <Marker
                  position={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  icon={DefaultIcon}
                  key={index}
                >
                  <Popup>
                    <div className="tooltips">
                      <div className="tooltips_img">
                        <img src={item.mapimage} alt="poi image" />
                      </div>
                      <div className="tooltips_direction">
                        <h6>{item.text.name}</h6>
                        <div
                          className="direction_img"
                          onClick={() =>
                            dispatch(
                              showNotification(
                                t("Development is in progress !")
                              )
                            )
                          }
                        >
                          <img src={Direction} alt="direction icon" />
                        </div>
                      </div>
                      <h5 className="tool_category_name">
                        {item.text.category_name}
                      </h5>
                      <div className="tool_num">
                        <span className="tools_outlet_name">
                          {item.text.outlet_name}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })
          : null}

        {poiLayerState === true &&
          poiLayersEnableState === true &&
          allPoiShow === true &&
          polygonArrayData &&
          polygonArrayData.map((it, index) => {
            return it.map((item, index) => {
              const position = item.position;
              const coordinates = [position.lat, position.lon];

              if (!allPois.includes(item.id)) {
                setAllPois((itm) => {
                  return [...itm, item.id];
                });
              }
              // adding css to the marker icon ;
              let DefaultIcon = L.icon({
                iconUrl: item.image,
                iconSize: 60,
              });

              L.Marker.prototype.options.icon = DefaultIcon;

              return (
                <Marker
                  position={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  icon={DefaultIcon}
                  key={index}
                >
                  <Popup>
                    <div className="tooltips">
                      <div className="tooltips_img">
                        <img src={item.mapimage} alt="poi image" />
                      </div>
                      <div className="tooltips_direction">
                        <h6>{item.text.name}</h6>
                        <div
                          className="direction_img"
                          onClick={() =>
                            dispatch(
                              showNotification(
                                t("Development is in progress !")
                              )
                            )
                          }
                        >
                          <img src={Direction} alt="direction icon" />
                        </div>
                      </div>
                      <h5 className="tool_category_name">
                        {item.text.category_name}
                      </h5>
                      <div className="tool_num">
                        <span className="tools_outlet_name">
                          {item.text.outlet_name}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            });
          })}

        {poiLayerState === true &&
        poiLayersEnableState === true &&
        allPoiShow === true &&
        rectangleArrayData ? (
          <>
            {rectangleArrayData.map((it, index) => {

              return it.map((item, index) => {
                const position = item.position;
                const coordinates = [position.lat, position.lon];

                if (!allPois.includes(item.id)) {
                  setAllPois((itm) => {
                    return [...itm, item.id];
                  });
                }

                // adding css to the marker icon ;
                let DefaultIcon = L.icon({
                  iconUrl: item.image,
                  iconSize: 60,
                });

                L.Marker.prototype.options.icon = DefaultIcon;

                return (
                  <Marker
                    position={coordinates}
                    eventHandlers={{
                      mouseover: (e) => {
                        e.target.openPopup();
                      },
                      click: (e) => {
                        e.target.openPopup();
                      },
                    }}
                    icon={DefaultIcon}
                    key={index}
                  >
                    <Popup>
                      <div className="tooltips">
                        <div className="tooltips_img">
                          <img src={item.mapimage} alt="poi image" />
                        </div>
                        <div className="tooltips_direction">
                          <h6>{item.text.name}</h6>
                          <div
                            className="direction_img"
                            onClick={() =>
                              dispatch(
                                showNotification(
                                  t("Development is in progress !")
                                )
                              )
                            }
                          >
                            <img src={Direction} alt="direction icon" />
                          </div>
                        </div>
                        <h5 className="tool_category_name">
                          {item.text.category_name}
                        </h5>
                        <div className="tool_num">
                          <span className="tools_outlet_name">
                            {item.text.outlet_name}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              });
            })}
          </>
        ) : null }

        {poiLayerState === true &&
          poiLayersEnableState === true &&
          allPoiShow === true &&
          circleArrayData &&
          circleArrayData.map((it, index) => {
            return it.map((item, index) => {
              const position = item.position;
              const coordinates = [position.lat, position.lon];

              if (!allPois.includes(item.id)) {
                setAllPois((itm) => {
                  return [...itm, item.id];
                });
              }

              // adding css to the marker icon ;
              let DefaultIcon = L.icon({
                iconUrl: item.image,
                iconSize: 60,
              });

              L.Marker.prototype.options.icon = DefaultIcon;

              return (
                <Marker
                  position={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  icon={DefaultIcon}
                  key={index}
                >
                  <Popup>
                    <div className="tooltips">
                      <div className="tooltips_img">
                        <img src={item.mapimage} alt="poi image" />
                      </div>
                      <div className="tooltips_direction">
                        <h6>{item.text.name}</h6>
                        <div
                          className="direction_img"
                          onClick={() =>
                            dispatch(
                              showNotification(
                                t("Development is in progress !")
                              )
                            )
                          }
                        >
                          <img src={Direction} alt="direction icon" />
                        </div>
                      </div>
                      <h5 className="tool_category_name">
                        {item.text.category_name}
                      </h5>
                      <div className="tool_num">
                        <span className="tools_outlet_name">
                          {item.text.outlet_name}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            });
          })}

        {poiLayerState === true &&
          poiLayersEnableState === true &&
          allPoiShow === true &&
          radiusBasedMarkerData &&
          radiusBasedMarkerData.map((it, index) => {
            return it.map((item, index) => {
              const position = item.position;
              const coordinates = [position.lat, position.lon];

              if (!allPois.includes(item.id)) {
                setAllPois((itm) => {
                  return [...itm, item.id];
                });
              }
              // adding css to the marker icon ;
              let DefaultIcon = L.icon({
                iconUrl: item.image,
                iconSize: 60,
              });

              L.Marker.prototype.options.icon = DefaultIcon;

              return (
                <Marker
                  position={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  icon={DefaultIcon}
                  key={index}
                >
                  <Popup>
                    <div className="tooltips">
                      <div className="tooltips_img">
                        <img src={item.mapimage} alt="poi image" />
                      </div>
                      <div className="tooltips_direction">
                        <h6>{item.text.name}</h6>
                        <div
                          className="direction_img"
                          onClick={() =>
                            dispatch(
                              showNotification(
                                t("Development is in progress !")
                              )
                            )
                          }
                        >
                          <img src={Direction} alt="direction icon" />
                        </div>
                      </div>
                      <h5 className="tool_category_name">
                        {item.text.category_name}
                      </h5>
                      <div className="tool_num">
                        <span className="tools_outlet_name">
                          {item.text.outlet_name}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            });
          })}

        {poiLayerState === true &&
          poiLayersEnableState === true &&
          allPoiShow === true &&
          roadBasedMarkerData &&
          roadBasedMarkerData.map((it, index) => {
            return it.map((item, index) => {
              const position = item.position;
              const coordinates = [position.lat, position.lon];

              if (!allPois.includes(item.id)) {
                setAllPois((itm) => {
                  return [...itm, item.id];
                });
              }
              // adding css to the marker icon ;
              let DefaultIcon = L.icon({
                iconUrl: item.image,
                iconSize: 60,
              });

              L.Marker.prototype.options.icon = DefaultIcon;

              return (
                <Marker
                  position={coordinates}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                    click: (e) => {
                      e.target.openPopup();
                    },
                  }}
                  icon={DefaultIcon}
                  key={index}
                >
                  <Popup>
                    <div className="tooltips">
                      <div className="tooltips_img">
                        <img src={item.mapimage} alt="poi image" />
                      </div>
                      <div className="tooltips_direction">
                        <h6>{item.text.name}</h6>
                        <div
                          className="direction_img"
                          onClick={() =>
                            dispatch(
                              showNotification(
                                t("Development is in progress !")
                              )
                            )
                          }
                        >
                          <img src={Direction} alt="direction icon" />
                        </div>
                      </div>
                      <h5 className="tool_category_name">
                        {item.text.category_name}
                      </h5>
                      <div className="tool_num">
                        <span className="tools_outlet_name">
                          {item.text.outlet_name}
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            });
          })}

        {poiLayerState && (
          <div
            className="poiLayer_refresh"
            onClick={updatePoiLayers}
          >
            <span>{t("Get POI")}</span>
          </div>
        )}

        <CuttedPointsNotify
          setLoading={setLoading}
          showCuttedPoints={showCuttedPoints}
          points={totalPoints}
          setShowCuttedPoints={setShowCuttedPoints}
          setAllPoiShow={setAllPoiShow}
          setShowAllPoi={setShowAllPoi}
        />

        {/* here we are adding the loader */}
        {loading && <Loader />}
      </div>
    </>
  );
});

export default PoiLayers;
