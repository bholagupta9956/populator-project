// here we are going to create a component of the table view which will be imported into the pointhistory component ;

import React, { useEffect, useState } from "react";
import "./Pointshistory.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { showData } from "../../actions";
import { useTranslation } from "react-i18next";
import ReactDatatable from "@ashvin27/react-datatable";
import { useSelector } from "react-redux";
import Loader from "../../utils/Loader";

const TableView = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const api = useSelector((state) => state.apiStore.url);
  const choosedLanguage = i18n.language;
  const Token = useSelector((state) => state.authenication.token);
  const [loading, setLoading] = useState(false);
  const data = [
    {
      id: 1,
      details: "POI , Population , Land , Plots",
      date: "28 July 2021",
      points: -245,
    },
    {
      id: 2,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "28 July 2021",
      points: -143,
    },
    {
      id: 3,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "14 July 2021",
      points: -165,
    },
    {
      id: 4,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "23 Sept 2021",
      points: -232,
    },
    {
      id: 5,
      details: "POI , Population , Land , Plots",
      date: "28 July 2021",
      points: -245,
    },
    {
      id: 6,
      details: "POI , Population , Land , Plots",
      date: "28 July 2021",
      points: -245,
    },
    {
      id: 7,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "28 July 2021",
      points: -143,
    },
    {
      id: 8,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "14 July 2021",
      points: -165,
    },
    {
      id: 9,
      details: "POI , Population , Land , Plots , Salary , Male , Female",
      date: "23 Sept 2021",
      points: -232,
    },
    {
      id: 10,
      details: "POI , Population , Land , Plots",
      date: "28 July 2021",
      points: -245,
    },
  ];

  const columns = [
    {
      key: "id",
      text: t("Serial No."),
      className: "serial",
      align: "left",
      sortable: true,
      cell: (records, index) => {
        return (
          <>
            <h6 style={{ textAlign: "center" }}>{index + 1}</h6>
          </>
        );
      },
    },
    {
      key: "services",
      text: t("Details"),
      className: "table_services",
      align: "left",
      sortable: true,
    },
    {
      key: "created_at",
      text: t("Time"),
      className: "table_time",
      align: "center",
      sortable: true,
    },
    {
      key: "date",
      text: t("Date"),
      className: "table_date",
      sortable: true,
      align: "center",
    },
    {
      key: "total_points_deducted",
      text: t("Points Deduct"),
      className: "table_points",
      align: "center",
      sortable: true,
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
  const [pointHistory, setPointHistory] = useState([]);

  // here we are going to get the data from the api ;
  useEffect(() => {
    const urlLink = `${api}point-history`;
    setLoading(true);
    axios
      .get(urlLink, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${Token}`,
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        const val = res.data.data.reverse();
        if (res.data.data) {
          setLoading(false);
        } else {
          setLoading(false);
        }
        setPointHistory(val);

      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="tableView">

        {pointHistory.length !== 0  ? 
        <ReactDatatable
          config={config}
          records={pointHistory}
          columns={columns}
          //   extraButtons={this.extraButtons}
        />
        : <h4 style={{textAlign : 'center' , fontSize : "23px" , margin : "20px"}}>{t("No data available !")}</h4>
}
        {/* here we are adding the loader */}
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the component ;
export default TableView;
