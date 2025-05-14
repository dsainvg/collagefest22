import { Link, Outlet } from 'react-router-dom';
import './Schedule.css';

function Schedule() {
    return (
        <div className='schedule'>
            <div className='schedule-title'>
                <h1>Schedule</h1>
                <p>Explore the schedule for our upcoming event, featuring a variety of sessions, workshops, and networking opportunities.</p>
                <div className="schedbtns">
                    <Link to="/Schedule/id/0" className="btn btn-primary">Day 0</Link>
                    <Link to="/Schedule/id/1" className="btn btn-secondary">Day 1</Link>
                    <Link to="/Schedule/id/2" className="btn btn-tertiary">Day 2</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default Schedule;