import QrIcon from '../../../../assets/icons/qr-code.svg';
import Button from '../Button';

export default function QRScanner() {
    return (
        <div className="bg-background">
            <div className="px-6 pb-6 mt-2">
                <h2 className="text-lg font-semibold text-text">Scan the QR to Connect</h2>
                <p className="font-light text-text">Scan QR code in-app to sync device.</p>
                <div className="flex bg-white p-2 items-center justify-center">
                    <img
                        src={QrIcon}
                        alt="QR Code"
                        className="w-40 h-40 object-contain"
                    />
                </div>
                <Button
                    className='font-light w-72 mx-auto block tracking-wider bg-accent mt-2'
                >
                    Alright
                </Button>
            </div>
        </div>
    );
}