// here we are creating a map which will be shown on the save screen ;

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  useMap,
  Polyline ,
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
  const zoom = map._zoom;
  const actualZoom = zoom ;
  const api = useSelector((state) => state.apiStore.url);

  const urllink =
    "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi";

  const attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributed by skyview';

  
  
  const coords = useSelector((state) => state.saveShape.data);
  const shape = coords.type;
  const MapData = useSelector((state) => state.catchmentData.circleData);
  const position = MapData.center;
  const [polygonBorder, setPolygonBorder] = useState([]);
  const [polygonLine, setPolygonLine] = useState([]);
  const [radius, setRadius] = useState(500);
  const [type, setType] = useState("radius");

  const [circleArray, setCircleArray] = useState([]);
  const [circumference, setCircumference] = useState([]);
  const [circlePolygon, setCirclePolygon] = useState([]);

  useEffect(() => {
    if (MapData.type === "radius") {
      setType("radius");
      setRadius(MapData.radius);
      const val = MapData.radius / 5;

      setCircleArray([
        { rad: val, color: "purple" },
        { rad: val * 2, color: "green" },
        { rad: val * 3, color: "rgb(0,161,228)" },
        { rad: val * 4, color: "orange" },
        { rad: val * 5, color: "red" },
      ]);

      setCircumference(MapData.radiusCicumference);
      setCirclePolygon(MapData.radiusPolylineData);

    } else if (MapData.type === "road") {
      setType("road");
      setRadius(MapData.radius);
      setPolygonBorder(MapData.polygonBorder);
      setPolygonLine(MapData.polygonLineData);
    }
  }, [MapData]);

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

        {MapData.type == "radius" &&circleArray &&
            circleArray.map((item, index) => {
              return (
                <Circle
                  center={position}
                  key={index}
                  radius={item.rad}
                  pathOptions={{ color: item.color, fill: false }}
                ></Circle>
              );
            })}

          {MapData.type == "radius" &&circlePolygon && (
            <Polyline
              pathOptions={{ color: "rgb(89, 87, 87)" }}
              positions={circlePolygon}
            />
          )}

          {MapData.type == "radius" && circumference && (
            <Polyline
              pathOptions={{ color: "rgb(237, 97, 123)" }}
              positions={circumference}
            />
          )}

          {/* here we are wriiting the code whenever the based is of road types  */}

          {MapData.type == "road" && polygonBorder && (
            <Polygon
              pathOptions={{ color: "rgb(245, 24, 54)", fill: false }}
              positions={polygonBorder.coords}
            ></Polygon>
          )}

          {MapData.type == "road" && polygonLine && (
            <Polyline
              pathOptions={{ color: "rgb(89, 87, 87)" }}
              positions={polygonLine}
            />
          )}
       
      </MapContainer>
    </>
  );
};

// exporting the shapesMap component ;
export default ShapesMap;
