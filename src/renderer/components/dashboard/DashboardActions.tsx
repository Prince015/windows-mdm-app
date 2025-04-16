import React from 'react'
import DashboardUsbRequestBox from './DashboardUsbRequestBox'
import DashboardVideoCallRequest from './DashboardVideoCallRequest'
import DashboardAppRequest from './DashboardAppRequest'

function DashboardActions() {
    return (
        <div className='p-4 bg-background rounded-2xl drop-shadow-md flex-[0.4] flex flex-col'>
            <DashboardUsbRequestBox />
            <DashboardVideoCallRequest />
            <DashboardAppRequest />
        </div>
    )
}

export default DashboardActions