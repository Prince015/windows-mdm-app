import React, { useEffect } from 'react';


type PropTypes = {
    openPopup: boolean,
    setOpenPopup: (value: boolean) => void
    className?: string
    children: React.ReactNode
    closeWhenClickOutside?: boolean
    bg?: string
    
}

const Popup = ({ openPopup, setOpenPopup, children, className, closeWhenClickOutside, bg }: PropTypes) => {
    if (!openPopup) return null;

    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenPopup(false);
            }
        }
        if (closeWhenClickOutside) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, setOpenPopup, closeWhenClickOutside])

    return (
        <div className="fixed top-0 left-0 z-50 w-screen backdrop-blur-sm h-screen bg-black/20 flex items-center justify-center">
            <div ref={ref} className={`relative overflow-hidden rounded-xl ${className} ${bg ? bg : 'bg-white'}`}>
                {/* <button onClick={() => { setOpenPopup(false) }} className="text-lg text-text hover:text-failure cursor-pointer font-bold absolute top-3 right-5">x</button> */}
                {children}
            </div>
        </div>
    )
}

export default Popup