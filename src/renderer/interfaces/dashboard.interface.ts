export interface DashboardAppRequestInterface {
    title: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    icon: string;
}