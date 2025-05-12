import { useMemo } from "react";
import Chart from "../Chart";
import { formatDurationSmart, formatTimeDisplay, secondsToHours } from "../../utils/date-fromats";
import { PiTrendDownBold, PiTrendUpBold } from "react-icons/pi";

interface DashboardUsageGraphProps {
  days: string[];
  data: number[];
  dailyAvgUsage: number;
  previousDailyAvgUsage: number;
}

function calculateWeeklyChange(current: number, previous: number): { percent: number; direction: 'up' | 'down' | 'neutral' } {
  if (previous === 0) {
    if (current === 0) {
      return {
        percent: 0,
        direction: 'neutral',
      };
    }
    return {
      percent: 100,
      direction: 'up',
    };
  }

  const change = ((current - previous) / previous) * 100;
  return {
    percent: Number(Math.abs(change).toFixed(2)),
    direction: change >= 0 ? 'up' : 'down',
  };
}

function DashboardUsageGraph({ days, data, dailyAvgUsage, previousDailyAvgUsage }: DashboardUsageGraphProps) {
  const dataInHours = useMemo(() => data.map(seconds => secondsToHours(seconds)), [data]);
  const dailyAvgUsageInHours = useMemo(() => secondsToHours(dailyAvgUsage), [dailyAvgUsage]);

  const maxUsage = useMemo(() => {
    const maxDataValue = Math.max(...dataInHours);
    if (maxDataValue < 1) {
      return Math.ceil(maxDataValue * 2) / 2;
    } else if (maxDataValue < 6) {
      return Math.ceil(maxDataValue);
    } else if (maxDataValue < 12) {
      return 12;
    }
    return 24;
  }, [dataInHours]);

  const chartSeries = useMemo(() => {
    return [{
      name: 'Usage',
      data: dataInHours
    }];
  }, [dataInHours]);

  const remainingData = useMemo(() => {
    console.log("Remaining Data: ", dataInHours, maxUsage);
    return dataInHours.map(usage => Math.max(0, maxUsage - usage));
  }, [dataInHours, maxUsage]);

  const previousComparison = calculateWeeklyChange(dailyAvgUsage, previousDailyAvgUsage);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-stroke-dark text-sm font-light">Daily Average</h2>
          <h1 className="text-xl text-text font-semibold">{formatDurationSmart(dailyAvgUsage * 1000)}</h1>
        </div>
        <p className="text-sm align-middle">
          {previousComparison.direction === 'up' ? (
            <PiTrendUpBold className={`inline-block mr-2 text-green-500`} />
          ) : previousComparison.direction === 'down' ? (
            <PiTrendDownBold className={`inline-block mr-2 text-red-500`} />
          ) : null}
          <span className="text-text mr-2">{previousComparison.percent}%</span>
          <span className="text-stroke-dark">from last week</span>
        </p>
      </div>

      <Chart
        type="bar"
        height={200}
        showLabels={false}
        options={{
          chart: {
            stacked: true,
            toolbar: { show: false },
          },
          grid: { show: false },
          xaxis: {
            categories: days,
            labels: {
              style: { colors: '#718096', fontSize: '12px' }
            },
            axisTicks: { show: false },
            axisBorder: { show: false }
          },
          yaxis: {
            show: true,
            max: maxUsage,
            min: 0,
            tickAmount: maxUsage <= 1 ? 2 : Math.min(6, maxUsage),
            labels: {
              formatter: (val) => {
                return formatTimeDisplay(val);
              },
              style: { colors: '#718096', fontSize: '12px' }
            }
          },
          legend: { show: false },
          fill: {
            colors: ['#3b82f6', '#e5e7eb'],
          },
          plotOptions: {
            bar: {
              columnWidth: '40%',
              borderRadius: 4,
            },
          },
          annotations: {
            yaxis: [
              {
                y: dailyAvgUsageInHours,
                borderColor: '#a0aec0',
                strokeDashArray: 5,
                label: {
                  text: 'avg',
                  position: "left",
                  style: {
                    color: '#4a5568',
                    fontSize: '12px',
                  }
                }
              }
            ]
          },
        }}
        series={[
          ...chartSeries,
          {
            name: 'Remaining',
            data: remainingData
          }
        ]}
      />

      <div className="flex justify-between text-sm text-gray-700 px-2">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-sm bg-blue-500" />
          <span>Usage</span>
          <span className="text-gray-500">{formatDurationSmart(dailyAvgUsage * 1000)}</span>
        </div>
        {maxUsage < 24 && (
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-gray-200" />
            <span>Available</span>
            <span className="text-gray-500">{formatTimeDisplay(maxUsage)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardUsageGraph;