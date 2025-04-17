export const generateRandomColor = (): string => {
    // Generate vibrant colors that work well for charts
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 60%)`;
};