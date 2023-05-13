// this is  the component where all the graphs will be maintained ;

import React, {
  useState,
  createRef,
  useEffect,
  useCallback,
  useRef,
} from "react";
import PieChartGraph from "./Piechart";
import DoubleLinegraph from "./DoubleLinegraph";
import BarLinegraph from "./BarLinegraph";
import SunBrustGraph from "./SunBrustGraph";
import ScrollingData, { PoiGraph } from "./Poi&CurveGraph";
import PyramidGraph from "./PyramidGraph";
import HistogramGraph from "./Histogram";
import BubbleChartGraph from "./BubbleChart";
import ChordGraph from "./ChordGraph";
import CirclePackingGraph from "./CirclePackingGraph";
import CalenderGraph from "./CalendarGraph";
import RadarGraph from "./RadarGraph";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import Export from "../ResultImages/export.svg";
import pptxgen from "pptxgenjs";
import Logo from "./GraphImages/Logo.svg";
import PptxGenJS from "pptxgenjs";
import SaveWhite from "../ResultImages/savewhite.svg";
// import { getShapeData, updateResultScreenData } from "."
import ToolsWhite from "../ResultImages/toolswhite.svg";
import {
  getShapeData,
  showNotification,
  showPoiData,
  showGraphicalDatas,
  showSavedShapes,
  updateResultScreenData,
} from "../../../actions";
// here the result css will handle the upper part of the graphical data ;
import "../Result.css";
// icons
import SavedShapeData from "./SavedShapedData/SavedShapeData";
import Darkgraph from "../ResultImages/darkgraphs.svg";
import Population from "../ResultImages/population.svg";
import Home from "../ResultImages/home2.svg";
import Income from "../ResultImages/income.svg";
import LineBar from "../ResultImages/linebar.svg";
import Incomegraph from "../ResultImages/incomegraph.svg";
import Arealine from "../ResultImages/areachart.svg";
import Roadline from "../ResultImages/roadlines.svg";
import Plots from "../ResultImages/landpart.svg";
import { useSelector, useDispatch } from "react-redux";
import Save from "../ResultImages/save.svg";
import Menu from "../ResultImages/menuicon.svg";
import WhiteSave from "./GraphImages/whitesave.svg";
import Marker from "../ResultImages/marker.svg";
import Tools from "../ResultImages/tools.svg";
// import { useScreenshot, createFileName } from "use-react-screenshot";
import MarkerWhite from "../ResultImages/markerwhite.svg";
import Loader from "../../../utils/Loader";
import MapResult2 from "./MapResult2";
import jsPDF from "jspdf";
import Increase from "./GraphImages/increase.svg";
import ExportFormat from "./ExportFormat";
import SaveBlue from "../ResultImages/saveblue.svg";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import PointOfInterest from "./Poi's/PointOfInterest";
import resultPanelHandler from "../../../reducers/resultPanelHandler";
import axios from "axios";
import Pptxfile from "./Pptx/Pptxfile";

