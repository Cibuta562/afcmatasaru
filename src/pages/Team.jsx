import React, { useEffect, useState } from "react";

const players = [
    { id: 1, name: 'Ion Popescu', pos: 'Portar', number: 1 },
    { id: 2, name: 'Andrei Radu', pos: 'Fundaș', number: 4 },
    { id: 3, name: 'Marius Ionescu', pos: 'Mijlocaș', number: 10 },
    { id: 4, name: 'George Marin', pos: 'Atacant', number: 9 },
];

const Team = () => {
    const [yellowCards, setYellowCards] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem("yellowCards");
        if (saved) {
            setYellowCards(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-clubSecondary">Lotul Echipei</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {players.map((player) => (
                    <div key={player.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                        <div className="h-48 bg-gray-200 flex flex-col items-center justify-center">
                            <span className="text-4xl text-gray-400 font-bold">#{player.number}</span>
                        </div>

                        <div className="p-4 text-center">
                            <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
                            <p className="text-clubPrimary font-semibold mb-2">{player.pos}</p>

                            {/* CARTONAȘE */}
                            <p className="text-yellow-600 font-bold">
                                Cartonașe Galbene:{" "}
                                <span className="text-black">
                                    {yellowCards[player.id] || 0}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
