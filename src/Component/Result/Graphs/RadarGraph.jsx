// Here Radar Graph will be added and it will be taken from the nivo graph library ;

import React from "react";
import { ResponsiveRadar } from '@nivo/radar';
import { useTranslation } from "react-i18next";

// passing data here ;
const data = [
   
    {
      "taste": "bitter",
      "chardonay": 67,
      "carmenere": 41,
      "syrah": 30
    },
    {
      "taste": "heavy",
      "chardonay": 117,
      "carmenere": 60,
      "syrah": 59
    },
    {
      "taste": "strong",
      "chardonay": 74,
      "carmenere": 39,
      "syrah": 22
    },
    {
      "taste": "sunny",
      "chardonay": 61,
      "carmenere": 47,
      "syrah": 32
    }
  ]

const RadarGraph = () =>{

    const MyResponsiveRadar = ({ data /* see data tab */ }) => (
        <ResponsiveRadar
        data={data}
        keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        indexBy="taste"
        maxValue="auto"
        margin={{ top: 80, right: 60, bottom: 40, left: 60 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={20}
        enableDots={true}
        dotSize={7}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

const {t , i18n} = useTranslation()
    return(<>
    <div className="radar_graph">
         <h3>{t("Traffic data by time and day")}</h3>
        <MyResponsiveRadar data = {data} />
    </div>
    </>)
}

// exporting the radar graph ;
export default RadarGraph;