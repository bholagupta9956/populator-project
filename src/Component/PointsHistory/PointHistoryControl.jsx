// here we will controll the point history view part with the call function ;

import React from "react";
import GraphView from "./GraphView";
import TableData from "./TableData";
import TableView from "./TableView";
import { useSelector } from "react-redux";
import PointHistory from "./PointsHistory";

const PointHistoryControl = () =>{
    const mystate = useSelector((state) => state.PointHistory.view);

    if(mystate === "tableView"){
        return <TableView/>
    }
    else if(mystate === "dataView"){
        return <TableData/>
    }
    else if(mystate === "graphView"){
        return <GraphView/>
    }

    return (<></>)
}

export default PointHistoryControl;