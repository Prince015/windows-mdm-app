import React, { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

function ScanQrToConnect() {
    const [code, setCode] = useState("")
    const navigate = useNavigate()

    const handleSkip = () => {
        console.log("Skipped");
        navigate({ pathname: "/dashboard" })
    }

    const handleContinue = () => {
        console.log("Continue");
        navigate({ pathname: "/dashboard" })
    }

    return (
        <section className="flex flex-col w-full mt-5 text-text">
            <label htmlFor="code" className="text-base text-text mb-1">
                or enter the code manually <span className='block text-disabled text-xs mt-2'>code</span>
            </label>
            <input
                type="text"
                placeholder="Enter Your Name"
                autoComplete="off"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 outline-none text-sm border border-border rounded-md px-2.5 py-3"
            />
            <div className='flex justify-between gap-2 text-sm mt-6'>
                <Button
                    className='w-full'
                    onClick={handleSkip}
                    type="secondary"
                >
                    Skip
                </Button>
                <Button
                    className='w-full'
                    onClick={handleContinue}
                    type="primary"
                >
                    Continue
                </Button>
            </div>
        </section>
    )
}

export default ScanQrToConnect