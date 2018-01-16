import React from 'react';
import { KModal } from "../../Common"

const LineChartView = ({ config }) => {
  return (
    <AmCharts.React style={{ width: "100%", height: "400px" }} options={config} /> 
  );
}

export default LineChartView;