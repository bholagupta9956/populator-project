// In this file we will desing the map which will be shown on the half part of the result screen ;

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Circle,
  Polygon,
  Marker,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";
import Graphs from "./ResultImages/graphs.svg";
import { useSelector } from "react-redux";
import Homes from "./ResultImages/home.svg";
import Population from "./ResultImages/population.svg";
import School from "./ResultImages/school.svg";
import "./Result.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useTranslation } from "react-i18next";
import "leaflet-measure-path/leaflet-measure-path.js";
import "leaflet-measure-path/leaflet-measure-path.css";
import { useDispatch } from "react-redux";
import { clearSelectedShapeData } from "../../actions";

const MapResult = () => {
  const map = useMap();
  const [maps, setMaps] = useState();
  const zoom = map.getZoom();
  const dispatch = useDispatch();
  const urllink =
    "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=qXyFgVsh7Jlg17o3rAGi";

  const attribution =
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributed by skyview';
  // const position = [51.51, -0.12]
  // const [position ,setPosition ] = useState([51.51 , -0.12]);
  
  const mapData = useSelector((state) => state.updateShapeData.rawData);
  const position = mapData.coords.center;

  const [polygon, setPolygon] = useState([]);
  const [circle, setCircle] = useState({
    center: [0, 0],
    radius: null,
  });

  const ResultData = useSelector((state) => state.resultScreenData.result);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (mapData.shape === "polygon") {
      setPolygon([mapData.coords.coord]);
    } else if (mapData.shape === "rectangle") {
      setPolygon([mapData.coords.coord]);
    } else if (mapData.shape === "circle") {
      setCircle({
        center: mapData.coords.center,
        radius: mapData.coords.radius,
      });
    }
  }, []);

  const shapesSelected = useSelector((state) => state.selectedShape.data);
  const mapState = useSelector((state) => state.selectedShape.show);

  useEffect(() => {
    if (mapState) {
      if (shapesSelected.shape === "polygon") {
        const flyLocation = shapesSelected.center
        if (maps != null) {
          maps.flyTo(flyLocation, zoom);
          const crds =shapesSelected.coords.coord
          setPolygon(crds);
          setCircle({
            radius: 0,
            center: [0, 0],
          });
        }
      } else if (shapesSelected.shape === "rectangle") {
        const flyLocation = shapesSelected.center
        if (maps != null) {
          maps.flyTo(flyLocation, zoom);
          const crds = shapesSelected.coords.coord
          setPolygon(crds);
          setCircle({
            radius: 0,
            center: [0, 0],
          });
        }
      } else if (shapesSelected.shape === "circle") {
        const flyLocation = shapesSelected.center
        if (maps != null) {
          maps.flyTo(flyLocation, zoom);
          const radi = shapesSelected.coords.radius
          setCircle({
            radius: radi,
            center: flyLocation,
          });
          setPolygon([]);
        }
        
      }
    }
  }, [shapesSelected]);

  return (
    <>
      <div className="mapResult">
        <MapContainer
          whenCreated={setMaps}
          className="mapResultView"
          center={position}
          zoom={zoom - 1}
          zoomControl={false}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <div className="mapResult_area">
            <div className="mapResult_area_col1">
              <h6>{t("Total Selected Area")}</h6>
              <h5>
                {ResultData.area} {t("KM")}
              </h5>
              <img src={Graphs} alt="graphs img" />
            </div>
            <div className="mapResult_area_col2">
              <div className="mapResult_area_col2_row1">
                <span>{t("Homes")} 45%</span>
                <div className="mapResult_area_col2_row1_view">
                  <img
                    src={Homes}
                    alt="home icon"
                    style={{ marginTop: "-4px" }}
                  />
                  <span
                    className="mapResult_area_col2_row1_view_box"
                    style={{ width: "45%" }}
                  ></span>
                </div>
              </div>

              <div className="mapResult_area_col2_row1">
                <span>{t("Population")} 70%</span>
                <div className="mapResult_area_col2_row1_view">
                  <img
                    src={Population}
                    alt="home icon"
                    style={{ marginTop: "-2px" }}
                  />
                  <span
                    className="mapResult_area_col2_row1_view_box"
                    style={{ width: "70%" }}
                  ></span>
                </div>
              </div>

              <div className="mapResult_area_col2_row1">
                <span>{t("Schools")} 85%</span>
                <div className="mapResult_area_col2_row1_view">
                  <img
                    src={School}
                    alt="home icon"
                    style={{
                      width: "14%",
                      margin: "0px 2px",
                      marginTop: "-3px",
                    }}
                  />
                  <span
                    className="mapResult_area_col2_row1_view_box"
                    style={{ width: "85%" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>e
          {/* h\ire we are adding the shapes which are created at the main map */}

          <Polygon
            showMeasurements={true}
            positions={polygon}
            pathOptions={{ color: "red" }}
          />

          <Circle
            center={circle.center}
            radius={circle.radius}
            showMeasurements={true}
            pathOptions={{ color: "red" }}
          />
        </MapContainer>
      </div>
    </>
  );
};

// exporting the results ;
export default MapResult;
