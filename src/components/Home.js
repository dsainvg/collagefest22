import './Home.css';

function Home() {
return (
    <div className="HomeContent">
        <h1>Welcome to Our Website!</h1>
        <p>
            Join us for the annual Collage Fest! Experience a day filled with creativity, fun, and excitement. Participate in workshops, enjoy live performances, and explore amazing art exhibits. Don't miss out on this unforgettable event!
        </p>
        <div className="details">
            <h2>Event Highlights:</h2>
            <ul>
                <li>Interactive Art Workshops</li>
                <li>Live Music and Dance Performances</li>
                <li>Exhibition of Stunning Collages</li>
                <li>Food Stalls and Refreshments</li>
                <li>Competitions with Exciting Prizes</li>
            </ul>
            <h2>Event Details:</h2>
            <p>
                <strong>Date:</strong> 25th March 2023<br />
                <strong>Time:</strong> 10:00 AM to 8:00 PM<br />
                <strong>Venue:</strong> City Art Center, Downtown
            </p>
        </div>
    </div>
);
}   
export default Home;