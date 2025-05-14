import './Teams.css';
import { useState } from 'react';
function Teams() {
    const [team, setTeam] = useState([]);
    fetch('teams.json')
    .then((response) => response.json())
    .then((data) => {
        setTeam(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return (
    <div className="teams">
      <h1>Our Team</h1>
      {team.map((member) => (
        <div className="team-member" key={member.Id}>
            <img src={member.Image} alt={member.Name} />
            <h2>{member.Name}</h2>
        </div>
      ))}
    </div>
  );
}
export default Teams;