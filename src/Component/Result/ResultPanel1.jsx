// In this page result popup will be designed ;

import React from "react";
import { Modal } from "react-bootstrap";
import MapResult from "./MapResult";
import DataResult from "./DataResult";
import Cut from "./ResultImages/cut.svg";
import "./Result.css";
import { useSelector , useDispatch } from "react-redux";
import { closeResultPanel } from "../../actions";

const ResultPanel1 = () => {

  const myState = useSelector((state) => state.resultPanelHandler.show);
  
  const dispatch = useDispatch();
  
  return (
    <>
    {myState &&
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="result_container">
          <MapResult />
          <DataResult />

          <div className="result_panel_cut" onClick = {() => dispatch(closeResultPanel())}>
            <img src={Cut} alt="cut icon" />
          </div>
        </div>
      </Modal>
}
    </>
  );
};

// exporting the file ;
export default ResultPanel1;
