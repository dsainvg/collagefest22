import './schedulefiles.css';
import { useState} from 'react';
import { useParams } from 'react-router-dom';

function Schedulefiles() {
    let { id } = useParams();
    const [scheduleData, setScheduleData] = useState([]);
    id = parseInt(id, 10); 
    fetch('/schedule.json') // Ensure the path starts with '/' to correctly reference the public folder
    .then((response) => response.json())
    .then((data) => {
        const filteredData = data.filter(item => item.id === id);
        setScheduleData(filteredData);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });    

    

    return (
        <div>
            {scheduleData.map((daySchedule, index) => (
                <div key={index} className="schedule-day">
                    <div className="schedule-header">
                        <h3 className="schedule-header-main">{daySchedule.day}</h3>
                        <span>{daySchedule.date}</span>
                        <span>{daySchedule.time}</span>
                    </div>
                    <h3>Events:</h3>
                    <ul className="schedule-events">
                        {daySchedule.events.map((event, eventIndex) => (
                            <li key={eventIndex}>
                                <strong>{event.time}</strong>: {event.title} {event.speaker && `by ${event.speaker}`} {event.location && `at ${event.location}`}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Schedulefiles;