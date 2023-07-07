import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import GetStarted from './views/GetStarted';
import UserPortal from './views/UserPortal';
import KnowlegeBase from './views/KnowlegeBase';
import NewTicketUser from './views/NewTicketUser'; // Import the NewTicketUser component
import './index.css'
import UserType from './types/auth';

const App: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <div id='app'>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/get-started" element={<GetStarted setUser={setUser} />} />
        <Route path="/portal" element={<UserPortal user={user} />} />
        <Route path="/new-ticket" element={<NewTicketUser currentUser={user} />} /> {/* Add the route for NewTicketUser */}
        <Route path="/knowlege-base" element={<KnowlegeBase user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
