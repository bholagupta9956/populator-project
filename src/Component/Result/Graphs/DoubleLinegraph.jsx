// This is component where we are going to create double line graph to be used the graph section ;
import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import { Line } from "react-chartjs-2";
import "./Graphs.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// import { Liquid, measureTextWidth } from '@ant-design/charts';

// const DemoLiquid: React.FC = () => {

//     var [percent, setPercent] = useState(0.26);
//     var config = {
//       percent,
//       radius: 0.8,
//       statistic: {
//         title: {
//           formatter: function formatter() {
//             return 'Plots';
//           },
//           style: function style(_ref) {
//             var percent = _ref.percent;
//             return { fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)' };
//           },
//         },
//         content: {
//           style: function style(_ref2) {
//             var percent = _ref2.percent;
//             return {
//               fontSize: 60,
//               lineHeight: 1,
//               fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
//             };
//           },
//           customHtml: function customHtml(container, view, _ref3) {
//             var percent = _ref3.percent;
//             var _container$getBoundin = container.getBoundingClientRect(),
//               width = _container$getBoundin.width,
//               height = _container$getBoundin.height;
//             var d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
//             var text = 'Used Plots '.concat((percent * 100).toFixed(0), '%');
//             var textWidth = (0, measureTextWidth)(text, { fontSize: 60 });
//             var scale = Math.min(d / textWidth, 1);
//             return '<div style="width:'
//               .concat(d, 'px;display:flex;align-items:center;justify-content:center;font-size:')
//               .concat(scale, 'em;line-height:')
//               .concat(scale <= 1 ? 1 : 'inherit', '">')
//               .concat(text, '</div>');
//           },
//         },
//       },
//       liquidStyle: function liquidStyle(_ref4) {
//         var percent = _ref4.percent;
//         return {
//           fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
//           stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
//         };
//       },
//       color: function color() {
//         return '#5B8FF9';
//       },
//     };
//     useEffect(() => {
//       var data = 0.25;
//       var interval = setInterval(function () {
//         data += Math.min(Math.random() * 0.1, 0.1);
//         if (data < 0.75) {
//           setPercent(data);
//         } else {
//           clearInterval(interval);
//         }
//       }, 500);
//     }, []);
//     return <Liquid {...config} />;
//   };

const DoubleLinegraph = () => {

  const { t, i18n } = useTranslation();

  const [graphData, setGraphData] = useState({
    labels: [t("total") , t("used") , t("unused") , ],
    datasets: [
      {
        type: "line",
        lineTension: 0.3,
        label: t("Plots"),
        data: [12 , 34 ,23 , 45],
        borderWidth: 1,
        fill: true,
        pointRadius: 3,
        backgroundColor: "rgba(95, 124, 212,0.2)",
        borderColor: "blue",
      },
    ],
  });


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

  const ResultData = useSelector((state) => state.resultScreenData.result);

  const updateGraphData = () =>{
  if (ResultData.hasOwnProperty("plots")) {
    const labels = ResultData.plots;
    const dataa = ResultData[0];

    const labels2 = [labels[0], labels[1], labels[2]];
    const dataa2 = [dataa[0], dataa[1], dataa[2]];

    const data = {
      labels: labels2,
      datasets: [
        {
          type: "line",
          lineTension: 0.3,
          label: t("Plots"),
          data: dataa2,
          borderWidth: 1,
          fill: true,
          pointRadius: 3,
          backgroundColor: "rgba(95, 124, 212,0.2)",
          borderColor: "blue",
        },
      ],
    };

    setGraphData(data);
  }
}

  useEffect(() =>{
    updateGraphData()
  },[ResultData]);

    return (
      <>
        <div className="doublelinegraph">
          <h3>{t("Used plots & Unused plots")}</h3>
          <Line
            data={graphData}
            className="linegraph"
            options={options}
            height="260px"
          />
        </div>
      </>
    );
 
};

export default DoubleLinegraph;
