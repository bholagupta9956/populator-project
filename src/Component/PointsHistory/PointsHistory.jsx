// here we are going to create the point history component here the table view and the graph view both the component will be managed ;

import React, { useState ,useEffect } from "react";
import "./Pointshistory.css";
import { Modal } from "react-bootstrap";
import Coins from "./PointHistoryImages/coins.svg";
import Export from "./PointHistoryImages/export.svg";
import Cut from "./PointHistoryImages/cut.svg";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  cutProfileScreen,
  showTable,
  showGraph,
  showData,
} from "../../actions";
import { useSelector } from "react-redux";
import PointHistoryControl from "./PointHistoryControl";

const PointsHistory = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // styling to the button
  const [color, setColor] = useState({
    tableBackground: "var(--blue)",
    tabletextcolor: "white",
    graphBackground: "white",
    graphtextcolor: "var(--grey)",
  });
  const mystate = useSelector((state) => state.PointHistory.view);
  useEffect(() => {
    if (mystate === "graphView") {
      setColor({
        tableBackground: "white",
        tabletextcolor: "var(--grey)",
        graphBackground: "var(--blue)",
        graphtextcolor: "white",
      });
    } else if (mystate === "tableView") {
      setColor({
        tableBackground: "var(--blue)",
        tabletextcolor: "white",
        graphBackground: "white",
        graphtextcolor: "var(--grey)",
      });
    }
  },[]);

  const tableView = () => {
    dispatch(showTable());
    setColor({
      tableBackground: "var(--blue)",
      tabletextcolor: "white",
      graphBackground: "white",
      graphtextcolor: "var(--grey)",
    });
  };
  const graphView = () => {
    dispatch(showGraph());
    setColor({
      tableBackground: "white",
      tabletextcolor: "var(--grey)",
      graphBackground: "var(--blue)",
      graphtextcolor: "white",
    });
  };

  const table = {
    background: color.tableBackground,
    color: color.tabletextcolor,
  };
  const graph = {
    background: color.graphBackground,
    color: color.graphtextcolor,
  };

  return (
    <>
      <Modal
        size="lg"
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="pointsHistory">
          <div className="pointHistory_heading">
            <div className="pointHistory_heading1">
              <h3>{t("Point History")} </h3>
              <img src={Coins} alt="coins icon" />
            </div>

            <div className="pointHistory_heading2">
              <span onClick={tableView} style={table}>
                {t("Table View")}
              </span>
              <span onClick={graphView} style={graph}>
                {t("Graph View")}
              </span>
            </div>

            <div className="pointHistory_heading3" style={{visibility : "hidden"}}>
              <img src={Export} alt="export img" width="45px" />
              <span>{t("Export Data")}</span>
            </div>
          </div>

          {/* here we will import the table view and the graph view of the project ; */}
          <div className="pointHistory_view">
            <PointHistoryControl />
          </div>

          {/* here we are going to use cut option ; */}
          <div
            className="pointHistory_cut"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut icon " />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default PointsHistory;
