// here we are going to create a sweet alert which will be used every in the project ;
import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { HideSweetAlert } from "../actions";

const SweetAlerts = () => {

  const sweetAlertText = useSelector((state) => state.handleSweetAlert.text);
  const mystate = useSelector((state) => state.handleSweetAlert.show);
  const dispatch = useDispatch();
  const {t , i18n} = useTranslation();
  const onConfirm = () => {
    
  };
  const onCancel = () => {};
  return (
    <>
      {mystate ? (
        <SweetAlert
          success
          title={t("Good job!")}
          onConfirm={() => dispatch(HideSweetAlert())}
          onCancel={onCancel}
        >
          <h4 className="sweetAlert_heading">{sweetAlertText}</h4>
        </SweetAlert>
      ) : null}
    </>
  );
};

export default SweetAlerts;
