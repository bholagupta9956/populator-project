// here we are creating the component whch will show the data part here ;

import React, { useState, createRef, useEffect } from "react";
import "../catchment.css";
import Darkgraph from "../images/darkgraphs.svg";
import Population from "../images/population.svg";
import Home from "../images/home2.svg";
import Income from "../images/income.svg";
import LineBar from "../images/linebar.svg";
import Incomegraph from "../images/incomegraph.svg";
import Arealine from "../images/areachart.svg";
import Roadline from "../images/roadlines.svg";
import PieChartGraph from "./CatchmentGraph/Piechart";
import DoubleLinegraph from "./CatchmentGraph/DoubleLinegraph";
import PyramidGraph from "./CatchmentGraph/PyramidGraph";
import { useTranslation } from "react-i18next";
import Loader2 from "../../../utils/Loader2";
import Plots from "../images/landpart.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { showNotification } from "../../../actions";

const DataPart = (props) => {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const alreadyCheckedServices = useSelector(
    (state) => state.poiCheckedItem.servicesCheckedItems
  );
  const [resultData, setResultData] = useState({});
  const [loading , setLoading] = useState(false);
  const cuttedPoints = useSelector(
    (state) => state.selectedFeaturesRecord.totalCuttedPoints
  );
  const selectedCategoryArray = useSelector(
    (state) => state.selectedFeaturesRecord.data
  );
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.authenication.token);

  // here we are getting the date ;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  const urlLink = `${api}get-scan-result`;

  useEffect(() => {
    setLoading(true);

    if (alreadyCheckedServices.length > 0) {
      setItems([]);
      for (var i = 0; i < alreadyCheckedServices.length; i++) {
        const value = alreadyCheckedServices[i];
        setItems((item) => {
          return [...item, value];
        });
      }
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    };

    if (props.shape == "radius") {
      const data = {
        lat: props.center[1],
        radius: props.radius,
        lng: props.center[0],
        type: "circle",
        total_points_deducted: cuttedPoints,
        services: selectedCategoryArray,
        date: today,
      };


      axios
        .post(urlLink, data, { headers: headers })
        .then((res) => {
          if (res.data.message === "Insufficient funds") {
            setLoading(false)
            dispatch(
              showNotification(
                "Insufficient points, please add more to continue !"
              )
            );
          } else if (res.data) {
            setLoading(false)
            setResultData(res.data);
          }
        })
        .catch((err) => {
          setLoading(false)
          alert("Something went wrong with the server");
        });
    } else if (props.shape === "road") {
     
      const data = {
        lat: props.center[1],
        radius: props.radius,
        lng: props.center[0],
        type: "circle",
        total_points_deducted: cuttedPoints,
        services: selectedCategoryArray,
        date: today,
      };
      
      axios
        .post(urlLink, data, { headers: headers })
        .then((res) => {
          
          if (res.data.message === "Insufficient funds") {
            setLoading(false)
            dispatch(
              showNotification(
                "Insufficient points, please add more to continue !"
              )
            );
          } else if (res.data) {
            setLoading(false)
            setResultData(res.data);
          }
        })
        .catch((err) => {
          setLoading(false)
          alert("Something went wrong with the server");
        });
    }
  }, []);

  return (
    <>
      <div>
        {props.shape === "radius" && (
          <h5 className="circle" style={{ background: props.color }}> {t("Circle")}
            {props.name} {t("of radius")} &nbsp; {props.radius} {t("m")} &nbsp; & &nbsp;{" "}
            {resultData.area} ({t("KM²")})
          </h5>
        )}

        {props.shape === "road" && (
          <h5 className="circle" style={{ background: props.color }}>
            {props.name} {t("of area")} &nbsp; {resultData.area} ({t("KM²")})
          </h5>
        )}

        <div className="dataresult_row2">
          {items.indexOf(5) !== -1 && (
            <div className="dataresult_row2_box1">
              <div className="dataresult_row2_box_item">
                <img
                  src={Population}
                  alt="population icons"
                  style={{ width: "18px", margin: "4px 12px" }}
                />
                <span>{t("POPULATION")}</span>
              </div>
              <div className="dataresult_row2_box1_col1">
                <img src={LineBar} alt="linebar icon" />
                <div className="dataresult_row2_box1_col1_1">
                  <h6>{resultData.population}</h6>
                  <span>{t("Selected Area Population")}</span>
                </div>
              </div>
            </div>
          )}

          {items.indexOf(6) !== -1 && (
            <div className="dataresult_row2_box2">
              <div className="dataresult_row2_box_item">
                <img
                  src={Home}
                  alt="population icons"
                  style={{ width: "17px", margin: "4px 12px" }}
                />
                <span>{t("# OF HOMES")}</span>
              </div>
              <div className="dataresult_row2_box2_data">
                <h6>{resultData.homes}</h6>
                <span>{t("Home In Selected Area")}</span>
              </div>
            </div>
          )}

          {items.indexOf(8) !== -1 && (
            <div className="dataresult_row2_box3">
              <div className="dataresult_row2_box_item">
                <img
                  src={Income}
                  alt="population icons"
                  style={{ width: "19px", margin: "4px 12px" }}
                />
                <span>{t("INCOME")}</span>
              </div>
              <div className="dataresult_row2_box3_data">
                <h6>{resultData.incomes}</h6>
                <img src={Incomegraph} alt=" graph " width="100%" />
              </div>
            </div>
          )}

          {items.indexOf(12) !== -1 && (
            <div className="dataresult_row3_box1">
              <div className="dataresult_row3_box_item">
                <img
                  src={Roadline}
                  alt="population icons"
                  style={{ width: "18px", margin: "4px 12px" }}
                />
                <span>{t("ROADS COVERAGE")}</span>
              </div>
              <div className="dataresult_row3_box1_data">
                <div>
                  <h6>{resultData.road_coverage}</h6>
                  <span> {t("Area Coverage")}</span>
                </div>
                <img src={Darkgraph} alt="dark graph" />
              </div>
            </div>
          )}

          {items.indexOf(11) !== -1 && (
            <div className="dataresult_row3_box2">
              <div className="dataresult_row3_box_item">
                <img
                  src={Arealine}
                  alt="population icons"
                  style={{ width: "16px", margin: "4px 12px" }}
                />
                <span>{t("AREA IN (KM²)")}</span>
              </div>
              <div className="dataresult_row3_box2_data">
                <h6>{resultData.area}</h6>
                <span>{t("Selected Area On Map")}</span>
              </div>
            </div>
          )}

          {items.indexOf(10) !== -1 && (
            <div className="dataresult_row3_box3">
              <div className="dataresult_row3_box_item">
                <img
                  src={Plots}
                  alt="population icons"
                  style={{ width: "18px", margin: "4px 12px" }}
                />
                <span>{t("PLOTS")}</span>
              </div>
              <div
                className="dataresult_row3_box3_data"
                style={{ marginTop: "12px" }}
              >
                <h6>{resultData.total_plots}</h6>

                <span>{t("Selected Plots on Map")}</span>
              </div>
            </div>
          )}
        </div>

        {/* here we are adding the graphs */}
        <div className="dataresult_row3">
          {/* here we are adding the graphical data which will be shown below the numeric data */}

          <div className="graphs" style={{ background: "white" }}>
            <div className="graphs_first_row">
              {items.indexOf(9) !== -1 && (
                <PieChartGraph resultData={resultData} />
              )}
              {items.indexOf(5) !== -1 && (
                <PyramidGraph resultData={resultData} />
              )}
            </div>
            <div className="graphs_second_row" style={{ background: "white" }}>
              {items.indexOf(10) !== -1 && (
                <DoubleLinegraph resultData={resultData} />
              )}
              {/* <BarLinegraph /> */}
            </div>
          </div>
        </div>

        {/* {loading && <Loader2 />} */}
      </div>
    </>
  );
};

export default DataPart;
