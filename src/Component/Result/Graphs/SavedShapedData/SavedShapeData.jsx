// In This file we are going to create a component which will keepp all the record of the saved shapes details ;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./savedShape.css";
import Darkgraph from "../../ResultImages/darkgraphs.svg";
import Population from "../../ResultImages/population.svg";
import Home from "../../ResultImages/home2.svg";
import Income from "../../ResultImages/income.svg";
import LineBar from "../../ResultImages/linebar.svg";
import Incomegraph from "../../ResultImages/incomegraph.svg";
import Arealine from "../../ResultImages/areachart.svg";
import Circle from "../../ResultImages/circl.svg";
import Freeway from "../../ResultImages/freeway.svg";
import Traffic from "../../ResultImages/traffic.svg";
import Copy from "../../ResultImages/copy.svg";
import ShapeFile from "../../ResultImages/shapeFile.svg";
import { useTranslation } from "react-i18next";
import Rectangle from "../../ResultImages/rectangle.svg";
import Polygon from "../../ResultImages/polygon.svg";
import axios from "axios";
import Roadline from "../../ResultImages/roadlines.svg";
import Plots from "../../ResultImages/landpart.svg";
import {
  changeLanguage,
  getShapeData,
  openResultPanel,
  updateSelectedShapeData,
} from "../../../../actions";

const SavedShapeData = () => {
  // here we are writing the function which will show and which will be not shown ;

  const ResultData = useSelector((state) => state.resultScreenData.result);


  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const alreadyCheckedServices = useSelector(
    (state) => state.poiCheckedItem.servicesCheckedItems
  );

  const [group, setGroup] = useState([]);

  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.authenication.token);

  useEffect(() => {
    if (alreadyCheckedServices.length > 0) {
      setItems([]);
      for (var i = 0; i < alreadyCheckedServices.length; i++) {
        const value = alreadyCheckedServices[i];
        setItems((item) => {
          return [...item, value];
        });
      }
    }
  }, []);

  // here we are calling the function ;

  const [shapeData, setShapeData] = useState([]);
  const [shapeIcons, setShapeIcons] = useState([Polygon]);

  const urlLin = `${api}get-shape-created`;
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
        if (res.data.success) {
          const val = res.data.groups;
          setGroup(val);

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
                  for (var l = 0; l < anotherVal.length; l++) {
                    const actualVal = anotherVal[l];
                    setShapeData((item) => {
                      return [...item, actualVal];
                    });
                  }
                }
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        }
      });
  }, []);

  const createCircleShapes = (radi, centt) => {
    const cent = JSON.parse(centt);
    const data = {
      shape: "circle",
      center: cent,
      coords: { radius: radi, center: cent },
    };

    dispatch(updateSelectedShapeData(data));
    dispatch(getShapeData(data));
  };

  const createPolygonShapes = (shap, coor, cent) => {
    const center = JSON.parse(cent);
    const coordss = JSON.parse(coor);

    const data = {
      shape: shap,
      center: center,
      coords: { coord: coordss, center: center },
    };

    dispatch(updateSelectedShapeData(data));
    dispatch(getShapeData(data));
  };

  return (
    <>
      <div className="savedData">
        <div className="savedData_left">
          <div className="savedData_left_heading">
            <div className="sdf_heading_box">
              <img src={Copy} alt="icons" />
              <span> {t("Template")}</span>
            </div>
            <div className="sdf_heading_box">
              <img src={ShapeFile} alt="icons" style={{ width: "30px" }} />
              <span style={{ color: "var(--blue)" }}> {t("Shape File")}</span>
            </div>
            <div className="sdf_heading_box">
              <img src={Freeway} alt="icons" style={{ width: "30px" }} />
              <span> {t("Free Way")}</span>
            </div>
            <div className="sdf_heading_box">
              <img src={Traffic} alt="icons" style={{ width: "19px" }} />
              <span> {t("Traffic")}</span>
            </div>
          </div>

          {group.length !== 0 && <h5>{t("Saved Shape")}</h5>}
          {group.length === 0 && (
            <h4
              style={{ textAlign: "center", fontSize: "23px", margin: "20px" }}
            >
              {t("No data available !")}
            </h4>
          )}

          {group.length !== 0 && (
            <div className="sdf_scroll">
              {shapeData &&
                shapeData.map((item, index) => {
                  var area = "";
                  if (item.type === "circle") {
                    var rad = item.radius;
                    var are = 3.14 * rad * rad;
                    var arrr = are / 1000000;
                    area = `${arrr.toFixed(2)} km`;
                  } else {
                    area = item.area;
                  }
                  return (
                    <div className="savedData_left_data" key={index}>
                      <h6
                        style={{
                          color: "var(--blue)",
                          fontSize: "15px ",
                          marginBottom: "0px",
                        }}
                      >
                        {index + 1}
                      </h6>
                      <div className="savedData_left_data_input">
                        <input
                          type="radio"
                          id={item.name}
                          name="location"
                          onChange={
                            item.type === "circle"
                              ? (e) => {
                                  createCircleShapes(item.radius, item.center);
                                }
                              : (e) =>
                                  createPolygonShapes(
                                    item.type,
                                    item.coord,
                                    item.center
                                  )
                          }
                        />

                        <label htmlFor={item.name}>{item.name}</label>
                      </div>
                      <span style={{ width: "35%", fontSize: "13px" }}>
                        {area}{" "}
                      </span>
                      {item.type === "polygon" && (
                        <img
                          src={Polygon}
                          alt="shape"
                          style={{ width: "23px" }}
                        />
                      )}
                      {item.type === "rectangle" && (
                        <img src={Rectangle} alt="shape" />
                      )}
                      {item.type === "circle" && (
                        <img
                          src={Circle}
                          alt="shape"
                          style={{
                            width: "28px",
                            marginLeft: "7%",
                            marginBottom: "-6px",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="savedData_right">
          {/* here we are going to add the box data */}
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
                  <h6>{ResultData.population}</h6>
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
                <h6>{ResultData.homes}</h6>
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
                <h6>{ResultData.incomes}</h6>
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
                  <h6>{parseInt(ResultData.road_coverage).toFixed(2)}</h6>
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
                <h6>{ResultData.area}</h6>
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
                <h6>
                  {ResultData.total_plots ? ResultData.total_plots : "NA"}
                </h6>

                <span>{t("Selected Plots on Map")}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// exporting the component ;
export default SavedShapeData;
