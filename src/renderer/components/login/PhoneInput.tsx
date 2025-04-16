import React, { useState, useRef, useEffect } from 'react';
import { PhoneCountryInterface } from '../../interfaces/login.interface';
import { countryCodes } from '../../utils/country-codes-data';
import Button from '../Button';
import OTPInput from 'react-otp-input';

interface PhoneInputProps {
    setVerificationSuccess: React.Dispatch<React.SetStateAction<boolean>>
    verificationSuccess: boolean
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    setVerificationSuccess,
    verificationSuccess
}) => {

    const [selectedCountry, setSelectedCountry] = useState<PhoneCountryInterface>({
        code: 'IN',
        dialCode: '+91',
        name: 'India'
    });

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(30);
    const [isVerifying, setIsVerifying] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCountrySelect = (country: PhoneCountryInterface) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        setSearchQuery('');
    };

    const filteredCountries = countryCodes.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (otpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [otpSent, timer]);

    const handleSendOtp = () => {
        if (!phoneNumber) return;

        // Trigger your send OTP logic here (e.g., API call)
        setOtpSent(true);
        setTimer(30); // reset timer
        setVerificationSuccess(false);
    };

    const handleVerifyOtp = () => {
        if (!otp) return;

        setIsVerifying(true);

        // Simulate API call
        setTimeout(() => {
            setIsVerifying(false);
            setVerificationSuccess(true);
        }, 1500);
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            handleSendOtp();
        }
    };


    return (
        <section className="flex flex-col w-full mt-4 text-text">
            <label htmlFor="mobileNumber" className="text-base text-text mb-2">
                Mobile No.
            </label>

            <section className="flex items-center border border-border rounded-md px-2.5 py-3 relative">
                <div className="flex items-center mr-2">
                    <span className="text-sm text-disabled mr-2">{selectedCountry.code}</span>
                    <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <span className="text-sm text-disabled">{selectedCountry.dialCode}</span>
                        <img
                            src="https://static.pw.live/files/dropdown_icon_20240808054636.svg"
                            alt="dropdown"
                            className="w-3 h-3"
                        />
                    </div>
                </div>

                {showDropdown && (
                    <section
                        ref={dropdownRef}
                        className="absolute top-full -mt-32 left-0 w-full bg-white border border-border rounded-lg shadow-md z-50"
                    >
                        <div className="mx-3 py-5 border-b border-gray-200 flex items-center gap-4">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C8.51899 12.5 9.89296 11.8852 10.8891 10.8891C11.8852 9.89296 12.5 8.51899 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 8.66252 13.4197 10.1906 12.4517 11.3911L15.7803 14.7197C16.0732 15.0126 16.0732 15.4874 15.7803 15.7803C15.4874 16.0732 15.0126 16.0732 14.7197 15.7803L11.3911 12.4517C10.1906 13.4197 8.66252 14 7 14C3.13401 14 0 10.866 0 7Z"
                                    fill="#7B7F86"
                                />
                            </svg>
                            <input
                                autoComplete="off"
                                type="text"
                                placeholder="Search for country"
                                className="flex-1 outline-none border-none text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <span
                                    onClick={() => setSearchQuery('')}
                                    className="cursor-pointer text-disabled"
                                >
                                    ×
                                </span>
                            )}
                        </div>

                        <section className='max-h-72 overflow-y-auto my-2'>
                            {filteredCountries.map((country) => (
                                <div
                                    key={country.code}
                                    onClick={() => handleCountrySelect(country)}
                                    className="py-2 px-3 cursor-pointer flex justify-between text-sm hover:bg-gray-100"
                                >
                                    <span className="font-semibold">{country.code} {country.dialCode}</span>
                                    <span className="text-disabled">({country.name})</span>
                                </div>
                            ))}
                        </section>
                    </section>
                )}

                <input
                    type="text"
                    placeholder="E.g 9877654335"
                    autoComplete="off"
                    id="mobileNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 outline-none text-sm ml-2"
                />
            </section>

            <div className="text-sm mt-2">
                {!otpSent ? (
                    <Button className='w-full' onClick={handleSendOtp} type="primary">
                        Continue
                    </Button>
                ) : verificationSuccess ? (
                    <div className="text-green-600 font-medium mt-2">✅ Number verified successfully!</div>
                ) : (
                    <div>
                        <div className='flex justify-between gap-2'>
                            {otpSent ? <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<> </>}
                                renderInput={(props) => <input {...props} />}
                                inputType="text"
                                shouldAutoFocus={true}
                                inputStyle={{
                                    border: "1px solid #484848",
                                    borderRadius: "8px",
                                    width: "44px",
                                    height: "44px",
                                    aspectRatio: 1,
                                    fontSize: "13px",
                                    color: "black",
                                    fontWeight: "400",
                                    caretColor: "blue",
                                    outline: "none",
                                    backgroundColor: "transparent",
                                }}
                                containerStyle={{
                                    display: "flex",
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gap: "10px",
                                    margin: "8px 0px",
                                }}
                            /> : null}

                        </div>
                        <div className='flex justify-between gap-2'>
                            <Button
                                className='w-full'
                                onClick={handleVerifyOtp}
                                type="primary"
                                disabled={isVerifying || otp.length != 6}
                            >
                                {isVerifying ? 'Verifying...' : 'Verify'}
                            </Button>
                            <Button
                                className='w-full'
                                onClick={handleResendOtp}
                                type="secondary"
                            // disabled={timer > 0}
                            >
                                {timer > 0
                                    ? <>Resend OTP in <span className="text-primary">{timer}s</span></>
                                    : 'Resend OTP'}
                            </Button>
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
};

export default PhoneInput;
