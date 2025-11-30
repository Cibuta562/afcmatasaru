import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ADMIN_PASSWORD = "afcmatasaru123"; // schimb-o dacă vrei

const Team = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Admin states
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");

    // Add/edit form states
    const [editId, setEditId] = useState(null);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [position, setPosition] = useState("");
    const [yellowCards, setYellowCards] = useState(0);
    const [photoFile, setPhotoFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const loadPlayers = async () => {
        try {
            setLoading(true);
            const snap = await getDocs(collection(db, "players"));
            const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            list.sort((a, b) => (a.number || 0) - (b.number || 0));
            setPlayers(list);
        } catch (e) {
            setError("Nu am putut încărca jucătorii.");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlayers();
    }, []);

    const loginAdmin = (e) => {
        e.preventDefault();
        if (adminPassword === ADMIN_PASSWORD) {
            setAuthenticated(true);
        } else {
            alert("Parolă greșită.");
        }
        setAdminPassword("");
    };

    const resetForm = () => {
        setEditId(null);
        setName("");
        setNumber("");
        setPosition("");
        setYellowCards(0);
        setPhotoFile(null);
    };

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!name || !number || !position) {
            alert("Completează numele, numărul și poziția.");
            return;
        }

        try {
            setSaving(true);

            let photoUrl = null;

            if (photoFile) {
                const storageRef = ref(
                    storage,
                    `players/${Date.now()}_${photoFile.name}`
                );
                await uploadBytes(storageRef, photoFile);
                photoUrl = await getDownloadURL(storageRef);
            }

            if (editId) {
                const playerRef = doc(db, "players", editId);
                const data = {
                    name,
                    number: Number(number),
                    position,
                    yellowCards: Number(yellowCards),
                };
                if (photoUrl) data.photoUrl = photoUrl;
                await updateDoc(playerRef, data);
            } else {
                await addDoc(collection(db, "players"), {
                    name,
                    number: Number(number),
                    position,
                    yellowCards: Number(yellowCards),
                    photoUrl: photoUrl || "",
                    createdAt: serverTimestamp(),
                });
            }

            resetForm();
            await loadPlayers();
        } catch (err) {
            alert("Eroare la salvare.");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const startEdit = (player) => {
        setEditId(player.id);
        setName(player.name);
        setNumber(player.number);
        setPosition(player.position);
        setYellowCards(player.yellowCards || 0);
        setPhotoFile(null);
        setIsAdminOpen(true);
        setAuthenticated(true);
    };

    const deletePlayer = async (id) => {
        if (!window.confirm("Sigur vrei să ștergi acest jucător?")) return;
        try {
            await deleteDoc(doc(db, "players", id));
            await loadPlayers();
        } catch (e) {
            console.error(e);
            alert("Nu am putut șterge jucătorul.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-clubSecondary">Lotul Echipei</h2>
                <button
                    onClick={() => setIsAdminOpen((s) => !s)}
                    className="px-4 py-2 bg-clubPrimary text-white rounded-lg hover:bg-clubSecondary"
                >
                    {isAdminOpen ? "Închide panoul admin" : "Panou admin"}
                </button>
            </div>

            {isAdminOpen && (
                <div className="bg-white shadow-xl rounded-xl p-6 mb-12">
                    {!authenticated ? (
                        <form onSubmit={loginAdmin} className="max-w-sm space-y-4">
                            <h3 className="text-xl font-bold">Autentificare admin</h3>
                            <input
                                type="password"
                                className="w-full border p-2 rounded-lg"
                                placeholder="Parolă admin"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-clubPrimary text-white rounded-lg"
                            >
                                Intră
                            </button>
                        </form>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold mb-4">
                                {editId ? "Editează jucător" : "Adaugă jucător nou"}
                            </h3>

                            <form
                                onSubmit={handleAddOrUpdate}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            >
                                <input
                                    placeholder="Nume"
                                    className="border rounded-lg p-2"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <input
                                    placeholder="Număr"
                                    className="border rounded-lg p-2"
                                    type="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />

                                <input
                                    placeholder="Poziție"
                                    className="border rounded-lg p-2"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                />

                                <input
                                    placeholder="Galbene"
                                    className="border rounded-lg p-2"
                                    type="number"
                                    value={yellowCards}
                                    onChange={(e) => setYellowCards(e.target.value)}
                                />

                                <div className="md:col-span-2">
                                    <label className="block font-medium mb-1">Poză jucător</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setPhotoFile(e.target.files[0])}
                                    />
                                </div>

                                <div className="md:col-span-2 flex gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-clubPrimary text-white rounded-lg hover:bg-clubSecondary"
                                        disabled={saving}
                                    >
                                        {saving ? "Se salvează..." : editId ? "Salvează modificările" : "Adaugă jucător"}
                                    </button>

                                    {editId && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                        >
                                            Anulează editarea
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Lista de jucători în panoul admin */}
                            <h3 className="text-xl font-bold mt-10 mb-4">Jucători existenți</h3>
                            <div className="space-y-3">
                                {players.map((p) => (
                                    <div
                                        key={p.id}
                                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                                    >
                    <span className="font-medium">
                      #{p.number} – {p.name} ({p.position})
                    </span>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => startEdit(p)}
                                                className="px-3 py-1 bg-green-600 text-white rounded-lg"
                                            >
                                                Editează
                                            </button>
                                            <button
                                                onClick={() => deletePlayer(p.id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded-lg"
                                            >
                                                Șterge
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Afișare jucători */}
            {loading ? (
                <p>Se încarcă...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {players.map((player) => (
                        <div
                            key={player.id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden"
                        >
                            <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {player.photoUrl ? (
                                    <img
                                        src={player.photoUrl}
                                        alt={player.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-gray-500">
                    #{player.number}
                  </span>
                                )}
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-xl font-bold">{player.name}</h3>
                                <p className="text-clubPrimary font-semibold">{player.position}</p>
                                <p className="font-bold text-yellow-600">
                                    Galbene: {player.yellowCards || 0}
                                </p>
                                <p className="text-gray-500">#{player.number}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Team;
