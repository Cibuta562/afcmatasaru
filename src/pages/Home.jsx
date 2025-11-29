import React, { useEffect, useState } from "react";
import { Calendar, Trophy, Users, ListOrdered, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
    const [nextMatch, setNextMatch] = useState(null);

    useEffect(() => {
        const loadNextMatch = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/matches");
                const data = await res.json();

                if (!data.matches) return;

                const today = new Date();

                // Funcție de convertire dată
                const parseDate = (str) => {
                    if (!str || str.toLowerCase().includes("stabilită")) return null;
                    const d = new Date(str.replace(/\./g, "-"));
                    return isNaN(d.getTime()) ? null : d;
                };

                // 1️⃣ Meciuri cu dată validă, după azi
                let withDate = data.matches.filter((m) => {
                    const d = parseDate(m.date);
                    return d && d > today;
                });

                // Sortare crescătoare
                withDate.sort((a, b) => {
                    const da = parseDate(a.date);
                    const db = parseDate(b.date);
                    return da - db;
                });

                // 2️⃣ Meciuri fără dată
                let withoutDate = data.matches.filter((m) => !parseDate(m.date));

                // 3️⃣ Alegerea finală:
                // Dacă există meciuri cu dată → luăm primul
                if (withDate.length > 0) {
                    setNextMatch(withDate[0]);
                }
                // Dacă NU există, luăm primul fără dată
                else if (withoutDate.length > 0) {
                    setNextMatch(withoutDate[0]);
                }
                // Nimic → null
                else {
                    setNextMatch(null);
                }

            } catch (e) {
                console.error("Eroare next match:", e);
            }
        };

        loadNextMatch();
    }, []);

    // Format dată DD.MM.YYYY
    const formatDate = (dateString) => {
        const d = new Date(dateString.replace(/\./g, "-"));
        if (isNaN(d.getTime())) return "Umrează să fie anunțat";
        return `${String(d.getDate()).padStart(2, "0")}.${String(
            d.getMonth() + 1
        ).padStart(2, "0")}.${d.getFullYear()}`;
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* HERO */}
            <div className="relative h-[500px] bg-clubSecondary flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">AFC MĂTĂSARU</h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                        Mândria comunității. Pasiunea jocului.
                    </p>
                    <Link
                        to="/meciuri"
                        className="bg-clubPrimary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition"
                    >
                        Vezi Programul
                    </Link>
                </div>
            </div>

            {/* CARDURI SECTIUNI */}
            <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Obiectiv */}
                <HomeCard
                    icon={<Trophy className="w-12 h-12 mx-auto text-clubPrimary mb-4" />}
                    title="Obiectiv"
                    text="Luptăm pentru promovare și performanță constantă."
                />

                {/* Următorul Meci - DINAMIC */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <Calendar className="w-12 h-12 mx-auto text-clubPrimary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Următorul Meci</h3>

                    {nextMatch ? (
                        <>
                            <p className="text-gray-800 font-bold text-lg">
                                Data: {nextMatch.date ? formatDate(nextMatch.date) : "Urmează să fie anunțată"}
                            </p>

                            <p className="text-gray-600 font-semibold mt-2">
                                {nextMatch.team1}{" "}
                                <span className="text-clubPrimary">vs</span>{" "}
                                {nextMatch.team2}
                            </p>

                            {nextMatch.round && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Etapa {nextMatch.round}
                                </p>
                            )}
                        </>
                    ) : (
                        <p className="text-gray-500">Nu există meciuri viitoare.</p>
                    )}
                </div>

                {/* Clasament */}
                <HomeCard
                    icon={<ListOrdered className="w-12 h-12 mx-auto text-clubPrimary mb-4" />}
                    title="Clasament"
                    text="Vezi poziția actuală în Liga 6 Vest."
                    link="/clasament"
                />

                {/* Cartonașe galbene */}
                <HomeCard
                    icon={<Users className="w-12 h-12 mx-auto text-yellow-500 mb-4" />}
                    title="Cartonașe Galbene"
                    text="Situația disciplinară a jucătorilor."
                    link="/cartonase"
                />

                {/* Teren & Contact */}
                <HomeCard
                    icon={<MapPin className="w-12 h-12 mx-auto text-clubPrimary mb-4" />}
                    title="Teren & Contact"
                    text="Harta stadionului, adresa și numărul de contact."
                    link="/contact"
                />
            </div>
        </div>
    );
};

// COMPONENT CARD
const HomeCard = ({ icon, title, text, link }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
        {icon}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{text}</p>
        {link && (
            <Link
                to={link}
                className="text-clubPrimary font-semibold hover:text-red-700 transition"
            >
                Vezi detalii →
            </Link>
        )}
    </div>
);

export default Home;
