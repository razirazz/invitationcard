"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useUI } from "@/lib/ui-context";

export default function RSVP() {
    const { lang } = useUI();

    const router = useRouter();

    const [step, setStep] = useState(1);
    const [attending, setAttending] = useState<boolean | null>(null);
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

    useEffect(() => {
        if ((attending === false && step === 2) || (attending && step === 4)) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 2500); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [attending, step, router]);

    return (
        <main className="min-h-screen flex items-center justify-center p-6">

            <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 max-w-md w-full text-center space-y-6"
            >

                {/* STEP 1 */}
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-semibold">
                            {lang === "en"
                                ? "Will you attend?"
                                : "നിങ്ങൾ പങ്കെടുക്കുമോ?"}
                        </h2>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setAttending(true);
                                    next();
                                }}
                                className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition"
                            >
                                {lang === "en" ? "Yes! Insha Allah" : "അതെ, ഇന്ഷാഅല്ലാഹ്"}
                            </button>

                            <button
                                onClick={() => {
                                    setAttending(false);
                                    next();
                                }}
                                className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition"
                            >
                                {lang === "en" ? "No" : "ഇല്ല"}
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && attending && (
                    <div className="flex flex-col gap-6">

                        <h2 className="text-xl text-center">
                            {lang === "en"
                                ? "How many people, including you?"
                                : "നിങ്ങളുൾപ്പെടെ എത്ര പേർ?"}
                        </h2>

                        {/* GRID LAYOUT */}
                        <div className="grid grid-cols-3 items-center gap-3 text-center">

                            {/* Minus */}
                            <button
                                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                                className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md text-xl font-bold shadow-md hover:scale-105 transition"
                            >
                                -
                            </button>

                            {/* Number */}
                            <div className="text-2xl font-bold">
                                {guests}
                            </div>

                            {/* Plus */}
                            <button
                                onClick={() => setGuests((prev) => prev + 1)}
                                className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white/40 dark:bg-white/10 backdrop-blur-md text-xl font-bold shadow-md hover:scale-105 transition"
                            >
                                +
                            </button>

                            {/* Back */}
                            <button
                                onClick={back}
                                className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition"
                            >
                                Back
                            </button>

                            {/* Empty spacer */}
                            <div></div>

                            {/* Continue */}
                            <button
                                onClick={next}
                                className="mt-4 px-12 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition flex justify-center itc "
                            >
                                Continue
                            </button>

                        </div>

                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && attending && (
                    <>
                        <h2 className="text-xl">
                            {lang === "en"
                                ? "Your Details"
                                : "നിങ്ങളുടെ വിവരങ്ങൾ"}
                        </h2>

                        <input
                            type="text"
                            placeholder={lang === "en" ? "Your Name" : "നിങ്ങളുടെ പേര്"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/80 text-black outline-none"
                        />

                        <input
                            type="tel"
                            placeholder="WhatsApp Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/80 text-black outline-none"
                        />

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="flex justify-between">
                            <button onClick={back} className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition">Back</button>
                            <button
                                onClick={async () => {
                                    // Reset error
                                    setError("");

                                    // Validation
                                    if (!name.trim()) {
                                        setError(lang === "en" ? "Name is required" : "പേര് ആവശ്യമാണ്");
                                        return;
                                    }

                                    if (!/^[0-9]{10}$/.test(phone)) {
                                        setError(
                                            lang === "en"
                                                ? "Enter valid 10-digit phone number"
                                                : "ശരിയായ ഫോൺ നമ്പർ നൽകുക"
                                        );
                                        return;
                                    }

                                    try {
                                        const res = await fetch("/api/rsvp", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                name,
                                                phone,
                                                attending,
                                                guests,
                                            }),
                                        });

                                        const data = await res.json();

                                        if (data.success) {
                                            next();
                                        } else {
                                            if (data.error === "Phone already exists") {
                                                setError(
                                                    lang === "en"
                                                        ? "This number is already registered"
                                                        : "ഈ നമ്പർ ഇതിനകം രജിസ്റ്റർ ചെയ്തിട്ടുണ്ട്"
                                                );
                                            } else {
                                                setError("Something went wrong");
                                            }
                                        }
                                    } catch (err) {
                                        setError("Server error");
                                    }
                                }}
                                className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 4 */}
                {(step === 4 || (!attending && step === 2)) && (
                    <>
                        <h2 className="text-xl font-semibold">
                            {attending
                                ? lang === "en"
                                    ? "Thank you! 🎉"
                                    : "നന്ദി! 🎉"
                                : lang === "en"
                                    ? "You will be redirected to home shortly..."
                                    : "താങ്കൾ ഉടൻ ഹോം പേജിലേക്ക് മടങ്ങും..."}
                        </h2>

                        <p>
                            {lang === "en"
                                ? "Thank you for your response"
                                : "നിങ്ങളുടെ മറുപടിക്ക് നന്ദി"}
                        </p>
                    </>
                )}

            </motion.div>
        </main>
    );
}