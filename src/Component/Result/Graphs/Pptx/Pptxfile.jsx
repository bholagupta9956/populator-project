// here we are creating this file just to download as pptx ;
import React, { useEffect , useState } from "react";
import { Modal } from "react-bootstrap";
import pptxgen from "pptxgenjs";
import Darkgraph from "../../ResultImages/darkgraphs.svg";
import Population from "../../ResultImages/population.svg";
import Home from "../../ResultImages/home2.svg";
import Income from "../../ResultImages/income.svg";
import LineBar from "../../ResultImages/linebar.svg";
import Incomegraph from "../../ResultImages/incomegraph.svg";
import Arealine from "../../ResultImages/areachart.svg";
import Roadline from "../../ResultImages/roadlines.svg";
import Plots from "../../ResultImages/landpart.svg";
import Logo from "../GraphImages/Logo.svg";
import First from "./images/first.png" ;
import Footer from "./images/footer.png" ;
import Background from "./images/background.png";
import Background2 from "./images/background2.png";
import Jeddah1 from "./images/jeddah1.png" ;
import Jeddah2  from "./images/jeddah2.png";
import Jeddah3 from "./images/jeddah3.png";
import Legends from "./images/legend.png";
import Second from "./images/second.png" ;


import {
  IMAGE_PATHS,
  BASE_TABLE_OPTS,
  BASE_TEXT_OPTS_L,
  BASE_TEXT_OPTS_R,
  COLOR_RED,
  COLOR_AMB,
  COLOR_GRN,
  COLOR_UNK,
  TESTMODE,
} from "./enums.mjs";
import "./pptx.css";



