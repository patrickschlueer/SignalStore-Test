export function getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}


export function formatDateRange(startDate: Date, endDate: Date): string {
    const start = startDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' });
    const end = endDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' });

    if (start === end) {
    return start;
    }

    return `${start} - ${end}`;
}
    