import React, { useEffect, useState } from "react";
import { storage, db } from "../firebase";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "firebase/storage";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

const Galerie = () => {
    const [images, setImages] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [file, setFile] = useState(null);

    const correctPassword = "matasaru2025";

    const loadImages = async () => {
        const snapshot = await getDocs(collection(db, "galerie"));
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setImages(list);
    };

    useEffect(() => {
        loadImages();
    }, []);

    const loginAdmin = () => {
        if (passwordInput === correctPassword) setIsAdmin(true);
        else alert("Parolă greșită!");
    };

    const logout = () => {
        setIsAdmin(false);
        setPasswordInput("");
    };

    const uploadImage = async () => {
        if (!file) return alert("Alege o imagine!");

        const fileRef = ref(storage, `galerie/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);

        await addDoc(collection(db, "galerie"), {
            url,
            createdAt: Date.now(),
        });

        setFile(null);
        loadImages();
    };

    const deleteImage = async (img) => {
        if (!window.confirm("Ștergi această imagine?")) return;

        try {
            const fileRef = ref(storage, img.url);
            await deleteObject(fileRef);
        } catch {}

        await deleteDoc(doc(db, "galerie", img.id));
        loadImages();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-clubSecondary">Galerie Foto</h2>

                {!isAdmin ? (
                    <button
                        onClick={() => setIsAdmin(true)}
                        className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                    >
                        Admin
                    </button>
                ) : (
                    <button
                        onClick={logout}
                        className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                        Ieșire
                    </button>
                )}
            </div>

            {/* LOGIN */}
            {isAdmin && !passwordInput && (
                <div className="max-w-xs mx-auto bg-white p-4 rounded-lg shadow mb-6">
                    <p className="font-semibold text-center mb-2">Parolă admin</p>
                    <input
                        type="password"
                        className="w-full border p-2 rounded mb-3"
                        placeholder="Introdu parola"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <button
                        onClick={loginAdmin}
                        className="w-full bg-clubPrimary text-white py-2 rounded-md"
                    >
                        Confirmă
                    </button>
                </div>
            )}

            {/* PANOU ADMIN */}
            {isAdmin && passwordInput === correctPassword && (
                <div className="max-w-md mx-auto bg-white p-5 rounded-lg shadow-md mb-10">
                    <h3 className="font-semibold mb-3 text-lg">Adaugă imagine</h3>

                    <input
                        type="file"
                        className="w-full border p-2 rounded mb-4"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button
                        onClick={uploadImage}
                        className="bg-green-600 text-white w-full py-2 rounded-md"
                    >
                        Încarcă imagine
                    </button>
                </div>
            )}

            {/* GALERIE FOTO – MAI MARE, GRID MODERN */}
            {/* GALERIE FOTO — FULL WIDTH ON MOBILE */}
            <div
                className="
        grid
        grid-cols-1        /* pe telefon 1 poză = full width */
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
    "
            >

            {images.map(img => (
                <div key={img.id} className="relative group rounded-lg overflow-hidden shadow-lg">

                    <img
                        src={img.url}
                        alt=""
                        className="
        w-full
        h-64               /* mai înaltă pe mobil */
        sm:h-48            /* ajustare pe tabletă/desktop */
        object-cover
        rounded-lg
        transition-transform
        duration-300
        group-hover:scale-110
    "
                    />


                    {isAdmin && passwordInput === correctPassword && (
                        <button
                            onClick={() => deleteImage(img)}
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded opacity-90"
                        >
                            Șterge
                        </button>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default Galerie;