const Pptxfile = (props) => {

  const  [ classData , setClassData ] = useState({
    poor : 23 ,
    midclass : 43 ,
    rich : 45 ,
    unclassified : 24
  })

  const items = props.items ;

  const [pyramidData ,setPyramidData] = useState({
    category : ['1-4' , '5-12' , '13-18' , '20-28' , '30-40' , '40-50'],
    fmarr : [15 , 25 , 12 , 23 , 15 , 10] ,
    male : [17,13 , 22 , 23 , 15 , 10]
  })
 
  useEffect(() =>{

    const info = props.projectInfo;

    let pptx = new pptxgen();

    // first slide ;
    let slide1 = pptx.addSlide();
   
    slide1.addImage({x : 0 , y : 0 , w : 10 , h : 7 , path : First})

    // Second slide ;

    let slide2 = pptx.addSlide();

    slide2.addImage({x : 0 , y : 0 , w : 10 , h : 7 , path : Background})

    slide2.addImage({ x : 4.8 , y : 1.5 , w : 4.1 , h : 4.6 , path : Jeddah1});
    slide2.addImage({ x : 3.0 , y : 3.1 , w : 2.0 , h : 2.6 , path : Jeddah2});

    slide2.addText("Population : 3.9 m " ,{ w :  1.6 , h : 0.6 , isTextBox : true  , x : 2.0  , y : 4.3 , align : 'center' , color : "#20a8f7" , fontSize : 11});

    slide2.addText("Area : 2110 km²  " ,{ w :  1.6 , h : 0.6 , isTextBox : true  , x : 2.0  , y : 4.5 , align : 'center' , color : "#20a8f7" , fontSize : 11});

    // Third slide ;

    let slide3 = pptx.addSlide();
    slide3.addImage({x : 0 , y : 0 , w : 10 , h : 7 , path : Second});

    slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#ffffff" } , x : 6.8 , y : 2 , w : 2.5 , h : 2.0, rectRadius :  0.1  });

    slide3.addText("GEO-SPATIAL" ,{  x : 4.38  , y : 2.6 , align : 'center' , color : "#383636" , fontSize : 23});

    slide3.addText("ANALYTICS ON" ,{ x :  4.36 , y : 3   , align : 'center' , color : "#383636" , fontSize : 23});
    slide3.addText("JEDDAH" ,{ x :  4.39 , y : 3.4   , align : 'center' , color : "#383636" , fontSize : 23});
   
  // Fouth slide ;
  let slide4 = pptx.addSlide();

  slide4.addImage({x : 0 , y : 0 , w : 10 , h : 7 , path : Background2});
  slide4.addText("POPULATION CONCENTRATED OVER 480 SQ-KM (30% OF CITY LIMITS) WITH 50% OF RESIDENT EXPATRIATES" ,{  x : 2.6  , y : 0.64 , align : 'center' , color : "#20a8f7" , fontSize : 14 , w : 4.7})

  slide4.addText("Jeddah is a country's commercial center. With a populationof about 3.9 million people (as of 2020) , Jeddah is the largest city in Makkah Province, the second-largest in Saudi Arabia (after the capital Riyadh) , and the eight-largest in the Middle East. Jeddah Islamic Port, located on the Red Sea, is the thirty-sixth largest seaport in the world and the second-largest and second-busiest seaport in the Middle East . Jeddah is the principal gateway to Mecca, the holiest city in Islam, located just 65 kilometers (40 mi) to the east, While Medina, the second-holiest city, is located 360 kilometers (220 mi) to the north. Economically, Jeddah is focusing on further developing capital investment in scientific and engineering leadership within Saudi Arabia, and the Middle East" ,{  x : 0.3  , y : 2.1 , align : 'left' , color : "#383636" , fontSize : 11 , w : 5.8})

  slide4.addText("AMBIENT POPULATION HEATMAP" , { x : 6.2 , y : 1.5 , align : "left" , fontSize : 14 , color : "#20a8f7" ,})
  slide4.addImage({x : 6.3 , y : 1.7 , w : 2.4 , h : 4.5 , path : Jeddah3});

  slide4.addImage({x : 8.6 , y : 1.7 , w : 1.4 , h : 1.4 , path : Legends});


  // fifth slide ;

  const slide5 = pptx.addSlide();

    slide5.addImage({x: 0.2, y: 0.15, w: 3, h: 1.0, path: Logo });
     

    // adding the first slide here

    slide5.addText( `Email : ${info.email}`, {
      x: 0.2,
      y: 1.0,
      w: 3,
      h: 0.3,
      align: "left",
      fontSize: 14,
      color: "696969",
      
    });
    slide5.addText( `Phone No. : +91 ${info.number}`, {
      x: 0.2,
      y: 1.3,
      w: 6,
      h: 0.3,
      align: "left",
      fontSize: 14,
      color: "696969",
      
    });
    slide5.addText( `Company : ${info.company}`, {
      x: 0.2,
      y: 1.6,
      w: 6,
      h: 0.3,
      align: "left",
      fontSize: 14,
      color: "696969",
      
    });
    slide5.addText( `Address : ${info.address}`, {
      x: 0.2,
      y: 1.9,
      w: 6,
      h: 0.3,
      align: "left",
      fontSize: 14,
      color: "696969",
      
    },[]);

    slide5.addText("", { shape: pptx.ShapeType.line, line: { color: "696969", width: 1, dashType: "lgDash"  } , x : 0.2 , y : 2.3 , align : "left" , w : 9});
    
    // adding map image ;
    slide5.addImage({x: 0.2, y: 2.4, w: 9.0, h: 3.0, path: props.mapImage });
    slide5.addText( `Company : ${info.company}`, {
      x: 0.2,
      y: 1.6,
      w: 6,
      h: 0.3,
      align: "left",
      fontSize: 14,
      color: "696969",
      
    });

  //   // working on the next slides ;
  //   // here we are creating the first box for the population;
    const data = props.resultData;

    const slide6 = pptx.addSlide();
     // first box;

     if(items.indexOf(5) !== -1){
    slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#f57f59" } , x : 0.4 , y : 0.4 , w : 2.0 , h : 0.96, rectRadius :  0.1  });
   
    slide6.addImage({x: 0.5, y: 0.53, w: 0.2, h: 0.18, path: Population });
    slide6.addText( `POPULATION`, {
      x: 0.7,
      y: 0.47,
      w: 1.2,
      h: 0.3,
      align: "left",
      fontSize: 11,
      color: "#fff",
    });

    slide6.addText( `${data.population}`, {
      x: 0.43,
      y: 0.73,
      w: 1.2,
      h: 0.3,
      align: "left",
      fontSize: 13,
      color: "#fff",
    });
    slide6.addText( "Selected Area Population", {
      x: 0.40,
      y: 0.98,
      w: 1.9,
      h: 0.3,
      align: "left",
      fontSize: 10,
      color: "#fff",
    });
  }

    // Second box;
    if(items.indexOf(6) !== -1){
    slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#519ee4" } , x : 2.8 , y : 0.4 , w : 2.0 , h : 0.96, rectRadius :  0.1  });

    slide6.addImage({x: 2.9, y: 0.53, w: 0.2, h: 0.18, path: Home });
    slide6.addText( `# OF HOMES`, {
      x: 3.1,
      y: 0.47,
      w: 1.2,
      h: 0.3,
      align: "left",
      fontSize: 11,
      color: "#fff",
    });

    slide6.addText( `${data.homes}`, {
      x: 2.83,
      y: 0.73,
      w: 1.2,
      h: 0.3,
      align: "left",
      fontSize: 13,
      color: "#fff",
    });
    slide6.addText( "Home In Selected Area", {
      x: 2.8,
      y: 0.98,
      w: 1.9,
      h: 0.3,
      align: "left",
      fontSize: 10,
      color: "#fff",
    });
  }

     // third box;

     if(items.indexOf(8) !== -1){

     slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#5533cf" } , x : 5.2 , y : 0.4 , w : 2.0 , h : 0.96, rectRadius :  0.1  });

     slide6.addImage({x: 5.3, y: 0.53, w: 0.2, h: 0.18, path: Income });
     slide6.addText( `# OF INCOME`, {
       x: 5.5,
       y: 0.47,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 11,
       color: "#fff",
     });
 
     slide6.addText( `${data.incomes}`, {
       x: 5.23,
       y: 0.73,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 13,
       color: "#fff",
     });
     slide6.addText( "Income In Selected Area", {
       x: 5.2,
       y: 0.98,
       w: 1.9,
       h: 0.3,
       align: "left",
       fontSize: 10,
       color: "#fff",
     });
    }

    //  another row box
    // fourth box ;

    if(items.indexOf(12) !== -1){
    slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#726f6f" } , x : 0.4 , y : 1.7 , w : 2.0 , h : 0.96, rectRadius :  0.1  });
   
    slide6.addImage({x: 0.5, y: 1.83, w: 0.2, h: 0.18, path: Roadline });
    slide6.addText( `ROADS COVERAGE`, {
      x: 0.7,
      y: 1.77,
      w: 1.7,
      h: 0.3,
      align: "left",
      fontSize: 11,
      color: "#fff",
    });

    slide6.addText( `${data.road_coverage}`, {
      x: 0.43,
      y: 2.03,
      w: 1.2,
      h: 0.3,
      align: "left",
      fontSize: 13,
      color: "#fff",
    });
    slide6.addText( "Area Coverage", {
      x: 0.40,
      y: 2.28,
      w: 1.9,
      h: 0.3,
      align: "left",
      fontSize: 10,
      color: "#fff",
    });
  }

     // fifth box;
     if(items.indexOf(11) !== -1){
     slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#ed589d" } , x : 2.8 , y : 1.7 , w : 2.0 , h : 0.96, rectRadius :  0.1  });

     slide6.addImage({x: 2.9, y: 1.83, w: 0.2, h: 0.18, path: Arealine });
     slide6.addText( `AREA IN (KM²)`, {
       x: 3.1,
       y: 1.77,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 11,
       color: "#fff",
     });
 
     slide6.addText( `${data.area}`, {
       x: 2.83,
       y: 2.03,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 13,
       color: "#fff",
     });
     slide6.addText( "Selected Area On Map", {
       x: 2.8,
       y: 2.28,
       w: 1.9,
       h: 0.3,
       align: "left",
       fontSize: 10,
       color: "#fff",
     });
    }

     // Sixth box;
     if(items.indexOf(10) !== -1){
     slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, { fill: { color: "#0a6bbf" } , x : 5.2 , y : 1.7 , w : 2.0 , h : 0.96, rectRadius :  0.1  });

     slide6.addImage({x: 5.3, y: 1.83, w: 0.2, h: 0.18, path: Plots });
     slide6.addText( `PLOTS`, {
       x: 5.5,
       y: 1.77,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 11,
       color: "#fff",
     });
 
     slide6.addText( `${data.total_plots}`, {
       x: 5.23,
       y: 2.03,
       w: 1.2,
       h: 0.3,
       align: "left",
       fontSize: 13,
       color: "#fff",
     });
     slide6.addText( "Selected Plots on Map", {
       x: 5.2,
       y: 2.28,
       w: 1.9,
       h: 0.3,
       align: "left",
       fontSize: 10,
       color: "#fff",
     });
    }

    //  DOUGHNUT CHART ;
    let slide7 = pptx.addSlide({ sectionTitle: "Charts" });

    if(items.indexOf(9) !== -1){

      if(data.social_class){
        setClassData(data.social_class)
      }

    const dataChartPieStat = [
      {
        name: "Project Status",
        labels: ["Red", "Amber", "Green", "Complete", "Cancelled", "Unknown"],
        values: [25, 5, 5, 5, 5, 5],
      },
    ];

    const dataChartPieLocs = [
      {
        name: "Location",
        labels: ["Poor" ,"Rich",  "Middle" , "Unclassified"  ],
        values: [classData.poor  , classData.rich , classData.midclass  , classData.unclassified ],
      },
    ];
  
  slide7.addText( `SOCIAL CLASS IN DOUGHNUT CHART`, {
    x: 0.4,
    y: 0.28,
    w: 3,
    h: 0.3,
    align: "left",
    fontSize: 11,
    color: "#2470f2",
  });

  slide7.addText("", { shape: pptx.ShapeType.line, line: { color: "696969", width: 1  } , x : 0.5 , y : 0.5 , align : "left" , w : 2.4});

	let optsChartPie2 = {
		x: 0.1,
		y: 0.4,
		w: 4.8,
		h: 4.8,
		dataBorder: { pt: "3", color: "F1F1F1" },
		dataLabelColor: "FFFFFF",
		showLabel: true,
    dataLabelFontSize : 11 ,
		showValue: true,
		showPercent: true,
		showLegend: false,
		showTitle: false,
		title: "Resource Totals by Location",
		shadow: {
			type: "inner",
			offset: 20,
			blur: 20,
		},
	};
	slide7.addChart(pptx.charts.DOUGHNUT, dataChartPieLocs, optsChartPie2);
    }
    
  // POPULATION PYRAMID ;

  if(items.indexOf(5) !== -1){

  if(data.data){
    const  category = data.data.categories;
    const categories = category.reverse();
    const fmale = data.data.series.gender.fdata;
    const fmarr = fmale.map(i => '-' + parseInt(i));
    const fmarrr = fmarr.reverse();
  
    const mal = data.data.series.gender.data;
    const male = mal.map(i => parseInt(i));
    const malee = male.reverse();
  
    setPyramidData({
      category : categories ,
      fmarr : fmarr ,
      male : male
    })
  
  }

  slide7.addText( `POPULATION PYRAMID`, {
    x: 4.7,
    y: 0.28,
    w: 3,
    h: 0.3,
    align: "left",
    fontSize: 11,
    color: "#2470f2",
  });

  slide7.addText("", { shape: pptx.ShapeType.line, line: { color: "696969", width: 1  } , x : 4.8 , y : 0.5 , align : "left" , w : 2});


	slide7.addChart(
		pptx.charts.BAR,
		[
			{
				name: "Males",
				labels: pyramidData.category,
				values: pyramidData.male,
			},
			{
				name: "Females",
				labels: pyramidData.category,
				values: pyramidData.fmarr,
			},
		],
		{
			x: 4.6,
			y: 0.8,
			w: "50%",
			h: "75%",
			valAxisMaxVal: 17,
      valAxisMinVal : -17,
			barDir: "bar",
			axisLabelFormatCode: "#%",
			catGridLine: { color: "D8D8D8", style: "dash", size: 1 },
			valGridLine: { color: "D8D8D8", style: "dash", size: 1 },
			catAxisLineShow: false,
			valAxisLineShow: false,
			barGrouping: "stacked",
			catAxisLabelPos: "low",
			valueBarColors: true,
			shadow: { type: "none" },
			chartColors: ["0077BF", "4E9D2D", "ECAA00", "5FC4E3", "DE4216", "154384", "7D666A", "A3C961", "EF907B", "9BA0A3"],
			invertedColors: ["0065A2", "428526", "C99100", "51A7C1", "BD3813", "123970", "6A575A", "8BAB52", "CB7A69", "84888B"],
			barGapWidthPct: 25,
			valAxisMajorUnit: 3,
		}
	);
  }


  // AREA GRAPH ;

  let slide8 = pptx.addSlide({ sectionTitle: "Charts" });

  if(items.indexOf(10) !== -1){

  slide8.addText( `USED PLOTS & UNUSED PLOTS`, {
    x: 0.4,
    y: 0.1,
    w: 3,
    h: 0.3,
    align: "left",
    fontSize: 11,
    color: "#2470f2",
  });

	slide8.addText("", { shape: pptx.ShapeType.line, line: { color: "696969", width: 1  } , x : 0.5 , y : 0.34 , align : "left" , w : 2.4});

	let arrDataAreaSm = [
		{
			name: "Small Samples",
			labels: ["Q1", "Q2", "Q3", "Q4"],
			values: [15, 46, 31, 85],
		},
	];
	let arrDataTimeline2ser = [
		{
			name: "Actual Sales",
			labels: data.plots && data.plots,
			values: data[0],
		},
	];

    // TOP-RIGHT (stacked area chart)
	let optsChartLine2 = {
		x: 0.5,
		y: 0.6,
		w: "45%",
		h: 3,
		chartColors: ["0088CC", "99FFCC"],
		chartColorsOpacity: 25,
		valAxisLabelRotate: 5,
		dataBorder: { pt: 2, color: "FFFFFF" },
		showValue: false,
		fill: "D1E1F1",
		barGrouping: "stacked",
	};

	slide8.addChart(pptx.charts.AREA, arrDataTimeline2ser, optsChartLine2);
  
  }
  
  // nineth slide ;

  const slide9 = pptx.addSlide();

  slide9.addImage({x : 0 , y : 0 , w : 10 , h : 7 , path : Footer});

  slide9.addText("WE HOPE TO EMBARK ON THIS JOURNEY THROUGH PARTNERSHIP." , { x : 1.3 , y : 1.3 , color : '#ffffff'  , fontSize : 19 , });
  
  slide9.addText("WE WOULD BE GLAD TO DISCUSS FURTHER." , { x : 2.3 , y : 1.8 , color : "#ffffff" , fontSize : 19});

    if(props.download === true){
      pptx.writeFile({ fileName: "populator1.ppt" });
    }
   
  },[props.download])


  return (
    <>
      <div className="pptxfile">
        
        
      </div>
    </>
  );
};

// exporting the component ;
export default Pptxfile;
