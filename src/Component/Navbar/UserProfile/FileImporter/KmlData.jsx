// this is component which will show you the kml files ;

import React, { useEffect } from "react";
import icon from "leaflet/dist/images/marker-icon.png";
import parseKML from "parse-kml";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "parse-json/index";
import "parse-kml/index";
import { useMap, Marker , Polygon , Polyline ,} from "react-leaflet";
import toGeoJSON from "@mapbox/togeojson";
import { useSelector, useDispatch } from "react-redux";
import ReactLeafletKml from "react-leaflet-kml";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import L from "leaflet";
import { cutProfileScreen, disableMapFlying } from "../../../../actions";


const KmlData = () => {
  // getting the kml file which we have saved to the store ;
  const dispatch = useDispatch();
  const kmldata = useSelector((state) => state.fileImporter.kmlDatas);
  const parser = new DOMParser();
  const kml = parser.parseFromString(kmldata, "text/xml");
  const map = useMap();
  var converted = toGeoJSON.kml(kml);
  var orgData = converted.features;
  
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  
   L.Marker.prototype.options.icon = DefaultIcon;

  var polygonData = [];
  var markerData = [];
  var polyLineData = [];

  
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

    const flyMapState = useSelector((state) => state.fileImporter.flymap)

  useEffect(() => {

    if (markerData.length > 0 && flyMapState === true) {
      const flyLocation = markerData[0];
      map.flyTo(flyLocation, 7);
      dispatch(cutProfileScreen())
    } else if (polygonData.length > 0 && flyMapState === true) {
      const flyLocation = polygonData[0][0];
      map.flyTo(flyLocation, 7);
      dispatch(cutProfileScreen())
    } else if (polyLineData.length > 0 && flyMapState === true) {
      const flyLocation = polyLineData[0][0];
      map.flyTo(flyLocation, 7);
      dispatch(cutProfileScreen())
    }

    setTimeout(() => {
      dispatch(disableMapFlying());
   }, 2000);
  }, [kmldata]);

  const mapLocation = useSelector((state) => state.mapLocation.coordinates);

 

  return (
    <>

      {/* {kml && <ReactLeafletKml kml={kml} />} */}

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

// exporting the component ;
export default KmlData;
