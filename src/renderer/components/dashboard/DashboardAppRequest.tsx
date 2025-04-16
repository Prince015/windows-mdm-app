import React from 'react'
import { DashboardAppRequestInterface } from '../../interfaces/dashboard.interface';
import instagramIcon from "../../../../assets/icons/instagram.svg"
import telegramIcon from "../../../../assets/icons/telegram.svg"
import bgmiIcon from "../../../../assets/icons/bgmi.svg"
import DashboardAppRequestBox from './DashboardAppRequestBox';

function DashboardAppRequest() {
  return (
    <div className="rounded-2xl mt-4 flex-1 py-4 bg-dashboard-background border border-stroke-light h-full overflow-hidden flex flex-col">
      <p className="font-bold text-text mb-3 px-4">App Requests</p>
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 px-4">
        {appRequestData.map((item, index) => (
          <DashboardAppRequestBox
            key={index}
            title={item.title}
            status={item.status}
            date={item.date}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default DashboardAppRequest;

const appRequestData: DashboardAppRequestInterface[] = [
  {
    title: 'Instagram',
    status: 'pending',
    date: '2023-10-01',
    icon: instagramIcon
  },
  {
    title: 'Telegram',
    status: 'approved',
    date: '2023-10-02',
    icon: telegramIcon
  },
  {
    title: 'Pubg Mobile BGMI',
    status: 'rejected',
    date: '2023-10-03',
    icon: bgmiIcon
  },
  {
    title: 'Instagram',
    status: 'pending',
    date: '2023-10-01',
    icon: instagramIcon
  },
  {
    title: 'Telegram',
    status: 'approved',
    date: '2023-10-02',
    icon: telegramIcon
  },
  {
    title: 'Pubg Mobile BGMI',
    status: 'rejected',
    date: '2023-10-03',
    icon: bgmiIcon
  },
  {
    title: 'Instagram',
    status: 'pending',
    date: '2023-10-01',
    icon: instagramIcon
  },
  {
    title: 'Telegram',
    status: 'approved',
    date: '2023-10-02',
    icon: telegramIcon
  },
  {
    title: 'Pubg Mobile BGMI',
    status: 'rejected',
    date: '2023-10-03',
    icon: bgmiIcon
  },
  {
    title: 'Instagram',
    status: 'pending',
    date: '2023-10-01',
    icon: instagramIcon
  },
  {
    title: 'Telegram',
    status: 'approved',
    date: '2023-10-02',
    icon: telegramIcon
  },
  {
    title: 'Pubg Mobile BGMI',
    status: 'rejected',
    date: '2023-10-03',
    icon: bgmiIcon
  },
  {
    title: 'Instagram',
    status: 'pending',
    date: '2023-10-01',
    icon: instagramIcon
  },
  {
    title: 'Telegram',
    status: 'approved',
    date: '2023-10-02',
    icon: telegramIcon
  },
  {
    title: 'Pubg Mobile BGMI',
    status: 'rejected',
    date: '2023-10-03',
    icon: bgmiIcon
  },
]