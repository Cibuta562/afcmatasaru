import React, { useEffect, useState } from "react";

const Standings = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Acum luăm direct din backend-ul tău Node
                const response = await fetch("https://afcmatasaru.onrender.com/api/standings");

                if (!response.ok) {
                    throw new Error("Eroare server API");
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setTeams(data.teams || []);
                setLoading(false);
            } catch (err) {
                console.error("Eroare la fetch:", err);
                setError("Nu am putut încărca datele. Reîncearcă.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-clubSecondary">
                Clasament Liga 6 Vest
            </h2>

            {loading && (
                <div className="text-center py-10 animate-pulse text-xl">
                    Se încarcă datele...
                </div>
            )}

            {error && (
                <div className="text-center py-10">
                    <p className="text-red-500 mb-2 font-semibold">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="overflow-x-auto shadow-md rounded-lg bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-clubSecondary text-white">
                        <tr>
                            <th className="p-4">Loc</th>
                            <th className="p-4">Echipa</th>
                            <th className="p-4 hidden sm:table-cell">M</th>
                            <th className="p-4 hidden sm:table-cell">V</th>
                            <th className="p-4 hidden sm:table-cell">E</th>
                            <th className="p-4 hidden sm:table-cell">Î</th>
                            <th className="p-4 font-bold">Pct</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {teams.map((team, index) => {
                            const isMyTeam =
                                team.nume.toLowerCase().includes("matasaru") ||
                                team.nume.toLowerCase().includes("mătăsaru");

                            return (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-50 ${
                                        isMyTeam
                                            ? "bg-red-50 border-l-4 border-l-clubPrimary"
                                            : ""
                                    }`}
                                >
                                    <td className="p-4 font-bold text-gray-700">
                                        {team.loc}
                                    </td>

                                    <td
                                        className={`p-4 font-semibold ${
                                            isMyTeam
                                                ? "text-clubPrimary text-lg"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {team.nume}
                                    </td>

                                    <td className="p-4 hidden sm:table-cell">{team.m}</td>
                                    <td className="p-4 hidden sm:table-cell">{team.v}</td>
                                    <td className="p-4 hidden sm:table-cell">{team.e}</td>
                                    <td className="p-4 hidden sm:table-cell">{team.i}</td>

                                    <td className="p-4 font-bold text-lg text-clubSecondary">
                                        {team.pct}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Standings;
