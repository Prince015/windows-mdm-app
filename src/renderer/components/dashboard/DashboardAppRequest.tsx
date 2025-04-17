import React from 'react'
import { DashboardAppRequestInterface } from '../../interfaces/dashboard.interface';
import instagramIcon from "../../../../assets/icons/instagram.svg"
import telegramIcon from "../../../../assets/icons/telegram.svg"
import bgmiIcon from "../../../../assets/icons/bgmi.svg"
import appRequestEmptyIcon from "../../../../assets/icons/app_request_empty.svg"
import DashboardAppRequestBox from './DashboardAppRequestBox';

function DashboardAppRequest() {
  return (
    <div className="rounded-2xl mt-4 flex-1 py-4 bg-dashboard-background border border-stroke-light h-full overflow-hidden flex flex-col">
      <p className="font-bold text-text mb-3 px-4">App Requests</p>
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 px-4">
        {appRequestData.length ? appRequestData.map((item, index) => (
          <DashboardAppRequestBox
            key={index}
            title={item.title}
            status={item.status}
            date={item.date}
            icon={item.icon}
          />
        ))
          :
          <div className='max-w-72 mx-auto'>
            <img className='max-h-60' src={appRequestEmptyIcon} alt="" />
            <p className='text-center text-sm mt-5'>There are currently no app requests. Your app requests will appear here</p>
          </div>
        }
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