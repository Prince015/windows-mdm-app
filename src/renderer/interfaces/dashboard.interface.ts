export interface DashboardAppRequestInterface {
    title: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    icon: string;
}

export interface DashboardAppUsageInterface {
    appName: string;
    appIcon: string;
    usageDuration: number;
    longestSessionDuration: number;
    sessionCount: number;
    startTime: string;
    endTime: string;
}

export interface UsageData {
    category: string;
    color?: string; // Optional now as we'll generate randomly
    data: number[]; // Hours spent (0-24)
    displayTime: string;
}

export interface DashboardData {
    days: string[];
    categories: UsageData[];
    dailyAverage: string;
    weeklyChange: {
        percent: number;
        direction: 'up' | 'down';
    };
}