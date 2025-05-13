import React, { useEffect, useState } from 'react'
import TabSwitcher from '../TabSwitcher'
import DashboardUsageGraph from './DashboardUsageGraph';
import DashboardAppUsageStats from './DashboardAppUsageStats';

const tabNames = ['Week', 'Day'];

function DashboardUsageContainer() {
    const [selectedTab, setSelectedTab] = useState(0);

    const [days, setDays] = useState<string[]>([]);
    const [data, setData] = useState<number[]>([]);
    const [highlight, setHighlight] = useState<{ app: string; duration: number, app_icon: string }[]>([]);
    const [dailyAvgUsage, setDailyAvgUsage] = useState(0);
    const [previousDailyAvgUsage, setPreviousDailyAvgUsage] = useState(0);

    useEffect(() => {
        window.electron.ipcRenderer
            .invoke("get-usage-data", { mode: selectedTab === 0 ? "This Week" : "Today" })
            .then((res) => {
                console.log(res);
                setDays(res.days);
                setData(res.data);
                setHighlight(res.highlight);
                setDailyAvgUsage(res.dailyAvgUsage);
                setPreviousDailyAvgUsage(res.previousDailyAvg);
            });
    }, [selectedTab]);

    return (
        <div className='py-4 px-4 bg-background flex flex-col rounded-2xl drop-shadow-md flex-[0.6]'>
            <TabSwitcher
                tabs={tabNames}
                onTabChange={(index) => {
                    setSelectedTab(index);
                }}
                initialIndex={selectedTab}
                containerClassName='max-w-96 w-full min-w-fit mx-auto'
            />
            <div className='flex flex-col overflow-y-auto'>
                <DashboardUsageGraph days={days} data={data} dailyAvgUsage={dailyAvgUsage} previousDailyAvgUsage={previousDailyAvgUsage} />
                <DashboardAppUsageStats highlight={highlight} />
            </div>
        </div>
    )
}

export default DashboardUsageContainer
