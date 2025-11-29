import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from "lucide-react";

export default function ComingSoon() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-clubSecondary text-white px-6">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                className="text-center"
            >
                <Clock className="mx-auto w-20 h-20 mb-6"/>
                <h1 className="text-5xl font-bold mb-4">În curând!</h1>
                <p className="text-xl max-w-lg mx-auto opacity-90">
                    Lucrăm la această secțiune pentru a aduce fanilor AFC Mătăsaru cea mai bună experiență.
                </p>
            </motion.div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1, duration: 1}}
                className="mt-10 text-lg opacity-80"
            >
                Rămâneți aproape!
            </motion.div>
        </div>
    );
}
