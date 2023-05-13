// This is the component of creating the piechart graphs ;
import React, { useEffect , useState} from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const data = [
  {
    id: "erlang",
    label: "erlang",
    value: 164,
    color: "hsl(157, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 307,
    color: "hsl(336, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "elixir",
    value: 272,
    color: "hsl(149, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 303,
    color: "hsl(101, 70%, 50%)",
  },
  {
    id: "haskell",
    label: "haskell",
    value: 310,
    color: "hsl(145, 70%, 50%)",
  },
];


const Piechart = () => {
  const  [ classData , setClassData ] = useState({
    poor : 23 ,
    midclass : 43 ,
    rich : 45 ,
    unclassified : 24
  })
  const ResultData = useSelector((state) => state.resultScreenData.result);
  useEffect(()  =>{
    if(ResultData.social_class){
      setClassData(ResultData.social_class)
    }
  })
  const socialClass = ResultData.social_class ;
  const { t, i18n } = useTranslation();


  const datas = [
    {
      id: t("Poor Class"),
      label: t("Poor"),
      value: classData.poor,
      color: "hsl(145, 70%, 50%)",
    },
    {
      id: t("Middle Class"),
      label: t("Middle"),
       value:classData.midclass,
      color: "hsl(101, 70%, 50%)",
    },
    {
      id: t("Rich Class"),
      label: t("Rich"),
      value: classData.rich,
      color: "hsl(149, 70%, 50%)",
    },
    {
      id: t("Unclassified Class"),
      label: t("Unclassified"),
      value: classData.unclassified,
      color: "hsl(225, 69%, 50%)",
    },
  ];

  const MyResponsivePie = () => (
    <ResponsivePie
      data={datas}
      margin={{ top: 30, right: 70, bottom: 30, left: 20 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      arcLabel="Social Class"
      arcLabelsTextColor="red"
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          translateX: 120,
          translateY: -240,
           
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 11,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );

  
  return (
    <>
      <div className="piechart">
        <h3>{t("Social class")}</h3>
        <MyResponsivePie  />
      </div>
    </>
  );
};

export default Piechart;
