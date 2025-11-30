import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const menuItems = [
        { label: "Acasă", to: "/" },
        { label: "Echipa", to: "/echipa" },
        { label: "Clasament", to: "/clasament" },
        { label: "Meciuri", to: "/meciuri" },
        { label: "Cartonașe", to: "/cartonase" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <footer className="bg-clubSecondary text-white mt-14">

            {/* TOP SECTION */}
            <div className="max-w-7xl mx-auto px-6 py-10 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Club info */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <img src="/logo.png" alt="AFC Mătăsaru" className="h-10 w-10" />
                            <span className="font-bold text-xl tracking-wide">
                AFC MĂTĂSARU
              </span>
                        </div>

                        <p className="text-sm text-white/80 max-w-xs leading-relaxed">
                            Fotbal cu pasiune în comuna Mătăsaru.
                            Club dedicat comunității și performanței.
                        </p>
                    </div>

                    {/* Menu recap */}
                    <div>
                        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/70">
                            Meniu rapid
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {menuItems.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="hover:text-clubPrimary transition"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Partner & Developer */}
                    <div>
                        <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-white/70">
                            Parteneri & Dezvoltare
                        </h3>

                        {/* Sponsor */}
                        <div className="mb-5">
                            <p className="text-xs text-white/70 mb-1">Sponsor oficial</p>
                            <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center shadow-md">
                                <img
                                    src="/logoChio.png"
                                    alt="Sponsor echipă"
                                    className="h-20 w-auto object-fill"
                                />
                            </div>
                        </div>

                        {/* Firma dezvoltatoare */}
                        <div>
                            <p className="text-xs text-white/70 mb-1">Website realizat de</p>
                            <a
                                href="https://www.generationsalez.ro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow-md hover:opacity-90 transition"
                            >
                                <img
                                    src="/logoSalez.svg"
                                    alt="Generation Salez"
                                    className="h-8 w-auto object-contain"
                                />
                                <span className="text-white font-semibold text-sm">
                  Generation Salez
                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="bg-black/20">
                <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-white/70">
                    © {new Date().getFullYear()} AFC Mătăsaru — Toate drepturile rezervate.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
