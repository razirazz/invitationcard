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
        if (attending && step === 4) {
            const timer = setTimeout(() => {
                router.push("/");
            }, 2500); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [attending, step, router]);

    return (
        <main className="min-h-[90vh] flex items-center justify-center p-6">

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
                                            router.push(
                                                `/card?name=${encodeURIComponent(name)}&phone=${phone}`
                                            );
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
                {step === 2 && attending === false && (
                    <div className="min-h-[65vh] flex flex-col justify-between text-center">

                        {/* Back */}
                        <div className="text-left">
                            <button
                                onClick={back}
                                className="text-sm opacity-60 hover:opacity-100 transition"
                            >
                                ← {lang === "en" ? "Back" : "തിരികെ"}
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col items-center justify-center gap-6 px-4">

                            {/* Soft Icon */}
                            <div className="text-3xl opacity-80">🌙</div>

                            {/* Heading */}
                            <h2 className="text-xl md:text-2xl font-medium tracking-wide leading-snug">
                                {lang === "en"
                                    ? "Even if you’re not with us..."
                                    : "നിങ്ങൾ ഞങ്ങളോടൊപ്പം ഇല്ലെങ്കിലും..."}
                            </h2>

                            {/* Message */}
                            <p className="text-sm md:text-base opacity-80 leading-relaxed max-w-xs md:max-w-sm">
                                {lang === "en"
                                    ? "Your thoughts and prayers mean a lot to us. Thank you for letting us know — may Allah bless your days with peace and ease."
                                    : "നിങ്ങളുടെ പ്രാർത്ഥനകളും ആശംസകളും ഞങ്ങൾക്ക് ഏറെ വിലപ്പെട്ടതാണ്. അറിയിച്ചതിന് നന്ദി — അല്ലാഹു നിങ്ങളെ സമാധാനത്തിലും അനുഗ്രഹത്തിലും നിറക്കട്ടെ."}
                            </p>

                        </div>

                        {/* Event Card */}
                        <div className="glass p-5 space-y-1 text-sm md:text-base border border-[#c9a646]/20 shadow-[0_0_20px_rgba(201,166,70,0.08)] mt-3">
                            <p className="font-semibold gold">13 June 2026</p>
                            <p>11:00 AM - 3:00 PM</p>
                            <p className="opacity-80">Kottalath Gardenia, Chettippadi</p>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={() => router.push("/")}
                            className="
                                mt-4
                                px-6 py-3
                                rounded-xl
                                bg-gradient-to-r from-[#c9a646]/20 to-[#f1d77a]/20
                                border border-[#c9a646]/30
                                backdrop-blur-md
                                text-sm md:text-base
                                gold
                                font-medium
                                hover:scale-[1.02]
                                hover:bg-[#c9a646]/30
                                transition
                            "
                        >
                            {lang === "en"
                                ? "Change of plans? Join us anytime 🤍"
                                : "മനസ്സുമാറ്റമുണ്ടെങ്കിൽ — സ്വാഗതം 🤍"}
                        </button>

                    </div>
                )}

            </motion.div>
        </main>
    );
}