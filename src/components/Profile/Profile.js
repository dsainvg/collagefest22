import './profile.css';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/Login');
        
    };

    if (!userData) {
        return (
            <div className="userdata-notfound">
                <p className="notfound">No user data found</p>
                <Link to="/Login" className="profile-button">Login</Link>
                <p className="signup-info">Don't have an account?</p>
                <Link to="/Signup" className="profile-button">Sign up here</Link>
            </div>
        );
    } else {
        return (
            <div className="profile-container">
                <h1 className="profile-header">Profile</h1>
                <div className="profile-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>User Id:</strong> {userData.userid}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>College:</strong> {userData.college}</p>
                </div>
                <div className="profile-actions">
                    <Link to="/Schedule" className="profile-button">Go to Schedule</Link>
                    <Link to="/Login" className="profile-button" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        );
    }
}

export default Profile;