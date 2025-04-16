import { useState } from "react";
import timerImage from "../../../../assets/icons/time-management.svg"
import qrCodeSvg from "../../../../assets/icons/qr-code.svg"
import PhoneInput from "./PhoneInput"
import StudentNameInput from "./StudentNameInput";
import ScanQrToConnect from "./ScanQrToConnect";

function LoginBox() {
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [qrStep, setQrStep] = useState(false)

    const handleSaveStudentName = (sName: string) => {
        setStudentName(sName)
        setQrStep(true)
    }

    return (
        <div className='bg-background max-w-[500px] w-full place-self-center rounded-lg px-8 pb-16'>
            <img
                src={!qrStep ? timerImage : qrCodeSvg}
                className="mx-auto h-52 my-12 mt-3"
                alt="timer"
            />
            {!verificationSuccess ?
                <div className="">
                    <p className="text-text text-xl font-semibold">Login to Continue</p>
                    <PhoneInput verificationSuccess={verificationSuccess} setVerificationSuccess={setVerificationSuccess} />
                </div>
                : !qrStep ?
                    <div className="">
                        <p className="text-text text-xl font-semibold">Enter Student Name to Continue</p>
                        <StudentNameInput handleSaveStudentName={handleSaveStudentName} />
                    </div>
                    : <div className="">
                        <p className="text-text text-xl font-semibold">Now Scan QR in your Mobile app</p>
                        <ScanQrToConnect/>
                    </div>
            }
        </div>
    )
}

export default LoginBox