import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

const PoisGraph = (props) => {
  const [data, setData] = useState([]);

  const { poiData } = props;

  const { t } = useTranslation();

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

  var labelData = []
  var numericalValue = []

  useEffect(() => {
    if (poiData) {
      const actualData = poiData[0];
      if (actualData) {
        const objData = Object.entries(actualData);

        for (var i = 0; i < objData.length; i++) {
          const labelItem = objData[i][0];
          const numericalItem = objData[i][1].count;
          
          labelData.push(labelItem);
          numericalValue.push(numericalItem)
          
        }

        const genData = {
          labels: labelData,
          datasets: [
            {
              type: "bar",
              label: "POI's Graph",
              backgroundColor: `#00a1e4`,
              data: numericalValue,
            },
          ],
        };

        setData(genData);
      }
    }
  }, [poiData ]);

  return (
    <div className="poiDta">
      <div className="barLineGraph">
        <h3>{t("POI Data's")}</h3>
        <Bar
          data={data}
          options={options}
          className="barlinegraph_component"
          height="250px"
        />
      </div>
    </div>
  );
};

export default PoisGraph;
