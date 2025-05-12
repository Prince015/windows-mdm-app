import React, { useEffect, useRef, useState } from 'react';
import { DashboardAppUsageInterface } from '../../interfaces/dashboard.interface';
import recycleIcon from '../../../../assets/icons/recycle.svg';
import durationIcon from '../../../../assets/icons/duration.svg';
import DashboardStatBox from './DashboardStatBox';
import { formatDurationSmart, formatTime } from '../../utils/date-fromats';

interface DashboardAppUsageStatsProps {
    highlight: {
        app: string;
        duration: number;
    }[];
}

function DashboardAppUsageStats ({ highlight }: DashboardAppUsageStatsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemWidth = 87;
    const [visibleCount, setVisibleCount] = useState(highlight.length);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const maxVisible = Math.floor(containerWidth / itemWidth);
                const needsPlusBadge = maxVisible < highlight.length;
                const adjustedCount = needsPlusBadge ? maxVisible - 1 : highlight.length;
                setVisibleCount(Math.max(0, adjustedCount));
            }
        };

        updateVisibleCount();
        const observer = new ResizeObserver(updateVisibleCount);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    const visibleApps = highlight.slice(0, visibleCount);
    const hiddenCount = highlight.length - visibleCount;

    return (
        <div className="rounded-2xl mt-4 p-4 border border-stroke-light">
            <p className='font-bold text-text'>Today’s Highlight</p>
            <div ref={containerRef} className="flex items-center gap-6 mt-6 overflow-hidden ">
                {visibleApps.map((item, index) => (
                    <div key={index} className="flex flex-col items-center bg-dashboard-background p-4 rounded-lg w-[64px]">
                        <img src={item.app} alt={item.app} className="w-8 h-8" />
                        <p className="text-xs font-semibold text-text mt-4">{(item.duration / 60).toFixed(1)}m</p>
                    </div>
                ))}
                {hiddenCount > 0 && (
                    <div className="flex flex-col justify-center items-center bg-dashboard-background p-2 rounded-lg w-[64px] h-[64px]">
                        <span className="text-lg font-semibold text-text">+{hiddenCount}</span>
                    </div>
                )}
            </div>
            {/* <div className='flex flex-wrap gap-y-3 gap-x-5 mt-6'>
                <DashboardStatBox icon={recycleIcon} label="Most Used App" value={mostUsedApp} />
                <DashboardStatBox icon={durationIcon} label="Longest Session" value={longestSession} />
                <DashboardStatBox icon={durationIcon} label="Active Hours" value={activeHours} />
            </div> */}

        </div>
    );
}

export default DashboardAppUsageStats;


const appUsageData: DashboardAppUsageInterface[] = [
    {
        appName: "Google Chrome",
        appIcon: "https://www.google.com/chrome/static/images/chrome-logo.svg",
        usageDuration: 9000000,
        longestSessionDuration: 4500000,
        sessionCount: 5,
        startTime: "2023-10-01T08:00:00Z",
        endTime: "2023-10-01T10:30:00Z"
    },
    {
        appName: "Visual Studio Code",
        appIcon: "https://code.visualstudio.com/favicon.ico",
        usageDuration: 6300000,
        longestSessionDuration: 2700000,
        sessionCount: 3,
        startTime: "2023-10-01T11:00:00Z",
        endTime: "2023-10-01T12:45:00Z"
    },
    {
        appName: "Slack",
        appIcon: "https://slack.com/favicon.ico",
        usageDuration: 4500000,
        longestSessionDuration: 1800000,
        sessionCount: 4,
        startTime: "2023-10-01T13:00:00Z",
        endTime: "2023-10-01T14:15:00Z"
    },
    {
        appName: "Spotify",
        appIcon: "https://www.spotify.com/favicon.ico",
        usageDuration: 2700000,
        longestSessionDuration: 1200000,
        sessionCount: 2,
        startTime: "2023-10-01T15:00:00Z",
        endTime: "2023-10-01T15:45:00Z"
    },
    {
        appName: "Zoom",
        appIcon: "https://zoom.us/favicon.ico",
        usageDuration: 1800000,
        longestSessionDuration: 1800000,
        sessionCount: 1,
        startTime: "2023-10-01T16:00:00Z",
        endTime: "2023-10-01T16:30:00Z"
    },
    {
        appName: "Trello",
        appIcon: "https://trello.com/favicon.ico",
        usageDuration: 4200000,
        longestSessionDuration: 1800000,
        sessionCount: 4,
        startTime: "2023-10-01T22:00:00Z",
        endTime: "2023-10-01T23:10:00Z"
    },
    {
        appName: "GitHub",
        appIcon: "https://github.githubassets.com/favicons/favicon.svg",
        usageDuration: 8100000,
        longestSessionDuration: 3900000,
        sessionCount: 6,
        startTime: "2023-10-01T23:30:00Z",
        endTime: "2023-10-02T01:45:00Z"
    },
    {
        appName: "Notion",
        appIcon: "https://www.notion.so/favicon.ico",
        usageDuration: 3900000,
        longestSessionDuration: 1500000,
        sessionCount: 3,
        startTime: "2023-10-01T17:00:00Z",
        endTime: "2023-10-01T18:05:00Z"
    },
    {
        appName: "Figma",
        appIcon: "https://www.figma.com/favicon.ico",
        usageDuration: 3000000,
        longestSessionDuration: 1200000,
        sessionCount: 2,
        startTime: "2023-10-01T19:00:00Z",
        endTime: "2023-10-01T19:50:00Z"
    },
    {
        appName: "Discord",
        appIcon: "https://discord.com/favicon.ico",
        usageDuration: 4800000,
        longestSessionDuration: 2400000,
        sessionCount: 3,
        startTime: "2023-10-01T20:00:00Z",
        endTime: "2023-10-01T21:20:00Z"
    },
]
