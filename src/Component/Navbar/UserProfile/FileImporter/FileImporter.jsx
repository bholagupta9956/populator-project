// in this component we are creating a modal which will help us in importing files like geojson , kml , csv ;

import React, { useState } from "react";
import "./FileImporter.css";
import { useMap } from "react-leaflet";
import { Modal } from "react-bootstrap";
import Kml from "./FileImporterImages/kml.svg";
import Csv from "./FileImporterImages/csv.svg";
import GeoJson from "./FileImporterImages/geojson.svg";
import { parseKML } from "parse-kml";
import GeoJsonResult from "./GeoJSonResult";
import Cut from "./FileImporterImages/cut.svg";
import {
  cutProfileScreen,
  updateCsvData,
  updateKmlData,
  updateGeoJson,
} from "../../../../actions";
import { useDispatch } from "react-redux";
import ReactLeafletKml from "react-leaflet-kml";
import CSVReader from "react-csv-reader";
import KmlData from "./KmlData";
import { useTranslation } from "react-i18next";

const parser = new DOMParser();

const FileImporter = () => {
  const dispatch = useDispatch();
  const map = useMap();
  const [kmlFiles, setKmlFiles] = useState();
  const { t, i18n } = useTranslation();

  // here we are handling the csv file importer ;

  const handleForce = (data, fileInfo) => {
    dispatch(updateCsvData(data));
    dispatch(cutProfileScreen());
    // map.flyTo([40.73061, -73.935242]);
  };
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  const updateGeoJsonData = (file) => {
    let fileData = new FileReader();
    dispatch(cutProfileScreen());
    fileData.onloadend = function (event) {
      const result = event.target.result;
      const orgResult = JSON.parse(result);
      console.log(orgResult, "thsi is the result into the fileImporter ");
      dispatch(updateGeoJson(orgResult));
    };
    fileData.readAsText(file);
  };

  // here we are writing the function which will be used to import kml files ;
  let fileReader ;
  const handleFileRead = (e) =>{
    const content = fileReader.result; 
    dispatch(updateKmlData(content))
   
  }

  const updateKmls = (file) => {
    
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file)
    };
  
  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="fileImporter">
          <h5>{t("Load your own data")}</h5>
          <div className="fileImporter_format">
            <div className="fileImporter_format_col1">
              <img src={Csv} alt="csv image" />
              <h6>{t("CSV File")}</h6>

              <CSVReader
                id="importFile"
                label="import"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
                inputId="ObiWan"
                inputName="ObiWan"
                inputStyle={{ color: "red", display: "none" }}
                cssLabelClass="csv_label_reader"
                cssClass="csv_reader"
              />
            </div>
            <div className="fileImporter_format_col1">
              <label htmlFor="geojson" style={{ width: "100%" }}>
                <img src={GeoJson} alt="geojson icon" />
                <h6>{t("GeoJson File")}</h6>
                <input
                  type="file"
                  name="geojson"
                  id="geojson"
                  style={{ display: "none" }}
                  onChange={(e) => updateGeoJsonData(e.target.files[0])}
                />
              </label>
            </div>
            <div className="fileImporter_format_col3">
              <label htmlFor="kml" style={{ width: "100%" }}>
                <img src={Kml} alt="Kml icon" />
                <h6>{t("KML File")}</h6>
                <input
                  type="file"
                  name="kml"
                  onChange={(e) => updateKmls(e.target.files[0])}
                  id="kml"
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          <button
            className="fileImporter_btn"
            onClick={() => dispatch(cutProfileScreen())}
          >
            {t("Cancel")}
          </button>

          {/* here we are  adding the cut options  */}

          <div
            className="fileImporter_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon" />
          </div>
          {/* <ReactLeafletKml kml={kml} /> */}
        </div>
      </Modal>

    
    </>
  );
};
// exporting the file ;
export default FileImporter;
