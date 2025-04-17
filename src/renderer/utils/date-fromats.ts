export const formatTime = (isoTime: string) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

export function formatDurationSmart(ms: number): string {
    const second = 1000;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day; // approx
    const year = 365 * day; // approx

    const years = Math.floor(ms / year);
    ms %= year;

    const months = Math.floor(ms / month);
    ms %= month;

    const weeks = Math.floor(ms / week);
    ms %= week;

    const days = Math.floor(ms / day);
    ms %= day;

    const hours = Math.floor(ms / hour);
    ms %= hour;

    const minutes = Math.floor(ms / minute);
    ms %= minute;

    const seconds = Math.floor(ms / second);

    const parts = [];
    if (years) parts.push(`${years}y`);
    if (months) parts.push(`${months}mo`);
    if (weeks && parts.length < 2) parts.push(`${weeks}w`);
    if (days && parts.length < 2) parts.push(`${days}d`);
    if (hours && parts.length < 2) parts.push(`${hours}h`);
    if (minutes && parts.length < 2) parts.push(`${minutes}m`);
    if (seconds && parts.length < 2) parts.push(`${seconds}s`);

    return parts.slice(0, 2).join(' ') || '0s';
}

export const formatTimeDisplay = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    if (h === 0) {
        return `${m}m`;
    } else if (m === 0) {
        return `${h}h`;
    } else {
        return `${h}h ${m}m`;
    }
};

