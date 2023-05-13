// Here we are using the catchment result ; where we going to show the resutl screen ;
import React from "react";
import Catchment from "../Catchment";
import { Modal } from "react-bootstrap";
import CatchmentMap from "./CatchmentMap";
import Cut from "../images/cut.svg";
import "../catchment.css";
import DataPart from "./DataPart";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { hideCatchmentResultScreen } from "../../../actions";

const CatchmentResult = () => {
  const myState = useSelector(
    (state) => state.catchmentData.CatchmentResultScreen
  );
  const MapData = useSelector((state) => state.catchmentData.circleData);
  const dispatch = useDispatch();
  const { t , i18n} = useTranslation();
  const api = useSelector((state) => state.apiStore.url);

  const center = MapData.center ;
  const types = MapData.type ;
  const radiusVal = MapData.radius ;
  const radius1 = radiusVal/5 * 1;
  const radius2 = radiusVal/5 * 2;
  const radius3 = radiusVal/5 * 3 ;
  const radius4 = radiusVal/5 * 4 ;
  const radius5 = radiusVal/5 * 5;

  return (
    <>
      <Modal
        show={myState}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="catchmentResult">
          <CatchmentMap />
          <div className="dataPart">
            <div className="dataresult_rows">
              {types === "radius" && (<>
                 <DataPart center = {center} radius={radius1} shape={"radius"} name="1" color="purple"/>
                 <DataPart center = {center} radius={radius2} shape={"radius"} name="2" color="green"/>
                 <DataPart center = {center} radius={radius3} shape={"radius"} name="3" color="rgb(0,161,228)"/>
                 <DataPart center = {center} radius={radius4} shape={"radius"} name="4" color="orange"/>
                 <DataPart center = {center} radius={radius5} shape={"radius"} name="5" color="red"/>
                 </> )
              }

              {
                types === "road" && (<>
                  <DataPart polygonBorder={MapData.polygonBorder} shape={"road"} name={t("Polygon")} color="rgb(0,161,228)" radius={MapData.radius} center={center}/>
                </>)
              }
             
            </div>
          </div>

          <div
            className="cut_options"
            onClick={() => dispatch(hideCatchmentResultScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CatchmentResult;
