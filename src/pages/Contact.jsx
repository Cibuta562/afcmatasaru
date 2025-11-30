import React from "react";
import { MapPin, Phone, Mail, Route } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Titlu */}
                <h1 className="text-4xl font-bold text-center text-clubSecondary mb-10">
                    Teren & Contact AFC Mătăsaru
                </h1>

                {/* Card Info */}
                <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Informații de contact
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-7 h-7 text-clubPrimary" />
                            <div>
                                <p className="font-semibold text-gray-800">Adresă stadion:</p>
                                <p className="text-gray-600">
                                    DJ401A 243, Puțu cu Salcie 137299
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="w-7 h-7 text-clubPrimary" />
                            <div>
                                <p className="font-semibold text-gray-800">Telefon:</p>
                                <p className="text-gray-600">+40 723 344 599</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="w-7 h-7 text-clubPrimary" />
                            <div>
                                <p className="font-semibold text-gray-800">Email:</p>
                                <p className="text-gray-600">andreiboboccibo@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">

                        {/* Directions Button */}
                        <a
                            href="https://www.google.com/maps/dir/?api=1&destination=DJ401A+243,+Puțu+cu+Salcie+137299"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition text-center"
                        >
                            Navighează spre locație
                        </a>
                    </div>
                </div>

                {/* Google Maps Iframe – Stilizat */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="500"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        className="rounded-xl"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=DJ401A%20243,%20Puțu%20cu%20Salcie%20137299&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
