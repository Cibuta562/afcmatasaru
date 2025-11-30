import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Users, Trophy, CalendarCheck, MapPin, Camera } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { label: "Acasă", to: "/", icon: <Home size={18} /> },
        { label: "Echipa", to: "/echipa", icon: <Users size={18} /> },
        { label: "Clasament", to: "/clasament", icon: <Trophy size={18} /> },
        { label: "Meciuri", to: "/meciuri", icon: <CalendarCheck size={18} /> },
        { label: "Cartonașe", to: "/cartonase", icon: <Trophy size={18} /> },
        { label: "Teren", to: "/contact", icon: <MapPin size={18} /> },
        { label: "Galerie", to: "/galerie", icon: <Camera size={18} /> },
    ];

    return (
        <nav className="bg-clubSecondary text-white shadow-xl sticky top-0 z-50">

            {/* TOP BAR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/logo.png" className="h-9 w-9" alt="logo" />
                    <span className="font-bold text-lg tracking-wide">AFC MĂTĂSARU</span>
                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="hover:bg-clubPrimary px-3 py-2 rounded-md font-medium transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* SPONSOR LOGO — DOAR DESKTOP */}
                <div className="hidden md:flex items-center">
                    <img
                        src="/logoChioTransparent2png.png"
                        alt="Sponsor Principal"
                        className="h-10 w-auto object-contain drop-shadow-md"
                    />
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-md hover:bg-clubPrimary transition"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* MOBILE DROPDOWN */}
            {isOpen && (
                <div className="md:hidden bg-clubSecondary/95 backdrop-blur-xl border-t border-white/10 shadow-lg animate-slideDown">
                    <div className="px-4 py-4 flex flex-col gap-2">

                        {menuItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium text-base"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}

                        {/* SPONSOR CARD – LA FINAL */}
                        <div className="mt-4 flex justify-center">
                            <div className="bg-transparent rounded-xl">
                                <img
                                    src="/logoChioTransparent2png.png"
                                    alt="Sponsor Principal"
                                    className="h-10 w-auto object-contain rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
