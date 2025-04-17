import React from 'react';

interface DashboardStatBoxProps {
    icon: string;
    label: string;
    value: string;
}

const DashboardStatBox: React.FC<DashboardStatBoxProps> = ({ icon, label, value }) => (
    <div className="rounded-lg min-w-fit w-[calc(50%-10px)] bg-dashboard-background flex items-center py-2 px-4 border border-stroke-light">
        <img src={icon} alt="" />
        <span className='ml-2 text-text text-sm font-medium'>{label}: </span>
        <span className='ml-2 text-sm font-light'>{value}</span>
    </div>
);

export default DashboardStatBox;
