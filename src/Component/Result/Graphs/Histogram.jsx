// here we are going to create double histogram graph ;
import React from "react";
import { useTranslation } from "react-i18next";

import {
  Histogram,
  DensitySeries,
  BarSeries,
  withParentSize,
  XAxis,
  YAxis
} from "@data-ui/histogram";

const ResponsiveHistogram = withParentSize(
  ({ parentWidth, parentHeight, ...rest }) => (
    <Histogram width={parentWidth} height={parentHeight} {...rest} />
  )
);
const rawData = Array(100).fill().map(Math.random);
export default function HistogramGraph() {
  return (
    <div className="histogramgraph" >
     <ResponsiveHistogram
        ariaLabel="My histogram of ..."
        orientation="vertical"
        cumulative={false}
        normalized={true}
        binCount={25}
        valueAccessor={datum => datum}
        binType="numeric"
        renderTooltip={({ event, datum, data, color }) => (
          <div>
            <strong style={{ color }}>{datum.bin0} to {datum.bin1}</strong>
            <div><strong>count </strong>{datum.count}</div>
            <div><strong>cumulative </strong>{datum.cumulative}</div>
            <div><strong>density </strong>{datum.density}</div>
          </div>
        )}
      >
        <BarSeries
          animated
          rawData={rawData /* or binnedData={...} */}
        />
        <XAxis />
        <YAxis />
      </ResponsiveHistogram>
    </div>
  );
}