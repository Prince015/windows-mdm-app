import React from 'react'
import usbIcon from "../../../../assets/icons/usb.svg"
import Button from '../Button'

function DashboardUsbRequestBox() {
    return (
        <div className='cursor-pointer group bg-usb-card rounded-2xl p-4 hover:bg-usb-card-hover transition-all duration-300'>
            <div className='flex items-center gap-4'>
                <div className='bg-background p-2 aspect-square min-w-12 rounded-md'>
                    <img className='h-full w-full' src={usbIcon} alt="usb" />
                </div>
                <div>
                    <p className='font-bold text-text group-hover:text-background transition-all duration-300'>USB Request</p>
                    <p className='mt-2 text-sm text-text font-light group-hover:text-background transition-all duration-300'>If your USB is not working, please raise a request to unlock USB usage on your system</p>
                </div>
            </div>
            <Button type='ghost' className='mt-6 bg-usb-card border-stroke-dark border w-fit text-body-text text-sm py-2'>
                RAISE REQUEST
            </Button>
        </div>
    )
}

export default DashboardUsbRequestBox