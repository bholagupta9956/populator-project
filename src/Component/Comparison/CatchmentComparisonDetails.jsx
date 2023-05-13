// This is the catchment comparison screen here we will show all the selected catchment comparison ; part ;
import React from "react";
import { Modal } from "react-bootstrap";
import Area from "./image/area.svg";
import Population from "./image/population.svg";
import Female from "./image/female.svg";
import Male from "./image/male.svg";
import Home from "./image/home.svg";
import Rich from "./image/rich.svg";
import Middle from "./image/middle.svg";
import CompareImg from "./compare.svg";
import MapDetails from "./MapDetails";
import { useSelector, useDispatch } from "react-redux";
import Cut from "../ControlPanel/ControlImages/cut.svg";
import CatchmentComparisonMap from "./CatchmentComparisonMap";
import Road from "./image/road.png";
import Plots from "./image/plots.png";
import { useTranslation } from "react-i18next";
import Income from "./image/area.png";
import axios from "axios";
// import Loader from ".."
import Whitearrow from "./image/whitearow.png";
import {
  cutProfileScreen,
  showCatchmentComparison,
  showComparison,
} from "../../actions";

const CatchmentComparisonDetails = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const items = [
    { img: Area, text: t("Area KM2") },
    {
      img: Population,
      text: t("Population"),
    },
    {
      img: Female,
      text: t("Female %"),
    },
    {
      img: Male,
      text: t("Male %"),
    },
    {
      img: Rich,
      text: t("SEC(Rich/Upper)%"),
    },
    {
      img: Middle,
      text: t("SEC(Mid Class)%"),
    },
    {
      img: Home,
      text: t("# of Homes"),
    },
    {
      img: Income,
      text: t("# of Incomes"),
    },
    {
      img: Road,
      text: t("Road Coverages"),
    },
    {
      img: Plots,
      text: t("Plots"),
    },
  ];
  
  return (
    <>
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="compDetails">
          <div className="compheading">
            <img
              src={Whitearrow}
              alt="arrow btn"
              style={{
                width: "26px",
                marginLeft: "-9px",
                marginRight: "9px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(showCatchmentComparison())}
            />
            <span>{t("Catchment Comparative Analysis")}</span>
          </div>
          <div className="compBody">
            <div className="compBody_box1">
              <div className="compBody_box1_img">
                <img src={CompareImg} alt="" />
                <h4>{t("Comparison")}</h4>
              </div>
              <div className="compBody_box1_nm">
                {items.map((item, index) => {
                  return (
                    <div className="compBody_box1_nam" key={index}>
                      <img src={item.img} alt="" />
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="compBody_box2">
              <CatchmentComparisonMap />
            </div>
          </div>
          <div
            className="cut_options"
            onClick={() => dispatch(cutProfileScreen())}
          >
            <img src={Cut} alt="cut img" />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component
export default CatchmentComparisonDetails;
