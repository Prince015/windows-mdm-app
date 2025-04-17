import { useState } from "react"
import profileIcon from "../../../../assets/icons/profile.svg"
import qrScannerIcon from "../../../../assets/icons/qr-scanner.svg"
import Popup from "../popup/Popup"
import QRScanner from "./QRScanner"
import { PopupHeader } from "../popup/PopupHeader"

function DashboardHeader() {
    const [showScanner, setShowScanner] = useState(false)

    return (
        <div className="flex justify-between pt-8 px-16">
            <div className="flex justify-between items-center gap-3">
                <div className="p-2 bg-background rounded-full shadow-md">
                    <img src={profileIcon} alt="profile" />
                </div>
                <p className="text-text text-lg font-semibold">Hello Amit!</p>
            </div>
            <div
                className="flex justify-between cursor-pointer items-center gap-3 py-2 px-4 bg-background rounded-2xl shadow-md"
                onClick={() => setShowScanner(true)}
            >
                <p className="text-sm">Scan to Connect</p>
                <div>
                    <img className="h-8 w-8" src={qrScannerIcon} alt="" />
                </div>
            </div>
            <Popup
                openPopup={showScanner}
                setOpenPopup={setShowScanner}
                closeWhenClickOutside={true}
                className="shadow-md w-96 h-96"
            >
                <PopupHeader title="Usage App" onClose={() => setShowScanner(false)} />
                <QRScanner />
            </Popup>
        </div>
    )
}

export default DashboardHeader