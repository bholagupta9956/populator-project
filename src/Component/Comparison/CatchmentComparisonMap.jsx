// This is the catchment comparison map here we are getting details ;

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
  Polyline,
  Popup,
  Polygon,
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
import CatchmentComparisonDetails from "./CatchmentComparisonDetails";

const CatchmentComparisonMap = () => {
  const dispatch = useDispatch();

  const map = useMap();
  const zoom = map._zoom;
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState([]);

  const shapeId = useSelector(
    (state) => state.comparison.catchmentShapeDetails
  );

  const shapeData = useSelector(
    (state) => state.comparison.catchmentAllShapesData
  );

  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);

  const urlLink = `${api}comparison`;

  useEffect(() => {
    setLoading(true);
    setStoreData([]);

    if (shapeId.length > 0 && shapeData.length > 0) {
      for (var i = 0; i < shapeId.length; i++) {
        const dta = shapeData[shapeId[i]];
        console.log(dta.type , "data type gere")
        if (dta.type === "radius") {
          const data = {
            type: "circle",
            radius: dta.radius,
            lat: dta.center[1],
            lng: dta.center[0],
          }

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
                  type: "radius",
                  center: dta.center,
                  radius: dta.radius,
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
        } else if (dta.type === "road") {

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
              setLoading(false);
              if (res.data.success) {
                const val = res.data;

                const map = {
                  type: "road",
                  center: dta.center,
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
      }
    }
  }, [shapeId]);

  return (
    <>
      <div className="mapdetails">
        {storeData &&
          storeData.map((itms, index) => {
            return (
              <div className="mapDetails_box" key={index}>
                <MapContainer
                  center={itms.map.center}
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

                  {itms.map.type === "radius" &&
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

                  {itms.map.type === "radius" && (
                    <Polyline
                      positions={itms.map.lineCoord}
                      pathOptions={{ color: "rgb(97, 94, 94)" }}
                    />
                  )}

                  {itms.map.type === "road" && (
                    <Polyline
                      positions={itms.map.coord}
                      pathOptions={{ color: "red" }}
                    />
                  )}

                  {itms.map.type === "road" && (
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
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the component ;
export default CatchmentComparisonMap;
