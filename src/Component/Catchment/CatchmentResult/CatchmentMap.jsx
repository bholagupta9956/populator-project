// here we are going to show the map result ;
import React, { useState } from "react";
import {
  MapContainer,
  useMap,
  TileLayer,
  Polygon,
  Polyline,
  Circle,
} from "react-leaflet";
import { useTranslation } from "react-i18next";
import "../catchment.css";
import Graphs from "../images/graphs.svg";
import { useSelector } from "react-redux";
import Homes from "../images/home.svg";
import Population from "../images/population.svg";
import School from "../images/school.svg";

const CatchmentMap = () => {
  const map = useMap();
  const [maps, setMaps] = useState();
  const zoom = map.getZoom();
  const { t, i18n } = useTranslation();
  const MapData = useSelector((state) => state.catchmentData.circleData);
  const position = MapData.center;
  const api = useSelector((state) => state.apiStore.url);
  //  const position = [51.9,-0.23];

  const [circleArray, setCircleArray] = useState([]);
  const [circumference, setCircumference] = useState([]);
  const [circlePolygon, setCirclePolygon] = useState([]);
  const [radius, setRadius] = useState(500);
  const [type, setType] = useState("radius");

  const [polygonBorder, setPolygonBorder] = useState([]);
  const [polygonLine, setPolygonLine] = useState([]);

  useState(() => {
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
      <div className="mapResult">
        <MapContainer
          whenCreated={setMaps}
          className="mapResultView"
          center={position}
          zoom={zoom}
          zoomControl={false}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          
      {/* here we are writing code for the type when it is radius */}

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
      </div>
    </>
  );
};

// exporting the component
export default CatchmentMap;
