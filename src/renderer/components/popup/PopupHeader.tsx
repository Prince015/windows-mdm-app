import { CloseIcon, MinimizeIcon, PeopleIcon, SquareIcon } from "../SvgIcons";

interface PopupHeaderProps {
    title?: string;
    onClose: () => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = ({ title = 'Usage App', onClose }) => (
    <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
            <PeopleIcon className="h-4 w-4" fill="var(--color-text)" />
            <h1 className="font-light text-text">{title}</h1>
        </div>
        <div className="flex items-center space-x-8">
            <MinimizeIcon className="h-3 w-3" />
            <SquareIcon className="h-3 w-3" />
            <div className="cursor-pointer" onClick={onClose} >
                <CloseIcon className="h-3 w-3" />
            </div>
        </div>
    </div>
);