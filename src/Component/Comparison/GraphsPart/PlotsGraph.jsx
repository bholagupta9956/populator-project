// In this component we are  going to create  a graph which will show you the used and the unusedPlots graph ;

import React from "react";
import "./graphPart.css";
import Chart from "react-google-charts";
import { Line } from 'react-chartjs-2';
import {useTranslation} from 'react-i18next'
import { useSelector } from "react-redux";

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


const PlotsGraph  = ({name,value}) =>{  
    const ResultData = useSelector((state) => state.resultScreenData.result);

    const labels = ResultData.plots;
    const dataa = ResultData[0]
    const {t , i18n} = useTranslation();

    const data = {
      labels: name,
      datasets: [
        {
          type : "line",
          lineTension : 0.3 ,
          label: t("Plots"),
          data: value,
          borderWidth : 1 ,
          fill: true,
          pointRadius : 3 ,
          backgroundColor: "rgba(95, 124, 212,0.2)",
          borderColor: "blue"
        },
      ]
    };

   

    return(<>
        <div className="plotsGraph">
            <h3>{t("Used plots & Unused plots")}</h3>
            {/* <DemoLiquid /> */}
            <Line data={data} className = "linegraph" options={options} height = "280px" />
        </div>
       </>)
}


// exporting the graph ;
export default PlotsGraph ;