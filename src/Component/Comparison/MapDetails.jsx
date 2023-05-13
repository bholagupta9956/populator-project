// here we will write all the details of the map ;
import React, { useEffect, useState } from "react";
import "./comparison.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  Marker,
  Popup,
  Polygon,
  Polyline,
  Circle,
  Rectangle,
  useMap,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import Loader from "../../utils/Loader";
import PlotsGraph from "./GraphsPart/PlotsGraph";
import axios from "axios";
import PopulationGraph from "./GraphsPart/PopulationGraph ";
import SocialClass from "./GraphsPart/socialClass";



const MapDetails = () => {
  const shapeData = useSelector((state) => state.comparison.allShapesData);
  const map = useMap();
  const zoom = map._zoom - 2;
  const [loading, setLoading] = useState(false);

  const items = {
    area: "7.65 km2",
    population: "39,148",
    female: "35%",
    male: "56%",
    rich: "87%",
    middle: "24%",
    homes: "56,234",
    incomes: "23,5432",
    area_coverage: "43,233 km2",
    plots: "23,432",
  };


  const dispatch = useDispatch();

  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);

  const urlLink = `${api}comparison`;
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setStoreData([]);

    if (shapeData.length > 0) {
      for (var i = 0; i < shapeData.length; i++) {
        const dta = shapeData[i];

        const center = dta.center;

        if (dta.type === "circle" && dta.saved === 1) {
          const data = {
            type: dta.type,
            radius: dta.radius,
            lat: dta.lng,
            lng: dta.lat,
          };

          console.log(JSON.stringify(data) , "data here")

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              setLoading(false);
              if (res.data.success) {
                const val = res.data;
                const map = {
                  s: dta.type,
                  c: center,
                  r: dta.radius,
                };
                const value = {
                  map: map,
                  val: val,
                };

                console.log(
                  value,
                  "this is the data which we are getting here"
                );
                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (
          (dta.type === "rectangle" && dta.saved === 1) 
          // ||
          // (dta.type === "polygon" && dta.saved === 1)
        ) {

          console.log(dta , "this is the dta");
          const coord = JSON.parse(dta.coord);

          let latlngs = "";
          const shapeData1 = coord;
          const shapeData = [...shapeData1, shapeData1[0]];
          for (let i = 0; i < shapeData.length; i++) {
            latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
          }

          latlngs = latlngs.replace(/,$/, "");
          const data = {
            type: dta.type,
            latlng: latlngs,
          };

          console.log(JSON.stringify(data) , "data here for rectanagle");

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  s: dta.type,
                  c: center,
                  coord: coord,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (
          (dta.type === "polygon" && dta.saved === 1)
        ) {

          console.log(dta , "this is the dta");
          const coord = JSON.parse(dta.coord);

          let latlngs = "";
          const shapeData1 = coord;
          const shapeData = [...shapeData1, shapeData1[0]];
          for (let i = 0; i < shapeData.length; i++) {
            latlngs = latlngs + `${shapeData[i].lng} ${shapeData[i].lat},`;
          }

          latlngs = latlngs.replace(/,$/, "");
          const data = {
            type: dta.type,
            latlng: latlngs,
          };

          console.log(JSON.stringify(data) , "data here for rectanagle");
          
          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  s: dta.type,
                  c: center,
                  coord: coord,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (dta.type === "road" && dta.saved === 1) {
          let latlngs = "";
          const shapeData1 = dta.coord;
          const shapeData = [...shapeData1, shapeData1[0]];
          for (let i = 0; i < shapeData.length; i++) {
            latlngs = latlngs + `${shapeData[i][1]} ${shapeData[i][0]},`;
          }

          latlngs = latlngs.replace(/,$/, "");
          const data = {
            type: "polygon",
            latlng: latlngs,
          };

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res)
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  s: "road",
                  c: dta.center,
                  coord: dta.coord,
                  lineCoord: dta.lineCoord,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (dta.type === "radius" && dta.saved === 1) {
          const data = {
            type: "circle",
            radius: dta.radius,
            lat: dta.center[1],
            lng: dta.center[0],
          };

          console.log(data , "radius data")

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res)
              setLoading(false);
              if (res.data.success) {
                const val = res.data;
                const radiusVal = dta.radius / 5;

                const circleVal = [
                  { rad: radiusVal, color: "purple", center: dta.center },
                  { rad: radiusVal * 2, color: "green", center: dta.center },
                  {
                    rad: radiusVal * 3,
                    color: "rgb(0,161,228)",
                    center: dta.center,
                  },
                  { rad: radiusVal * 4, color: "orange", center: dta.center },
                  { rad: radiusVal * 5, color: "red", center: dta.center },
                ];

                const map = {
                  s: "radius",
                  c: dta.center,
                  r: dta.radius,
                  circleVal: circleVal,
                  lineCoord: dta.lineCoord,
                };
                const value = {
                  map: map,
                  val: val,
                };
                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
        
         else if (dta.type === "circle" && dta.saved === 0) {
          const data = {
            type: dta.type,
            radius: parseInt(dta.radius),
            lat: dta.lat,
            lng: dta.lng,
          };

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res, "this is the res");

              setLoading(false);
              if (res.data.success) {
                const val = res.data;
                const map = {
                  s: dta.type,
                  c: center,
                  r: dta.radius,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (
          (dta.type === "rectangle" && dta.saved === 0) ||
          (dta.type === "polygon" && dta.saved === 0)
        ) {
          const centr = dta.center;
          const coord = JSON.parse(dta.coord);
          const data = {
            type: dta.type,
            latlng: dta.latlng,
          };

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              console.log(res);
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  s: dta.type,
                  c: centr,
                  coord: coord,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
         else if (dta.type === "roadBased" && dta.saved === 0) {
         
          const centr = JSON.parse(dta.center);
          const coord = JSON.parse(dta.polylineData);
          const lineData = JSON.parse(dta.lineData);

          const data = {
            type: "polygon",
            latlng: dta.latlng,
          };

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  s: "road",
                  c: centr,
                  coord: coord,
                  lineCoord: lineData,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
                });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        }
        else if (dta.type === "radiusBased" && dta.saved === 0) {

          const radius = parseInt(dta.radius);
          const center = JSON.parse(dta.center);
          const coord = JSON.parse(dta.polylineData);
          const lineCoord = JSON.parse(dta.lineData);

          const data = {
            type: "circle",
            radius: dta.radius,
            lat: dta.lat,
            lng: dta.lng,
          };

          axios
            .post(urlLink, data, {
              headers: {
                Authorization: `Bearer ${Token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
              setLoading(false);
              if (res.data.success) {
                const val = res.data;
                const radiusVal = radius / 5;

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

                const map = {
                  s: "radius",
                  c: center,
                  r: radius,
                  circleVal: circleVal,
                  lineCoord: lineCoord,
                };
                const value = {
                  map: map,
                  val: val,
                };

                setStoreData((itm) => {
                  return [...itm, value];
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
  }, [shapeData]);

  
  return (
    <>
      <div className="mapdetails">
        {storeData &&
          storeData.map((itms, index) => {

            const center =
              itms.map.s === "circle" ||
              itms.map.s === "polygon" ||
              itms.map.s === "rectangle"
                ? JSON.parse(itms.map.c)
                : itms.map.c;

            return (
              <div className="mapDetails_box" key={index}>
                <MapContainer
                  center={center}
                  zoom={zoom}
                  zoomControl={false}
                  className="mapDetails_box2"
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

                  {/* here we are adding the shapes which are created at the main map */}

                  {itms.map.s === "circle" && (
                    <Circle
                      center={center}
                      radius={itms.map.r}
                      showMeasurements={true}
                      pathOptions={{ color: "red" }}
                    />
                  )}

                  {itms.map.s === "polygon" && (
                    <Polygon
                      showMeasurements={true}
                      positions={itms.map.coord}
                      pathOptions={{ color: "red" }}
                    />
                  )}

                  {itms.map.s === "rectangle" && (
                    <Polygon
                      showMeasurements={true}
                      positions={itms.map.coord}
                      pathOptions={{ color: "red" }}
                    />
                  )}

                  {itms.map.s === "road" && (
                    <Polyline
                      positions={itms.map.coord}
                      pathOptions={{ color: "red" }}
                    />
                  )}

                  {itms.map.s === "road" && (
                    <Polyline
                      positions={itms.map.lineCoord}
                      pathOptions={{ color: "rgb(97, 94, 94)" }}
                    />
                  )}

                  {/* here we are adding the shapes which are created at the main map */}

                  {itms.map.s === "radius" &&
                    itms.map.circleVal.map((it, index) => {
                      return (
                        <Circle
                          center={it.center}
                          key={index}
                          radius={it.rad}
                          pathOptions={{ color: it.color, fill: false }}
                        />
                      );
                    })}

                  {itms.map.s === "radius" && (
                    <Polyline
                      positions={itms.map.lineCoord}
                      pathOptions={{ color: "rgb(97, 94, 94)" }}
                    />
                  )}
                </MapContainer>
                <div className="map_num">
                  <div className="map_num_box">
                    <h6>{itms.val.areakm} km2</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.population}</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.female} %</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.male} %</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.rich} %</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.midclass} %</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.homes}</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.incomes} SAR</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.road_coverage} km</h6>
                  </div>
                  <div className="map_num_box">
                    <h6>{itms.val.total_plots}</h6>
                  </div>
                </div>

                {/* from here will add the graphical part of the project */}
                <div className="comparisonGraph">
                  <SocialClass
                    poor={itms.val.poor}
                    rich={itms.val.rich}
                    midclass={itms.val.midclass}
                    unclassified={itms.val.unClassified}
                  />
                  <PlotsGraph name={itms.val.plots} value={itms.val[0]} />
                  <PopulationGraph val={itms.val} />
                </div>
              </div>
            );
          })}

        {/* here we are adding a loader */}
        {/* {loading && <Loader/>} */}
      </div>
    </>
  );
};

// exporting the component ;
export default MapDetails;
