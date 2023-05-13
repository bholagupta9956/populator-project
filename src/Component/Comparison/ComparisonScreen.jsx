// This is the the comparison screen which we are designing  here ;
import React, { useState, useEffect } from "react";
import "./comparison.css";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  MapContainer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Rectangle,
  useMap,
  TileLayer,
  MapConsumer,
} from "react-leaflet";
import Cut from "../ControlPanel/ControlImages/cut.svg";
import { cutProfileScreen } from "../../actions";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Loader from "../../utils/Loader";

const ComparisonScreen = (props) => {
  const { selectedShape, setSelectedShape } = props;

  const shapeData = useSelector((state) => state.createShapesRecord.data[0]);
  const dispatch = useDispatch();
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const [loading, setLoading] = useState(false);
  const map = useMap();
  const [shapesData, setShapesData] = useState([]);

  const zoom = map._zoom - 1;
  const { t, i18n } = useTranslation();

  const [shapeId, setShapeId] = useState([]);

  const selectShape = (e, itm, index) => {
    if (selectedShape.some((item) => item.unique_id === itm.unique_id)) {
      const filterData = selectedShape.filter(
        (item, index) => item.unique_id !== itm.unique_id
      );
      setSelectedShape(filterData);
    } else {
      setSelectedShape((item) => [...item, itm]);
    }
  };

  const urlLin = `${api}get-shape-created`;

  const alreadySelectedShapes = useSelector(
    (state) => state.comparison.shapeDetails
  );

  

  // here we are getting data ;

  useEffect(() => {
    setLoading(true);

    const url = `${api}get-shape-group`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          const val = res.data.groups;

          for (var i = 0; i < val.length; i++) {
            axios
              .post(
                urlLin,
                { group: val[i].sGroup },
                {
                  headers: {
                    Authorization: `Bearer ${Token}`,
                    Accept: "application/json",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                if (res.data.shape) {
                  const anotherVal = res.data.shape;

                  for(var l = 0 ; l < anotherVal.length ; l++){
                    const actualVal = anotherVal[l];
                   
                     setShapesData((items) => {return [...items , actualVal]})
                  }
                }
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const closePopup = () => {
    dispatch(cutProfileScreen());
  };

  return (
    <>
      <div className="comparison">
        <div className="comparison_body">
          {shapesData &&
            shapesData.map((item, index) => {
              const center = JSON.parse(item.center);
              const coord = JSON.parse(item.coord);
              const radius = item.radius;
              return (
                <>
                  <div className="comparison_main_box" key={index}>
        <MapContainer
                      center={center}
                      zoom={zoom}
                      zoomControl={false}
                      className="comparison_box"
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
                      <input
                        type="checkbox"
                        className="comparison_input"
                        onChange={(e) => selectShape(e, item, index)}
                        checked={selectedShape.some(
                          (itmm) => itmm.unique_id === item.unique_id
                        )}
                      />

        {/* here we are adding the shapes which are created at the main map */}

        {item.type === "circle" && item.saved === 1 && (
                        <Circle
                          center={center}
                          radius={radius}
                          showMeasurements={true}
                          pathOptions={{ color: "red" }}
                        />
                      )}

                      {item.type === "polygon" && item.saved === 1 && (
                        <Polygon
                          showMeasurements={true}
                          positions={coord}
                          pathOptions={{ color: "red" }}
                        />
                      )}

                      {item.type === "rectangle" && item.saved === 1 && (
                        <Polygon
                          showMeasurements={true}
                          positions={coord}
                          pathOptions={{ color: "red" }}
                        />
                      )}
                    </MapContainer> 
        <div className="comp_rht_box">
                      <div className="comp_rht_box_ss">
                        <h6>{t("Name")} </h6> :<span>{item.name}</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Group")} </h6> :<span>{item.sGroup}</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Area")} </h6> : <span>{item.area}</span>
                      </div>
                      <div className="comp_rht_box_ss">
                        <h6>{t("Date")} </h6> :<span>{item.created_at}</span>
                      </div>
                    </div>
        </div>
                </>
              );
            })}

          {shapesData && shapesData.length === 0 && (
            <h5 style={{ margin: "15px" }}>
              {" "}
              {t("Sorry ! No data available")}{" "}
            </h5>
          )}
        </div>

        {/* here we are adding  the loader  */}

        {loading && <Loader />}
      </div>
      {/* </Modal> */}
    </>
  );
};

// export default component;
export default ComparisonScreen;
