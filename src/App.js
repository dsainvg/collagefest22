import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Schedule from './components/Schedule';
import Profile from './components/Profile/Profile';
import Login from './components/Login__Signup/Login';
import Signup from './components/Login__Signup/Signup';
import Teams from './components/Teams/Teams';
import Schedulefiles from './components/Sched/Schedulefiles';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className='placer'></div>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Schedule" element={<Schedule />}>
            <Route path="id/:id" element={<Schedulefiles />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/team" element={<Teams />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
