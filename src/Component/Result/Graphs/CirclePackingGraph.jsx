// Here we are going to create a circlepacking graph using the nivo library;

import React from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveCirclePacking } from '@nivo/circle-packing'

const data = {
    "name": "nivo",
    "color": "hsl(49, 70%, 50%)",
    "children": [
      {
        "name": "viz",
        "color": "hsl(64, 70%, 50%)",
        "children": [
          {
            "name": "stack",
            "color": "hsl(9, 70%, 50%)",
            "children": [
              {
                "name": "cchart",
                "color": "hsl(24, 70%, 50%)",
                "loc": 54676
              },
              {
                "name": "xAxis",
                "color": "hsl(40, 70%, 50%)",
                "loc": 37817
              },
              {
                "name": "yAxis",
                "color": "hsl(298, 70%, 50%)",
                "loc": 144462
              },
              {
                "name": "layers",
                "color": "hsl(153, 70%, 50%)",
                "loc": 124093
              }
            ]
          },
          {
            "name": "ppie",
            "color": "hsl(355, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(291, 70%, 50%)",
                "children": [
                  {
                    "name": "pie",
                    "color": "hsl(18, 70%, 50%)",
                    "children": [
                      {
                        "name": "outline",
                        "color": "hsl(294, 70%, 50%)",
                        "loc": 170642
                      },
                      {
                        "name": "slices",
                        "color": "hsl(223, 70%, 50%)",
                        "loc": 170541
                      },
                      {
                        "name": "bbox",
                        "color": "hsl(292, 70%, 50%)",
                        "loc": 46999
                      }
                    ]
                  },
                  {
                    "name": "donut",
                    "color": "hsl(90, 70%, 50%)",
                    "loc": 135059
                  },
                  {
                    "name": "gauge",
                    "color": "hsl(36, 70%, 50%)",
                    "loc": 110017
                  }
                ]
              },
              {
                "name": "legends",
                "color": "hsl(124, 70%, 50%)",
                "loc": 119941
              }
            ]
          }
        ]
      },
      {
        "name": "colors",
        "color": "hsl(120, 70%, 50%)",
        "children": [
          {
            "name": "rgb",
            "color": "hsl(353, 70%, 50%)",
            "loc": 112121
          },
          {
            "name": "hsl",
            "color": "hsl(52, 70%, 50%)",
            "loc": 106971
          }
        ]
      },
      {
        "name": "utils",
        "color": "hsl(51, 70%, 50%)",
        "children": [
          {
            "name": "randomize",
            "color": "hsl(52, 70%, 50%)",
            "loc": 77899
          },
          {
            "name": "resetClock",
            "color": "hsl(234, 70%, 50%)",
            "loc": 23665
          },
          {
            "name": "noop",
            "color": "hsl(104, 70%, 50%)",
            "loc": 121472
          },
          {
            "name": "tick",
            "color": "hsl(295, 70%, 50%)",
            "loc": 75553
          },
          {
            "name": "forceGC",
            "color": "hsl(214, 70%, 50%)",
            "loc": 7738
          },
          {
            "name": "stackTrace",
            "color": "hsl(288, 70%, 50%)",
            "loc": 100914
          },
          {
            "name": "dbg",
            "color": "hsl(96, 70%, 50%)",
            "loc": 85136
          }
        ]
      },
      {
        "name": "generators",
        "color": "hsl(36, 70%, 50%)",
        "children": [
          {
            "name": "address",
            "color": "hsl(171, 70%, 50%)",
            "loc": 137268
          },
          {
            "name": "city",
            "color": "hsl(206, 70%, 50%)",
            "loc": 175312
          },
          {
            "name": "animal",
            "color": "hsl(210, 70%, 50%)",
            "loc": 54819
          },
          {
            "name": "movie",
            "color": "hsl(185, 70%, 50%)",
            "loc": 48465
          },
          {
            "name": "user",
            "color": "hsl(332, 70%, 50%)",
            "loc": 16666
          }
        ]
      },
      {
        "name": "set",
        "color": "hsl(41, 70%, 50%)",
        "children": [
          {
            "name": "clone",
            "color": "hsl(295, 70%, 50%)",
            "loc": 166101
          },
          {
            "name": "intersect",
            "color": "hsl(30, 70%, 50%)",
            "loc": 55531
          },
          {
            "name": "merge",
            "color": "hsl(320, 70%, 50%)",
            "loc": 12070
          },
          {
            "name": "reverse",
            "color": "hsl(76, 70%, 50%)",
            "loc": 148591
          },
          {
            "name": "toArray",
            "color": "hsl(352, 70%, 50%)",
            "loc": 21508
          },
          {
            "name": "toObject",
            "color": "hsl(14, 70%, 50%)",
            "loc": 84098
          },
          {
            "name": "fromCSV",
            "color": "hsl(35, 70%, 50%)",
            "loc": 193455
          },
          {
            "name": "slice",
            "color": "hsl(54, 70%, 50%)",
            "loc": 22313
          },
          {
            "name": "append",
            "color": "hsl(281, 70%, 50%)",
            "loc": 109064
          },
          {
            "name": "prepend",
            "color": "hsl(177, 70%, 50%)",
            "loc": 178555
          },
          {
            "name": "shuffle",
            "color": "hsl(177, 70%, 50%)",
            "loc": 73903
          },
          {
            "name": "pick",
            "color": "hsl(83, 70%, 50%)",
            "loc": 147341
          },
          {
            "name": "plouc",
            "color": "hsl(202, 70%, 50%)",
            "loc": 161561
          }
        ]
      },
      {
        "name": "text",
        "color": "hsl(78, 70%, 50%)",
        "children": [
          {
            "name": "trim",
            "color": "hsl(212, 70%, 50%)",
            "loc": 171390
          },
          {
            "name": "slugify",
            "color": "hsl(24, 70%, 50%)",
            "loc": 30197
          },
          {
            "name": "snakeCase",
            "color": "hsl(228, 70%, 50%)",
            "loc": 187150
          },
          {
            "name": "camelCase",
            "color": "hsl(108, 70%, 50%)",
            "loc": 135765
          },
          {
            "name": "repeat",
            "color": "hsl(220, 70%, 50%)",
            "loc": 8635
          },
          {
            "name": "padLeft",
            "color": "hsl(61, 70%, 50%)",
            "loc": 111190
          },
          {
            "name": "padRight",
            "color": "hsl(3, 70%, 50%)",
            "loc": 26033
          },
          {
            "name": "sanitize",
            "color": "hsl(94, 70%, 50%)",
            "loc": 184678
          },
          {
            "name": "ploucify",
            "color": "hsl(13, 70%, 50%)",
            "loc": 21687
          }
        ]
      },
      {
        "name": "misc",
        "color": "hsl(188, 70%, 50%)",
        "children": [
          {
            "name": "greetings",
            "color": "hsl(342, 70%, 50%)",
            "children": [
              {
                "name": "hey",
                "color": "hsl(4, 70%, 50%)",
                "loc": 42873
              },
              {
                "name": "HOWDY",
                "color": "hsl(136, 70%, 50%)",
                "loc": 153021
              },
              {
                "name": "aloha",
                "color": "hsl(301, 70%, 50%)",
                "loc": 199716
              },
              {
                "name": "AHOY",
                "color": "hsl(295, 70%, 50%)",
                "loc": 8214
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(9, 70%, 50%)",
            "loc": 26416
          },
          {
            "name": "path",
            "color": "hsl(51, 70%, 50%)",
            "children": [
              {
                "name": "pathA",
                "color": "hsl(228, 70%, 50%)",
                "loc": 95719
              },
              {
                "name": "pathB",
                "color": "hsl(244, 70%, 50%)",
                "children": [
                  {
                    "name": "pathB1",
                    "color": "hsl(76, 70%, 50%)",
                    "loc": 165271
                  },
                  {
                    "name": "pathB2",
                    "color": "hsl(283, 70%, 50%)",
                    "loc": 88159
                  },
                  {
                    "name": "pathB3",
                    "color": "hsl(124, 70%, 50%)",
                    "loc": 32780
                  },
                  {
                    "name": "pathB4",
                    "color": "hsl(319, 70%, 50%)",
                    "loc": 177359
                  }
                ]
              },
              {
                "name": "pathC",
                "color": "hsl(103, 70%, 50%)",
                "children": [
                  {
                    "name": "pathC1",
                    "color": "hsl(56, 70%, 50%)",
                    "loc": 178910
                  },
                  {
                    "name": "pathC2",
                    "color": "hsl(121, 70%, 50%)",
                    "loc": 131549
                  },
                  {
                    "name": "pathC3",
                    "color": "hsl(180, 70%, 50%)",
                    "loc": 118837
                  },
                  {
                    "name": "pathC4",
                    "color": "hsl(276, 70%, 50%)",
                    "loc": 87543
                  },
                  {
                    "name": "pathC5",
                    "color": "hsl(93, 70%, 50%)",
                    "loc": 32807
                  },
                  {
                    "name": "pathC6",
                    "color": "hsl(50, 70%, 50%)",
                    "loc": 125226
                  },
                  {
                    "name": "pathC7",
                    "color": "hsl(172, 70%, 50%)",
                    "loc": 4805
                  },
                  {
                    "name": "pathC8",
                    "color": "hsl(109, 70%, 50%)",
                    "loc": 28587
                  },
                  {
                    "name": "pathC9",
                    "color": "hsl(194, 70%, 50%)",
                    "loc": 90569
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

const CirclePackingGraph = () =>{
    const MyResponsiveCirclePacking = ({ data /* see data tab */ }) => (
        <ResponsiveCirclePacking
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            id="name"
            value="loc"
            colors={{ scheme: 'nivo' }}
            childColor={{ from: 'color', modifiers: [ [ 'brighter', 0.4 ] ] }}
            padding={4}
            enableLabels={true}
            labelsFilter={function(e){return 2===e.node.depth}}
            labelsSkipRadius={10}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.5 ] ] }}
            defs={[
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'none',
                    color: 'inherit',
                    rotation: -45,
                    lineWidth: 5,
                    spacing: 8
                }
            ]}
            fill={[ { match: { depth: 1 }, id: 'lines' } ]}
        />
    )

    const {t , i18n} = useTranslation()
    return(<>
       <div className="circle_packing_graph">
         <h3>{t("GENDER Vs. PER POI's")}</h3>
          <MyResponsiveCirclePacking  data = {data} />
       </div>
    </>)
}

// exporting the graph component ;
export default CirclePackingGraph ;