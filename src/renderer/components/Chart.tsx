import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  type: ReactApexChart['props']['type'];
  options: ReactApexChart['props']['options'];
  series: ReactApexChart['props']['series'];
  showLabels?: boolean;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ options, series, type, showLabels = true, height }) => {
  return (
    <div className="flex-1 bg-white rounded-lg">
      <ReactApexChart
        type={type}
        options={{
          grid: {
            show: false
          },
          chart: { type, id: 'basic-bar', zoom: { enabled: false }, toolbar: { show: false } },
          dataLabels: {
            enabled: showLabels,
            formatter: function (val, opts) {
              if (type === 'scatter') {
                return
              }
              return type === 'bar' || type === 'line' ? val : opts.w.config.series[opts.seriesIndex]
            },
          },
          ...options,
        }}
        series={series}
        height={height || 350}
      // width={400}
      />
    </div>
  );
}

export default Chart;
