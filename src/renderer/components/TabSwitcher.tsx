import React, { HTMLAttributes, useState } from 'react';

interface TabSwitcherProps {
    tabs: string[]
    onTabChange: (index: number) => void
    initialIndex: number
    containerClassName?: string
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({
    initialIndex,
    onTabChange,
    tabs,
    containerClassName
}) => {
    const [activeTab, setActiveTab] = useState(initialIndex);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        onTabChange?.(index);
    };

    return (
        <div className={`min-w-fit flex rounded-lg items-center p-1.5 bg-dashboard-background ${containerClassName}`}>
            <ul className="flex w-full items-center relative ">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`flex-1 text-center text-sm cursor-pointer z-10 transition-colors duration-500 ${activeTab === index ? 'text-text' : 'text-disabled'}`}
                        onClick={() => handleTabClick(index)}
                    >
                        <span className="tracking-wider block py-2">{tab}</span>
                    </li>
                ))}
                <span
                    className="absolute top-0 left-0 h-full bg-background rounded-lg transition-transform duration-500"
                    style={{
                        width: `calc(100% / ${tabs.length})`,
                        transform: `translateX(${activeTab * 100}%)`,
                    }}
                />
            </ul>
        </div>
    );
}

export default TabSwitcher;
