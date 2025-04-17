import React, { useState } from 'react'
import TabSwitcher from '../TabSwitcher'
import DashboardUsageGraph from './DashboardUsageGraph';
import DashboardAppUsageStats from './DashboardAppUsageStats';

const tabNames = ['Week', 'Day'];

function DashboardUsageContainer() {
    const [selectedTab, setSelectedTab] = useState(0);

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
                <DashboardUsageGraph />
                <DashboardAppUsageStats />
            </div>
        </div>
    )
}

export default DashboardUsageContainer