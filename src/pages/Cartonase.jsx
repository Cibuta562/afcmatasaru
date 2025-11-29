import React, { useState, useEffect } from "react";

const players = [
    { id: 1, name: 'Ion Popescu', pos: 'Portar', number: 1 },
    { id: 2, name: 'Andrei Radu', pos: 'Fundaș', number: 4 },
    { id: 3, name: 'Marius Ionescu', pos: 'Mijlocaș', number: 10 },
    { id: 4, name: 'George Marin', pos: 'Atacant', number: 9 },
];

const Cartonase = () => {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [yellowCards, setYellowCards] = useState({});
    const [draftCards, setDraftCards] = useState({}); // valori nesalvate încă

    useEffect(() => {
        const saved = localStorage.getItem("yellowCards");
        const parsed = saved ? JSON.parse(saved) : {};

        setYellowCards(parsed);
        setDraftCards(parsed);
    }, []);

    const handleAuth = () => {
        if (password === "matasaru2025") {
            setAuthorized(true);
        } else {
            alert("Parola greșită!");
        }
    };

    const increment = (id) => {
        setDraftCards((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrement = (id) => {
        setDraftCards((prev) => ({
            ...prev,
            [id]: prev[id] > 0 ? prev[id] - 1 : 0,
        }));
    };

    const confirmChange = (id) => {
        const newData = { ...yellowCards, [id]: draftCards[id] };
        setYellowCards(newData);
        localStorage.setItem("yellowCards", JSON.stringify(newData));
        alert("Modificare salvată!");
    };

    if (!authorized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-4 text-clubSecondary">
                        Introdu parola
                    </h2>
                    <input
                        type="password"
                        placeholder="Parola administrator"
                        className="w-full border p-3 rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleAuth}
                        className="w-full bg-clubPrimary text-white py-2 rounded font-bold hover:bg-red-700 transition"
                    >
                        Accesează panoul
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-clubSecondary">
                Gestionare Cartonașe Galbene
            </h2>

            <div className="space-y-8">
                {players.map((player) => (
                    <div
                        key={player.id}
                        className="bg-white p-6 rounded-xl shadow"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{player.name}</h3>
                                <p className="text-gray-600">
                                    #{player.number} — {player.pos}
                                </p>
                            </div>

                            <span className="text-yellow-500 text-3xl ml-3">🟨</span>
                        </div>

                        {/* CONTROALE NUMERIC + - */}
                        <div className="flex items-center gap-3 mb-6">

                            {/* MINUS */}
                            <button
                                onClick={() => decrement(player.id)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 text-blue-100 font-bold text-xl hover:bg-blue-200 transition"
                            >
                                -
                            </button>

                            {/* INPUT */}
                            <input
                                type="number"
                                min="0"
                                className="w-20 text-center p-2 border rounded-lg text-lg"
                                value={draftCards[player.id] || 0}
                                onChange={(e) =>
                                    setDraftCards({
                                        ...draftCards,
                                        [player.id]: Number(e.target.value),
                                    })
                                }
                            />

                            {/* PLUS */}
                            <button
                                onClick={() => increment(player.id)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-700 text-blue-100 font-bold text-xl hover:bg-blue-200 transition"
                            >
                                +
                            </button>
                        </div>

                        {/* BUTON CONFIRMARE */}
                        <button
                            onClick={() => confirmChange(player.id)}
                            className="w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
                        >
                            Confirmă modificarea
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cartonase;
