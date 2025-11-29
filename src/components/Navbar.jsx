import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-clubSecondary text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/logo.png" className="h-8 w-8 text-clubPrimary"  alt="logo"/>
                        <span className="font-bold text-xl tracking-wider">AFC MĂTĂSARU</span>
                    </Link>

                    {/* Meniu Desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Acasă</Link>
                            <Link to="/echipa" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Echipa</Link>
                            <Link to="/clasament" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Clasament</Link>
                            <Link to="/meciuri" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Meciuri</Link>
                            <Link to="/cartonase" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Cartonașe</Link>
                            <Link to="/contact" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Contact</Link>
                        </div>
                    </div>

                    {/* Buton Meniu Mobil */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-clubPrimary">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Meniu Mobil Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-clubSecondary pb-4 px-4">
                    <Link to="/" className="block px-3 py-2 rounded-md hover:bg-clubPrimary">Acasă</Link>
                    <Link to="/echipa" className="block px-3 py-2 rounded-md hover:bg-clubPrimary">Echipa</Link>
                    <Link to="/clasament" className="block px-3 py-2 rounded-md hover:bg-clubPrimary">Clasament</Link>
                    <Link to="/meciuri" className="block px-3 py-2 rounded-md hover:bg-clubPrimary">Meciuri</Link>
                    <Link to="/cartonase" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Cartonașe</Link>
                    <Link to="/contact" className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium">Contact</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;