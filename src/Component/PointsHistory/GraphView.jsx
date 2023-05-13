// Here we are going to create a graph view which will be used inside the  Pointhistory component ;
import React, { useEffect, useState } from "react";
import "./Pointshistory.css";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Loader from "../../utils/Loader";

const GraphView = () => {
  const api = useSelector((state) => state.apiStore.url);
  const Token = useSelector((state) => state.authenication.token);
  const urlLink = `${api}graph-data`;
  const [date, setDate] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  // here we are going to fetch the graphical data for the point history ;
  useEffect(() => {
    setLoading(true);
    axios
      .get(urlLink, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setLoading(false);
          const date = res.data.date;
          const pointss = res.data.points;
          setDate(date);
          setPoints(pointss);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(251, 45, 100, 0);

    return {
      labels: date,

      datasets: [
        {
          label: t("Cutted Points"),
          data: points,
          fill: true,
          backgroundColor: "rgb(0,161,228,0.06)",
          borderColor: "rgb(0,161,228)",
          borderWidth: 2,
          lineTension: 0.5,
        },
      ],
    };
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="graphView">
        {date.length !== 0 ? (
          <Line
            data={data}
            options={options}
            height="198px"
            className="graphView_graph"
          />
        ) : (
          <h4 style={{textAlign : 'center' , fontSize : "23px" , margin : "20px"}}>{t("No data available !")}</h4>
        )}

        {/* here we are settinhgh loader  */}
        {loading && <Loader />}
      </div>
    </>
  );
};

// exporting the graphview ;
export default GraphView;
