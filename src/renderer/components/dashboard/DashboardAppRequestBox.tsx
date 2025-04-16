import { DashboardAppRequestInterface } from '../../interfaces/dashboard.interface';
import { VerifiedIcon } from '../SvgIcons';


function DashboardAppRequestBox(props: DashboardAppRequestInterface) {
    const { title, status, date, icon } = props;

    return (
        <div className='bg-background border-stroke-light border rounded-2xl p-3.5 px-5 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <div className='min-h-12 min-w-12 w-12 aspect-square bg-dashboard-background p-2 rounded-md'>
                    <img className='h-full w-full' src={icon} alt={title} />
                </div>
                <h3 className='text-text font-medium text-sm'>{title}</h3>
            </div>
            <div className={`flex items-center py-1.5 px-2.5 rounded-md w-24 justify-center ${status === 'approved' ? 'bg-success-light text-success' : status === 'pending' ? 'bg-pending-light text-pending' : 'bg-failure-light text-failure'}`}>
                <VerifiedIcon className='h-3 w-3 mr-1' fill={status === 'approved' ? 'var(--color-success)' : status === 'pending' ? 'var(--color-pending)' : 'var(--color-failure)'} />
                <span className='text-xs font-light capitalize'>{status}</span>
            </div>
        </div>
    )
}

export default DashboardAppRequestBox;