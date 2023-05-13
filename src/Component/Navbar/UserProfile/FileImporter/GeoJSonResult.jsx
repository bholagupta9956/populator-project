// This is the GeoJSonResult  which we are going to show the data in the form of polygon ;

import React, { useEffect, useState } from "react";
import { Polygon, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import L, { marker } from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { disableMapFlying } from "../../../../actions";

const GeoJsonResult = () => {
  const geoJsonData = useSelector((state) => state.fileImporter.geoJson);
  const dispatch = useDispatch();

  var polygonData = [];
  var markerData = [];
  var polyLineData = [];

  const map = useMap();
  const orgData = geoJsonData.features;

  if (orgData) {
    for (var i = 0; i < orgData.length; i++) {
      const type = orgData[i].geometry.type;

      if (type === "Polygon") {
        const coords = orgData[i].geometry.coordinates[0];
        polygonData.push(coords);
      } else if (type === "Point") {
        const coords = orgData[i].geometry.coordinates;
        markerData.push(coords);
      } else if (type === "LineString") {
        const coords = orgData[i].geometry.coordinates;
        polyLineData.push(coords);
      }
    }
  }
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  const flyMapState = useSelector((state) => state.fileImporter.flymap);

  useEffect(() => {
    if (markerData.length > 0 && flyMapState === true) {
      const flyLocation = markerData[0];
      map.flyTo(flyLocation, 7);
    } else if (polygonData.length > 0 && flyMapState === true) {
      const flyLocation = polygonData[0][0];
      map.flyTo(flyLocation, 7);
    } else if (polyLineData.length > 0 && flyMapState === true) {
      const flyLocation = polyLineData[0][0];
      map.flyTo(flyLocation, 7);
    }

    setTimeout(() => {
      dispatch(disableMapFlying());
    }, 2000);
  }, [geoJsonData]);

  

  return (
    <>
      {polygonData &&
        polygonData.map((item, index) => {
          return (
            <Polygon
              showMeasurements={true}
              key={index}
              positions={item}
              pathOptions={{ color: "red" }}
            ></Polygon>
          );
        })}

      {/* addding marker */}

      {markerData &&
        markerData.map((item, index) => {
          return (
            <Marker position={item} icon={DefaultIcon} key={index}></Marker>
          );
        })}

      {/* adding the polyline */}
      {polyLineData &&
        polyLineData.map((item, index) => {
          return (
            <Polyline
              pathOptions={{ color: "red" }}
              positions={item}
              key={index}
            />
          );
        })}
    </>
  );
};

// exporting the geoJsonResult ;
export default GeoJsonResult;
