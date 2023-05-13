// here we are going to create a component which will show the map on the save screen ;

import React, { useState, useEffect } from "react";
import "./shapes.css";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  Polygon,
  Circle,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import { useSelector, useDispatch } from "react-redux";

const ShapesMap = () => {
  const map = useMap();
  const zoom = map._zoom -1;
  const actualZoom = zoom - 1 ;

  const urllink =
    "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi";

  const attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributed by skyview';

  
  const [circleRadius, setCircleRadius] = useState(400);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const coords = useSelector((state) => state.saveShape.data);
  const shape = coords.type;

  const [position, setPosition] = useState(coords.center);
  const [circleCenter , setCircleCenter] = useState(coords.center)

  useEffect(() => {
    if (shape === "circle") {
      setPosition(coords.center);
      setPolygonCoords([])
      setCircleRadius(coords.radius);
    } else if (shape === "polygon") {
      setPosition(coords.center);
      setCircleRadius(0)
      setCircleCenter([0,0])
      setPolygonCoords(coords.coordinates);
    }
    else if(shape === "rectangle"){
      setPosition(coords.center);
      setCircleRadius(0)
      setCircleCenter([0,0])
      setPolygonCoords(coords.coordinates);
    }
  }, []);

  return (
    <>
      <MapContainer
        className="shapesMap"
        center={position}
        zoom={actualZoom}
        zoomControl={false}
      >
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* here we are adding the shapes which are created at the main map */}

        <Polygon
          showMeasurements={true}
          positions={polygonCoords}
          pathOptions={{ color: "red" }}
        />

        <Circle
          center={circleCenter}
          radius={circleRadius}
          showMeasurements={true}
          pathOptions={{ color: "red" }}
        />
      </MapContainer>
    </>
  );
};

// exporting the shapesMap component ;
export default ShapesMap;