const Graphs = (props) => {
  // getting data from the store to show in the result part ;

  const ResultData = useSelector((state) => state.resultScreenData.result);

  
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { t, i18n } = useTranslation();
  const [headerAlign, setHeaderAlign] = useState("flex-start");
  const api = useSelector((state) => state.apiStore.url);

  const alreadyCheckedServices = useSelector(
    (state) => state.poiCheckedItem.servicesCheckedItems
  );
  const alreadySelectedServices = useSelector(
    (state) => state.poiCheckedItem.servicesSelectedItemss
  );

  const [mapData, setMapData] = useState(true);
  const poiState = useSelector((state) => state.poiHandler.show);
  const dispatch = useDispatch();
  const choosedLanguage = i18n.language;

  // here we are writing the function which will show and which will be not shown ;

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (alreadyCheckedServices.length > 0) {
      setItems([]);
      for (var i = 0; i < alreadyCheckedServices.length; i++) {
        const value = alreadyCheckedServices[i];
        setItems((item) => {
          return [...item, value];
        });
      }
    }
  }, []);

  const [icons, setIcons] = useState({
    saveIcon: Save,
    toolsIcon: Tools,
    menuIcon: Menu,
    poiIcon: { icon: Marker, background: "white", color: "var(--blue)" },
    saveShapeIcons: { icons: Save, background: "white", color: "var(--blue)" },
  });

  const screenView = useSelector(
    (state) => state.resultPanelHandler.dataFormat
  );

  const showPOI = () => {
    dispatch(showPoiData());
    setHeaderAlign("flex-start");
  };

  const showGraphicalData = () => {
    dispatch(showGraphicalDatas());
    setHeaderAlign("flex-start");
    setMapData(true);
  };

  const showShaveData = () => {
    dispatch(showSavedShapes());
    setHeaderAlign("flex-start");
  };

  const [exportFormat, setExportFormat] = useState(false);
  const [showMapResult, setShowMapResult] = useState(false);

  const selectExportFormat = () => {
    setLoading(true);
    setExportFormat(true);
    setShowMapResult(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  const closeExportFormat = () => {
    setExportFormat(false);
    setShowMapResult(false);
  };

  // giving internal css to the button ;
  const poi = {
    background: icons.poiIcon.background,
  };

  const poiText = {
    color: icons.poiIcon.color,
  };

  const saves = {
    background: icons.saveShapeIcons.background,
    marginRight: "40px",
  };

  const saveText = {
    color: icons.saveShapeIcons.color,
  };

  const ref = useRef(null);

  // writing a function which will download image ;

  const downloadImage = async () => {
    setShowMapResult(true);
    setLoading(true);
    setTimeout(() => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          if (dataUrl) {
          }
          const link = document.createElement("a");
          link.download = "my-image-name.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // here we are writing the function which will be used to download the pdf ;

  const statics = useRef();
  const graphics = useRef();

  const downloadPdf = async () => {
    setLoading(true);
    const pdf = new jsPDF();

    var img1 = await toPng(statics.current, { cacheBust: true }).then(
      (dataUrl) => {
         const link = document.createElement("a");
        var imgWidth = 200;
        var pageHeight = "100%";
        var imgHeight = "100%";
        link.download = "populator.png";
        link.href = dataUrl;
        var imgs = link.href;   
        pdf.addImage(imgs, "PNG", 16, 8);
        // pdf.addImage(imgs, "JPEG" );
      }
    );
    var img2 = await toPng(graphics.current, { cacheBust: true }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        var imgWidth = 180;
        var pageHeight = "100%";
        var imgHeight = "100%";
        link.download = "graphicss.png";
        link.href = dataUrl;
        
        var imgs = link.href;

        pdf.addPage();
        pdf.addImage(imgs, "PNG", 16, 8);
        // pdf.addImage(imgs, "JPEG" );
      }
    );

    setTimeout(() => {
      pdf.save("exportResult.pdf");
      setLoading(false);
    }, 2000);

    
  };

  const headerStyle = {
    justifyContent: headerAlign,
  };

  // HERE WE ARE GETTING THE FUNCTION WHICH DECIDE THAT WHICH SCREEN WILL BE SHOWN ;

  useEffect(() => {
    if (screenView === "graphicalData") {
      setIcons((oldata) => {
        return {
          ...oldata,
          poiIcon: { icon: Marker, background: "white", color: "var(--blue)" },
          saveShapeIcons: {
            icons: Save,
            background: "white",
            color: "var(--blue)",
          },
        };
      });
    } else if (screenView === "poiData") {
      setIcons((oldata) => {
        return {
          ...oldata,
          poiIcon: {
            icon: MarkerWhite,
            background: "var(--blue)",
            color: "white",
          },
          saveShapeIcons: {
            icons: Save,
            background: "white",
            color: "var(--blue)",
          },
        };
      });
    } else if (screenView === "savedShape") {
      setIcons((oldata) => {
        return {
          ...oldata,
          poiIcon: { icon: Marker, background: "white", color: "var(--blue)" },
          saveShapeIcons: {
            icons: WhiteSave,
            background: "var(--blue)",
            color: "white",
            border: "2px  solid red",
          },
        };
      });
    }
  }, [screenView]);

  // here we are getting the populator_info through the api ;

  const Token = useSelector((state) => state.authenication.token);
  const [projectInfo, setProjectInfo] = useState({});

  useEffect(() => {
    const urlLink = `${api}populator-info`;
    axios
      .get(urlLink, {
        headers: {
          Authorization: `Bearer ${Token}`,
          Accept: "application/json",
          "X-localization": choosedLanguage,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const value = res.data.populator_info[0];
          setProjectInfo(value);
        }
      });
  }, []);

  const [startDownload, setStartDownload] = useState(false);
  const [mapImage, setMapImage] = useState("");
  const mapRef = useRef();

  const downloadPptx = () => {
    setStartDownload(true);

    setTimeout(() => {
      setStartDownload(false);
    }, 200);
  };

  useEffect(() => {
    if (showMapResult) {
      setTimeout(() => {
        toPng(mapRef.current, { cacheBust: true }).then((dataUrl) => {
          if (dataUrl) {
          }
          const link = document.createElement("a");
          link.download = "map.png";
          link.href = dataUrl;
          var imgs = link.href;

          setMapImage(imgs);
        });
      }, 1500);
    }
  }, [showMapResult]);

  return (
    <>
      {/* here first of all we will add the numberic data after that graphs will be added below the numberic data  */}

      <div className="dataresult">
        <div className="dataresult_header" style={headerStyle}>
          <img
            src={Increase}
            style={{ marginRight: "40px", cursor: "pointer" }}
            alt="menu icon"
            className="dataresult_header_menu"
            onClick={showGraphicalData}
          />
          <div
            className="dataresult_header_items  dataresult-header-items1"
            onClick={showPOI}
            style={poi}
          >
            <img
              src={icons.poiIcon.icon}
              alt="marker icon"
              style={{ width: "15px" }}
            />
            <span style={poiText}>{t("Point of Interest")}</span>
          </div>

          <div
            className="dataresult_header_items"
            style={saves}
            onClick={showShaveData}
          >
            <img src={icons.saveShapeIcons.icons} alt="save icon" />
            <span style={saveText}>{t("Saved")}</span>
          </div>

          {screenView === "graphicalData" && (
            <div
              className="dataresult_header_export"
              onClick={selectExportFormat}
            >
              <img src={Export} alt="export icon" />
              <span>{t("Export")}</span>
            </div>
          )}

          {exportFormat && (
            <ExportFormat
              cut={closeExportFormat}
              downloadImage={downloadImage}
              downalodPdf={downloadPdf}
              downloadPptx={downloadPptx}
            />
          )}
        </div>

        {/* here we are adding the scrollable data  which will be scrolled  */}
        {screenView === "graphicalData" && (
          <div className="dataresult_row_scrollable">
            <div
              className="dataresult_container"
              ref={ref}
              id="dataresult_container"
            >
              <div ref={statics} style={{ paddingBottom: "10px" }}>
                {showMapResult && (
                  <>
                    <div className="brandLogo">
                      <img src={Logo} alt="logo img" />
                    </div>
                    <div className="projectInfo">
                      <div className="info_det">
                        <h6>Email </h6>
                        <h6>: &nbsp; {projectInfo.email}</h6>
                      </div>
                      <div className="info_det">
                        <h6>Phone No. </h6>
                        <h6>
                          : &nbsp;{projectInfo.code} {projectInfo.number}
                        </h6>
                      </div>
                      <div className="info_det">
                        <h6>Company </h6>
                        <h6>: &nbsp; {projectInfo.company}</h6>
                      </div>
                      <div className="info_det">
                        <h6>Address </h6>
                        <h6>: &nbsp; {projectInfo.address}</h6>
                      </div>
                      <hr />
                    </div>
                  </>
                )}

                {showMapResult && (
                  <div ref={mapRef}>
                    {" "}
                    <MapResult2 />{" "}
                  </div>
                )}

                <div className="dataresult_row2">
                  {items.indexOf(5) !== -1 && (
                    <div className="dataresult_row2_box1" id="special_box">
                      <div className="dataresult_row2_box_item">
                        <img
                          src={Population}
                          alt="population icons"
                          style={{ width: "18px", margin: "4px 12px" }}
                        />
                        <span>{t("POPULATION")}</span>
                      </div>
                      <div className="dataresult_row2_box1_col1">
                        <img src={LineBar} alt="linebar icon" />
                        <div className="dataresult_row2_box1_col1_1">
                          <h6>{ResultData.population}</h6>
                          <span>{t("Selected Area Population")}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {items.indexOf(6) !== -1 && (
                    <div className="dataresult_row2_box2" id="special_box">
                      <div className="dataresult_row2_box_item">
                        <img
                          src={Home}
                          alt="population icons"
                          style={{ width: "17px", margin: "4px 12px" }}
                        />
                        <span>{t("# OF HOMES")}</span>
                      </div>
                      <div className="dataresult_row2_box2_data">
                        <h6>{ResultData.homes}</h6>
                        <span>{t("Home In Selected Area")}</span>
                      </div>
                    </div>
                  )}

                  {items.indexOf(8) !== -1 && (
                    <div className="dataresult_row2_box3" id="special_box">
                      <div className="dataresult_row2_box_item">
                        <img
                          src={Income}
                          alt="population icons"
                          style={{ width: "19px", margin: "4px 12px" }}
                        />
                        <span>{t("INCOME")}</span>
                      </div>
                      <div className="dataresult_row2_box3_data">
                        <h6>{ResultData.incomes}</h6>
                        <img src={Incomegraph} alt=" graph " width="100%" />
                      </div>
                    </div>
                  )}

                  {items.indexOf(12) !== -1 && (
                    <div className="dataresult_row3_box1" id="special_box">
                      <div className="dataresult_row3_box_item">
                        <img
                          src={Roadline}
                          alt="population icons"
                          style={{ width: "18px", margin: "4px 12px" }}
                        />
                        <span>{t("ROADS COVERAGE")}</span>
                      </div>
                      <div className="dataresult_row3_box1_data">
                        <div>
                          <h6>{parseInt(ResultData.road_coverage).toFixed(2)}  km²</h6>
                          <span> {t("Area Coverage")}</span>
                        </div>
                        <img src={Darkgraph} alt="dark graph" />
                      </div>
                    </div>
                  )} 

                  {items.indexOf(11) !== -1 && (
                    <div className="dataresult_row3_box2" id="special_box">
                      <div className="dataresult_row3_box_item">
                        <img
                          src={Arealine}
                          alt="population icons"
                          style={{ width: "16px", margin: "4px 12px" }}
                        />
                        <span>{t("AREA IN (KM²)")}</span>
                      </div>
                      <div className="dataresult_row3_box2_data">
                        <h6>{ResultData.area}</h6>
                        <span>{t("Selected Area On Map")}</span>
                      </div>
                    </div>
                  )}

                  {items.indexOf(10) !== -1 && (
                    <div className="dataresult_row3_box3" id="special_box">
                      <div className="dataresult_row3_box_item">
                        <img
                          src={Plots}
                          alt="population icons"
                          style={{ width: "18px", margin: "4px 12px" }}
                        />
                        <span>{t("PLOTS")}</span>
                      </div>
                      <div
                        className="dataresult_row3_box3_data"
                        style={{ marginTop: "12px" }}
                      >
                        <h6>{ResultData.total_plots}</h6>

                        <span>{t("Selected Plots on Map")}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="dataresult_row3"></div> */}

                {/* here we are adding the graphical data which will be shown below the numeric data */}

                <div className="graphs" style={{ background: "white" }}>
                  <div
                    className="graphs_first_row"
                    style={{ marginBottom: "25px" }}
                  > 
                    {items.indexOf(10) !== -1 && <DoubleLinegraph />}
                    {items.indexOf(5) !== -1 && <PyramidGraph />}
                   
                  </div>
                </div>
              </div>
              <div
                className="graphs_second_row"
                style={{ background: "white", paddingBottom: "15px" }}
                ref={graphics}
              > {items.indexOf(9) !== -1 && <BarLinegraph />}
                
                {/* <BarLinegraph /> */}
              </div>

              <div className="graphs_third_row" style={{ display: "none" }}>
                <ScrollingData />
                <PoiGraph />
              </div>
              <div className="graphs_fourth_row" style={{ display: "none" }}>
                <SunBrustGraph />
                <HistogramGraph />
              </div>
              <div className="graphs_fifth_row" style={{ display: "none" }}>
                {/* here any graph will be added if required  */}
              </div>
              <div className="graphs_sixth_row" style={{ display: "none" }}>
                <ChordGraph />
                <CirclePackingGraph />
              </div>
              <div className="graphs_seventh_row" style={{ display: "none" }}>
                {/* here only one graph will be added which is calender graph  */}
                <CalenderGraph />
              </div>
              <div className="graphs_eight_row" style={{ display: "none" }}>
                <RadarGraph />
                <BubbleChartGraph />
              </div>
            </div>
          </div>
        )}

        {/* This is the point of interest screen  */}
        {screenView === "poiData" && <PointOfInterest />}

        {/* This is the saved data screen  */}
        {screenView === "savedShape" && <SavedShapeData />}

        {/* here we are adding the loader  */}
        {/* here we are adding the pptx file  */}
        <Pptxfile
          download={startDownload}
          projectInfo={projectInfo}
          mapImage={mapImage}
          resultData={ResultData}
          items={items}
        />

        {loading && <Loader />}
      </div>
    </>
  );
};

export default Graphs;
