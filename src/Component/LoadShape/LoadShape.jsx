// here we are show all the loaded shape and the loaded catchment part ;
import React from "react";
import { Modal } from "react-bootstrap";
import "./load.css";
import LoadShapepart from "./LoadShapePart";
import Cut from "../mainimages/cut.svg"
import {useSelector , useDispatch} from "react-redux"
import { hideLoadShapes } from "../../actions";
import { useTranslation } from "react-i18next";
import LoadCatchmentPart from "./LoadCatchmentPart";

const LoadShape = () => {
  const myState = useSelector((state) => state.loadShapes.showPopup);
  const dispatch = useDispatch();
  const {t ,i18n} = useTranslation();

  return (
    <>
      <Modal
        show={myState}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="load">
            <h5>{t("Load All Saved Shapes & Catchment")} </h5>
            <div className="load_container">
                <LoadShapepart />
                <LoadCatchmentPart />
            </div>

            <div className="cut_option" onClick={() => dispatch(hideLoadShapes())} style={{cursor : "pointer"}}>
                    <img src={Cut} alt="Cut icon" style={{padding : "1px"}} />
                </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default LoadShape;
