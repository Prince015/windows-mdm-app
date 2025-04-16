import React, { useState } from 'react'
import TabSwitcher from '../TabSwitcher'
import ScreenTimeChart from './DashboardUsageGraph';

const tabNames = ['Week', 'Day'];

function DashboardUsageContainer() {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div className='py-4 px-4 bg-background w4 rounded-2xl drop-shadow-md flex-[0.6]'>
            <TabSwitcher
                tabs={tabNames}
                onTabChange={(index) => {
                    setSelectedTab(index);
                }}
                initialIndex={selectedTab}
                containerClassName='w-96 mx-auto'
            />
            <ScreenTimeChart />
        </div>
    )
}

export default DashboardUsageContainer