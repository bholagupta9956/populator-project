// Here we are going to create both bar and line graph in the single ;

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


const BarLinegraph = () => {
  const [classData, setClassData] = useState([]);

  const ResultData = useSelector((state) => state.resultScreenData.result);

  useEffect(() => {
    if (ResultData.social_class) {
      setClassData(ResultData.social_class);

      const socialClass = ResultData.social_class;
      console.log(socialClass, "social class here");
      const genData = {
        labels: [t("Rich"), t("Poor"), t("MidClass"), t("Unclassified")],
        datasets: [
          {
            type: "bar",
            label: t("Population growth"),
            backgroundColor: `#00a1e4`,
           
            data: [
              socialClass.rich,
              socialClass.poor,
              socialClass.midclass,
              socialClass.unclassified,
            ],
          },
        ],
      };

      setClassData(genData);
    }
  }, [ResultData]);

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

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="barLineGraph">
        <h3>{t("Growth & Population")}</h3>
        <Bar
          data={classData}
          options={options}
          className="barlinegraph_component"
          height="250px"
        />
      </div>
    </>
  );
};

// exporting the graph ;
export default BarLinegraph;
