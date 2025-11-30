import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch("https://afcmatasaru-production.up.railway.app/api/matches");
                if (!response.ok) throw new Error("Eroare server API.");

                const data = await response.json();
                if (data.error) throw new Error(data.error);

                setMatches(data.matches || []);
                setLoading(false);
            } catch (err) {
                console.error("Eroare la fetch:", err);
                setError(err.message || "Nu am putut încărca meciurile.");
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    // -----------------------------
    // LOGICA
    // -----------------------------

    const today = new Date();

    const parseDate = (str) => {
        if (!str || str.toLowerCase().includes("stabilită")) return null;

        const cleaned = str.replace(/\./g, "-").trim();
        const d = new Date(cleaned);
        return isNaN(d.getTime()) ? null : d;
    };

    // 🔥 FORMAT FINAL: DD.MM.YYYY
    const formatDate = (str) => {
        const d = parseDate(str);
        if (!d) return "Data va fi stabilită";

        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const playedMatches = matches.filter((m) => m.score && /\d/.test(m.score));

    let upcomingMatches = matches.filter((m) => {
        const d = parseDate(m.date);
        return d && d > today;
    });

    const tbdMatches = matches.filter((m) => !parseDate(m.date));

    playedMatches.sort((a, b) => {
        const da = parseDate(a.date);
        const db = parseDate(b.date);
        if (!da || !db) return 0;
        return da - db;
    });

    upcomingMatches.sort((a, b) => {
        const da = parseDate(a.date);
        const db = parseDate(b.date);
        if (!da || !db) return 0;
        return da - db;
    });

    const futureMatches = [...upcomingMatches, ...tbdMatches];

    // -----------------------------
    // RENDER
    // -----------------------------

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-clubSecondary">
                Program & Rezultate AFC Mătăsaru
            </h2>

            {loading ? (
                <div className="text-center py-10">
                    <Loader className="w-8 h-8 mx-auto text-clubPrimary animate-spin" />
                    <p className="text-gray-500 mt-2">Se încarcă programul...</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {error && (
                        <div className="text-center text-red-700 bg-red-100 p-4 rounded border border-red-300">
                            <p className="font-bold">
                                Eroare: Nu s-au putut prelua meciurile.
                            </p>
                            <p className="text-sm mt-1 text-gray-800">Cauza: {error}</p>
                        </div>
                    )}

                    {!error && (
                        <>
                            {/* Meciuri jucate */}
                            <section>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                    Meciuri jucate
                                </h3>
                                {playedMatches.length === 0 ? (
                                    <p className="text-gray-500 text-sm">
                                        Nu există încă meciuri jucate în acest sezon.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {playedMatches.map((match, idx) => (
                                            <MatchCard key={idx} match={match} formatDate={formatDate} />
                                        ))}
                                    </div>
                                )}
                            </section>

                            {/* Meciuri viitoare */}
                            <section>
                                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                    Meciuri viitoare
                                </h3>
                                {futureMatches.length === 0 ? (
                                    <p className="text-gray-500 text-sm">
                                        Nu sunt programate momentan alte meciuri.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {futureMatches.map((match, idx) => (
                                            <MatchCard key={idx} match={match} isUpcoming formatDate={formatDate} />
                                        ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

function MatchCard({ match, isUpcoming, formatDate }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row items-center justify-between border-l-4 border-clubSecondary hover:border-clubPrimary transition">
            <div className="text-xs md:text-sm text-gray-500 mb-2 md:mb-0 w-full md:w-1/4 text-center md:text-left font-mono">
                {formatDate(match.date)}
                {match.round && (
                    <span className="block text-[11px] text-gray-400">
                        Etapa {match.round}
                    </span>
                )}
            </div>

            <div className="flex items-center justify-center w-full md:w-2/4 font-bold text-md md:text-lg">
                <span className="text-right w-1/2 pr-4 text-gray-800">
                    {match.team1}
                </span>

                <span
                    className={`px-3 py-1 rounded min-w-[60px] text-center shadow-sm ${
                        isUpcoming
                            ? "bg-gray-200 text-gray-700"
                            : "bg-clubSecondary text-white"
                    }`}
                >
                    {match.score && /\d/.test(match.score)
                        ? match.score
                        : isUpcoming
                            ? "vs"
                            : "-"}
                </span>

                <span className="text-left w-1/2 pl-4 text-gray-800">
                    {match.team2}
                </span>
            </div>

            <div className="w-full md:w-1/4" />
        </div>
    );
}

export default Matches;
