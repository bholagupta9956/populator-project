// here we will handle the third layer of the graph the poi part with curve graph ;

import React from "react";
import "./Graphs.css";
import CommercialHome from "./GraphImages/CommercialHome.svg";
import HospitalIcon from "./GraphImages/HospitalIcon.svg";
import TopperCap from "./GraphImages/TopperCap.svg";
import Tree from "./GraphImages/Tree.svg"
import { Line } from 'react-chartjs-2';
import { useTranslation } from "react-i18next";


// creating the left side scrolling part ;

const ScrollingData = () =>{
  
  const {t , i18n} = useTranslation();
  
    return(<>
        <div className = "scrollingData">
            
                <div className ="scrollingData_row">
                  <li>
                    <img src={Tree} alt=" tree icons" style = {{width : "23px"}}/>
                    <h6>{t("Public Place")}</h6>
                  </li>
                   <span style={{marginTop: "8px"}}>40x {t("Parks")}</span>
                    <span>252 {t("Mosques")}</span>
                </div>

                <div className ="scrollingData_row">
                  <li>
                    <img src={CommercialHome} alt="commercial home icon" style = {{width : "22px"}}/>
                    <h6>{t("Commercial Activities")}</h6>
                  </li>
                   <span style={{marginTop: "8px"}}>70 {t("Appliances ,Electronic Stores")}</span>
                    <span>107 {t("Furniture Stores")}</span>
                    <span>2 {t("Shopping Mall")}</span>
                </div>

                <div className ="scrollingData_row">
                  <li>
                    <img src={HospitalIcon} alt="Hospital Icosn" style = {{width : "24px"}}/>
                    <h6>{t("Hospitality")}</h6>
                  </li>
                   <span style={{marginTop: "8px"}}>60 {t("Hotels/Furnished Apd")}</span>
                    <span>897 {t("Food Outlets")}</span>
                   
                </div>
                <div className ="scrollingData_row">
                  <li>
                    <img src={TopperCap} alt="Topper icons" style = {{width : "28px"}}/>
                    <h6>{t("Hospitality")}</h6>
                  </li>
                   <span style={{marginTop: "8px"}}>282 {t("Schools/University")}</span>
                    <span>69 {t("Petrol Pump")}</span>
                    <span>1940 {t("Misc")}</span>
                   
                </div>
            </div>
       
    </>)
}

const PoiGraph = () =>{

  const data = (canvas) => {
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(251,45,100,0);
  return{

        labels: ['1', '2', '3', '4', '5', '6','7'],
        datasets: [
          { 
            label: '# of Votes',
            data: [3,9,19,23 ,18,9,4],
            fill: true,
            background : gradient ,
            borderColor: 'blue',
            borderWidth : 1 ,
            lineTension: 0.5,
          },
         
        ],
      };
    }


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
    return(<>
        <div className="poigraph">
          <h3>Poi's graphical data</h3>
        <Line data={data} options={options}  height = "240px" />
        </div>
    </>)
}


export default ScrollingData;
export {PoiGraph};



// rough data ;

// label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [1500000, 3900000, 3000000, 4100000, 2300000, 1800000, 2000000],