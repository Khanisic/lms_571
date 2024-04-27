import CalendarIcon from "./CalendarIcon";
import CoursesIcon from "./Courses";
import HistoryIcon from "./HistoryIcon";
import InboxIcon from "./InboxIcon";
import ProfileIcon from "./ProfileIcon";
import SearchIcon from "./Search";

const LeftBar = () => {
    return (
        <div className="flex justify-center h-full w-full items-center">
            <div className="bg-dark rounded-full flex flex-col gap-8 items-center justify-center px-4 py-8">
                <CoursesIcon />
                <SearchIcon />
                <InboxIcon />
                <HistoryIcon />
                <CalendarIcon />
                <ProfileIcon />
            </div>
        </div>
    );
}

export default LeftBar;