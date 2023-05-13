// Here we are going to create chord graph which will be imported inside the graph part ;
import React from "react";
import { ResponsiveChord } from '@nivo/chord'
import { useTranslation } from "react-i18next";

 const matrix = [
    [
      274,
      235,
      892,
      446,
      133
    ],
    [
      85,
      433,
      416,
      81,
      239
    ],
    [
      25,
      439,
      1954,
      123,
      5
    ],
    [
      313,
      337,
      42,
      662,
      1303
    ],
    [
      387,
      31,
      30,
      269,
      270
    ]
  ]
  const MyResponsiveChord = ({ matrix /* see matrix tab */ }) => (
    <ResponsiveChord
        matrix={matrix}
        keys={[ 'John', 'Raoul', 'Jane', 'Marcel', 'Ibrahim' ]}
        margin={{ top: 60, right: 60, bottom: 110, left: 60 }}
        valueFormat=".2f"
        padAngle={0.02}
        innerRadiusRatio={0.96}
        innerRadiusOffset={0.02}
        arcOpacity={1}
        arcBorderWidth={7}
        arcBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        ribbonOpacity={0.5}
        ribbonBorderWidth={1}
        ribbonBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.4 ] ] }}
        enableLabel={true}
        label="id"
        labelOffset={12}
        labelRotation={-90}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        colors={{ scheme: 'nivo' }}
        isInteractive={true}
        arcHoverOpacity={1}
        arcHoverOthersOpacity={0.25}
        ribbonHoverOpacity={0.75}
        ribbonHoverOthersOpacity={0.25}
        animate={true}
        motionStiffness={90}
        motionDamping={7}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 70,
                itemWidth: 80,
                itemHeight: 14,
                itemsSpacing: 0,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
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


const ChordGraph = () =>{
  const {t , i18n} = useTranslation();
    return(<>
    <div className="chordgraph">
      <h3>{t("SEC Vs. HOUSE TYPE")}</h3>
        <MyResponsiveChord matrix = {matrix}/>
    </div>
    </>)
}

export default ChordGraph ;