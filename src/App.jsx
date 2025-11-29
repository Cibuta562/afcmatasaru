import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Matches from './pages/Matches';
import Standings from './pages/Standings';
import ComingSoon from "./pages/ComingSoon.jsx";
import Cartonase from "./pages/Cartonase.jsx";
import Contact from "./pages/Contact.jsx";

// O componentă simplă pentru meciuri (placeholder)


function App() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/echipa" element={<Team />} />
                    <Route path="/clasament" element={<Standings />} />
                    <Route path="/meciuri" element={<Matches />} />
                    <Route path="/cartonase" element={<Cartonase />} />
                    <Route path="/contact" element={<Contact/>} />
                </Routes>
            </div>
            {/*<ComingSoon/>*/}

            <footer className="bg-clubSecondary text-white py-6 text-center mt-auto">
                <p>&copy; {new Date().getFullYear()} AFC Mătăsaru. Hai echipa!</p>
            </footer>
        </div>
    );
}

export default App;