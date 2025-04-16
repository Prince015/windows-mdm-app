import React from 'react'
import videoCallIcon from "../../../../assets/icons/video-call.svg"
import Button from '../Button'
import { RightArrowIcon } from '../SvgIcons'

function DashboardVideoCallRequest() {
    return (
        <div className='cursor-pointer flex justify-between items-center group bg-video-call-card rounded-2xl p-4 hover:bg-video-call-card-hover transition-all duration-300 mt-3'>
            <div className='flex items-center gap-4'>
                <div className='bg-background p-2 aspect-square min-w-12 rounded-md'>
                    <img className='h-full w-full' src={videoCallIcon} alt="video-call" />
                </div>
                <div>
                    <p className='font-bold text-text group-hover:text-background transition-all duration-300'>Video Call to Parent</p>
                    <p className='mt-2 text-sm text-text font-light group-hover:text-background transition-all duration-300'>Call directly to your parent's device, no intermediaries.</p>
                </div>
            </div>
            <div>
                <RightArrowIcon />
            </div>
        </div>
    )
}

export default DashboardVideoCallRequest