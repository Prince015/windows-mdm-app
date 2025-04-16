import React from 'react'
import DashboardHeader from '../../components/dashboard/DashboardHeader'
import DashboardUsageStats from '../../components/dashboard/DashboardUsageContainer'
import DashboardActions from '../../components/dashboard/DashboardActions'

function Dashboard() {
  return (
    <div className='bg-dashboard-background h-screen w-screen flex flex-col gap-4'>
      <DashboardHeader />
      <div className='w-full h-full overflow-hidden pb-8 px-16 flex-1 flex gap-8'>
        <DashboardUsageStats />
        <DashboardActions />
      </div>
    </div>
  )
}

export default Dashboard