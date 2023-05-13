// here we are going to create a population pyramid which will be used in the graph section ;
import React , {useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PyramidGraph = (props) => {

  const {t , i18n} = useTranslation();

  const [data ,setData] = useState({
    category : ['1-4' , '5-12' , '13-18' , '20-28' , '30-40' , '40-50'],
    fmarr : [15 , 25 , 12 , 23 , 15 , 10] ,
    male : [17,13 , 22 , 23 , 15 , 10]
  })
  const ResultData = props.resultData;

  useEffect(() =>{
 
  if(ResultData.data){
    const  category = ResultData.data.categories;
    const categories = category.reverse();
    const fmale = ResultData.data.series.gender.fdata;
    const fmarr = fmale.map(i => '-' + parseInt(i));
  
    const mal = ResultData.data.series.gender.data;
    const male = mal.map(i => parseInt(i));
  
    setData({
      category : category ,
      fmarr : fmarr ,
      male : male
    })
  
  }
  },[ResultData])
  


    const state = {
      series: [
        {
          name: t("Males"),
          data: data.male
        },
        {
          name: t("Females"),
          data: data.fmarr
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          padding : 12 ,
          stacked: true,
        },
        colors: ["#008FFB", "#FF4560"],
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "80%",
            columnWidth: '70%'
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },

        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          min: -5,
          max: 5,
          title: {
            // text: 'Age',
          },
        },
        tooltip: {
          shared: false,
          x: {
            formatter: function (val) {
              return val;
            },
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "%";
            },
          },
        },
        title: {
          // text: 'POPULATION PYRAMID' ,

          style: {
            color: "var(--blue)",
            fontWeight: 400,
            fontSize: "13px",
            textTransform: "uppercase",
          },
        },
        xaxis: {
          categories: data.category,
          title: {
            text: t("Percent"),
          },
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "%";
            },
          },
        },
      },
    };


 
    return (
      <div id="chart" className="pyramidgraph">
        <h3>{t("Populaion Pyramid")}</h3>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
          width="96%"
          style={{ marginTop: "12px" ,  }}
        />
      </div>
    );
  
    }

export default PyramidGraph;
