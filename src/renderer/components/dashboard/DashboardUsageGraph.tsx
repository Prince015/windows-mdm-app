import { useMemo } from "react";
import Chart from "../Chart";
import { generateRandomColor } from "../../utils/helper";
import { formatTimeDisplay } from "../../utils/date-fromats";
import { DashboardData, UsageData } from "../../interfaces/dashboard.interface";

const calculateAverageUsage = (categories: UsageData[], days: string[]): number => {
  const activeCategories = categories.filter(cat => cat.category !== 'Remaining');
  const dailyTotals = days.map((_, dayIndex) => {
    return activeCategories.reduce((sum, category) => sum + category.data[dayIndex], 0);
  });

  return dailyTotals.reduce((sum, val) => sum + val, 0) / dailyTotals.length;
};

function DashboardUsageGraph() {
  const categoriesWithColors = useMemo(() => {
    return usageData.categories.map(category => ({
      ...category,
      color: category.color || generateRandomColor(),
      displayTime: formatTimeDisplay(
        category.data.reduce((sum, hours) => sum + hours, 0) / category.data.length
      )
    }));
  }, []);

  const allCategories = useMemo(() => {
    const MAX_HOURS_PER_DAY = 24;

    const remainingData = usageData.days.map((_, dayIndex) => {
      const usedHours = categoriesWithColors.reduce(
        (total, category) => total + category.data[dayIndex],
        0
      );
      return Math.max(0, MAX_HOURS_PER_DAY - usedHours);
    });

    return [
      ...categoriesWithColors,
      {
        category: 'Remaining',
        color: '#e5e7eb',
        data: remainingData,
        displayTime: ''
      }
    ];
  }, [categoriesWithColors]);

  const averageUsage = useMemo(() => {
    const avg = calculateAverageUsage(categoriesWithColors, usageData.days);
    return formatTimeDisplay(avg);
  }, [categoriesWithColors]);

  const chartSeries = useMemo(() => {
    return allCategories.map(category => ({
      name: category.category,
      data: category.data
    }));
  }, [allCategories]);

  const fillColors = useMemo(() => {
    return allCategories.map(category => category.color);
  }, [allCategories]);

  const avgLineValue = useMemo(() => {
    const activeCategories = categoriesWithColors;
    const dailyTotals = usageData.days.map((_, dayIndex) => {
      return activeCategories.reduce((sum, category) => sum + category.data[dayIndex], 0);
    });

    return dailyTotals.reduce((sum, val) => sum + val, 0) / dailyTotals.length;
  }, [categoriesWithColors]);

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-stroke-dark text-sm font-light">Daily Average</h2>
          <h1 className="text-xl text-text font-semibold">{averageUsage}</h1>
        </div>
        <p className="text-sm">
          {usageData.weeklyChange.direction === 'up' ? '🔺' : '🔻'}{' '}
          <span className="text-text">{usageData.weeklyChange.percent}%</span>{' '}
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
            categories: usageData.days,
            labels: {
              style: { colors: '#718096', fontSize: '12px' }
            },
            axisTicks: { show: false },
            axisBorder: { show: false }
          },
          yaxis: {
            show: true,
            max: 24,
            min: 0,
            stepSize: 24,
            labels: {
              formatter: (val) => {
                return formatTimeDisplay(val);
              },
              style: { colors: '#718096', fontSize: '12px' }
            }
          },
          legend: { show: false },
          fill: {
            colors: fillColors,
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
                y: avgLineValue,
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
        series={chartSeries}
      />

      <div className="flex justify-between text-sm text-gray-700 px-2">
        {allCategories
          .filter(category => category.category !== 'Remaining')
          .map((category, index) => (
            <div key={index} className="">
              <div className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.category}</span>
              </div>
              <span className="text-gray-500">{category.displayTime}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DashboardUsageGraph;

const usageData: DashboardData = {
  days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  categories: [
    {
      category: 'Learning',
      data: [3.5, 2.8, 4.2, 3.9, 2.5, 3.2, 4.7],
      displayTime: formatTimeDisplay(3.5)
    },
    {
      category: 'Entertainment',
      data: [1.2, 2.5, 1.8, 1.5, 2.0, 3.2, 2.5],
      displayTime: formatTimeDisplay(2.1)
    },
    {
      category: 'Games',
      data: [0.8, 1.5, 0.5, 1.2, 2.3, 1.1, 3.2],
      displayTime: formatTimeDisplay(1.5)
    },
    {
      category: 'Work',
      data: [6.5, 7.8, 8.2, 7.5, 7.3, 6.1, 0],
      displayTime: formatTimeDisplay(6.2)
    }
  ],
  dailyAverage: "12.5h",
  weeklyChange: {
    percent: 20,
    direction: 'up'
  }
};
