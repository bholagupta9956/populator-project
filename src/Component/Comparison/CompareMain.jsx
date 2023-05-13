// This is the main compare file ;
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Shapes from "./image/shapes.png";
import "./comparison.css";
import Catchment from "./image/catchment.png";
import ComparisonScreen from "./ComparisonScreen";
import { useTranslation } from "react-i18next";
import Cut from "../ControlPanel/ControlImages/cut.svg";
import { useSelector, useDispatch } from "react-redux";
import CatchmentComparisonScreen from "./CatchmentComparisonScreen";
import {
  cutProfileScreen,
  showComparisonDetails,
  showNotification,
  updateComparisonDetails,
} from "../../actions";
import UnSavedShapes from "./UnSavedShapes";

const CompareMain = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const [selectedShape, setSelectedShape] = useState([]);

  const compare = () => {
    if (selectedShape.length > 1) {
      dispatch(updateComparisonDetails(selectedShape));
      dispatch(showComparisonDetails());
    } else {
      dispatch(showNotification(t("Please select atleast 2 shapes")));
    }
  };

  return (
    <>
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="compare">
          <div className="compre_heading">
            <h6>{t("Comparison Section")}</h6>
          </div>
          <button className="compare_btn" onClick={compare}>
            {t("Compare")}
          </button>
          <div className="cmpre_part">
            <div className="cmpre_box">
              <ComparisonScreen
                setSelectedShape={setSelectedShape}
                selectedShape={selectedShape}
              />
              <CatchmentComparisonScreen
                setSelectedShape={setSelectedShape}
                selectedShape={selectedShape}
              />
            </div>
            <UnSavedShapes
              setSelectedShape={setSelectedShape}
              selectedShape={selectedShape}
            />
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

export default CompareMain;
