// here we are creating the demo poi details which is just for demo purpose ;

import React, { Fragment } from "react";
import "./Poi.css";
import Navigate from "../../ResultImages/compass.svg";
import ReactDatatable from "@ashvin27/react-datatable";
import { useMap } from "react-leaflet";
import { useSelector ,useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { closeResultPanel, updatePoiMarkerData } from "../../../../actions";

const Rough = (props) => {

  const dispatch = useDispatch();
  const val = props.value;
  const map = useMap();
  const zoom = map._zoom;
  const {t , i18n} = useTranslation();
 

  const columns = [
    {
      key: "category",
      text: "Category",
      className: "poi_category",
      align: "left",
      sortable: true,
    },
    {
      key: "outlet_name",
      text: "Type",
      className: "poi_type",
      align: "left",
      sortable: true,
    },
    {
      key: "name",
      text: "POI Name",
      className: "poi_name",
      sortable: true,
    },
    {
      key: "address",
      text: "Address",
      className: "poi_address",
      align: "left",
      sortable: true,
    },
    // {
    //   key: "distance",
    //   text: "Distance",
    //   className: "poi_address",
    //   align: "left",
    //   sortable: true,
    // },
    {
      key: "action",
      text: "Action",
      className : "poi_action" ,

      cell: (record, index) => {
        return (
          <Fragment>
            <div
              onClick={() => navigateToMap( record, index)}
              style={{ marginRight: "5px" , display : "flex" , justifyContent : "center" , cursor : "pointer" }}
            >
              <img
                src={Navigate}
                style={{ width: "23px",}}
                alt="navigation icons"
              />
            </div>
          </Fragment>
        );
      },
    },
  ];

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    show_filter: true,
    show_pagination: true,
    filename: "restaurents",
    button: {
      excel: true,
      print: true,
      csv: true,
    },
  };


  const navigateToMap = (record, ind) => {
    console.log(record)
    dispatch(closeResultPanel());
     const center = { lat: record.lat, lng: record.lon };
    map.flyTo(center, zoom);
   
    const data = {
      center: center,
      val: record,
    };
    dispatch(updatePoiMarkerData(data));
  };


  return (
    <>
    
      <div className="rough">
      {val.length !== 0  ? 
        <ReactDatatable
          config={config}
          records={val}
          columns={columns}
          //   extraButtons={this.extraButtons}
          // onRowClicked={rowClickedHandler}
        /> : <h5>{t("Sorry ! No data available")}</h5> }
      </div>
    </>
  );
};

// exporting the component ;
export default Rough;


