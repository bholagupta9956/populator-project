// here we are going to create a component which will show  the data from the table view component ;

import React, { useEffect } from "react";
import GraphView from "./GraphView";
import { useTranslation } from "react-i18next";
import "./Pointshistory.css";
import Coins from "./PointHistoryImages/coins.svg";
import Population from "./PointHistoryImages/population.svg";
import Bar from "./PointHistoryImages/bars.svg";
import PieGraph from "./PointHistoryImages/piegraph.svg";
import PyramidGraph from "./PointHistoryImages/pyramidgraph.svg";
import axios from "axios";
import { useSelector , useDispatch } from "react-redux";

const TableData = () => {
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const choosedLanguage = i18n.language;
  const Token = useSelector((state) => state.authenication.token);

  const data = [
    {
      id: 1,
      date: "28 July 2020",
      totalCoins: "-745",
      population: "-235",
      piechart: "-245",
      pyramid: "-245",
    },
    {
      id: 1,
      date: "15 July 2020",
      totalCoins: "-745",
      population: "-155",
      piechart: "-325",
      pyramid: "-245",
    },
    {
      id: 1,
      date: "15 July 2020",
      totalCoins: "-745",
      population: "-155",
      piechart: "-325",
      pyramid: "-245",
    },
  ];

  

  return (
    <>
      <div className="tableData">
        {data.map((item, index) => {
          return (
            <div className="tableData_container">
              <div className="tableData_heading">
                <div className="tableData_heading_left">
                  <h5>{t("Total Points Deduct")} :</h5>
                  <li>
                    <img
                      src={Coins}
                      alt="coins icon"
                      width="16px"
                      height="18px"
                    />
                    <span>{item.totalCoins}</span>
                  </li>
                </div>
                <div className="tableData_heading_right">
                  <h5>
                    {t("Date")} : {item.date}
                  </h5>
                </div>
              </div>

              <div className="tableData_box">
                <div className="tableData_box1">
                  <li>
                    <img src={Population} alt="population icons" />
                    <h6>{t("POPULATION")}</h6>
                    <span></span>
                  </li>
                  <div className="tableData_box1_butm">
                    <img src={Bar} alt="bar icon" width="28px" />
                    <li>
                      <h3>25,628</h3>
                      <span>{t("Selected Area Population")}</span>
                    </li>
                  </div>

                  <div className="tableData_box1_points">
                    <img
                      src={Coins}
                      alt="coins icon"
                      style={{ width: "19px", marginRight: "8px" }}
                    />
                    <span>{item.population}</span>
                  </div>
                </div>
                <div className="tableData_box2">
                  <img src={PieGraph} alt="pie graph" />
                  <div className="tableData_box2_points">
                    <img
                      src={Coins}
                      alt="coins icon"
                      style={{ width: "45px", marginTop: "-4px" }}
                    />
                    <span>{item.piechart}</span>
                  </div>
                </div>
                <div className="tableData_box3">
                  <img src={PyramidGraph} alt="pyramid graph" />
                  <div className="tableData_box3_points">
                    <img
                      src={Coins}
                      alt="coins icon"
                      style={{ width: "43px" }}
                    />
                    <span>{item.pyramid}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// exporting the graph ;
export default TableData;
