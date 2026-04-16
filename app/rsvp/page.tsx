"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUI } from "@/lib/ui-context";

export default function RSVP() {
    const { lang } = useUI();

    const [step, setStep] = useState(1);
    const [attending, setAttending] = useState<boolean | null>(null);
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const next = () => setStep((s) => s + 1);
    const back = () => setStep((s) => s - 1);

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
                                className="px-6 py-2 glass rounded-xl"
                            >
                                {lang === "en" ? "Yes" : "അതെ"}
                            </button>

                            <button
                                onClick={() => {
                                    setAttending(false);
                                    next();
                                }}
                                className="px-6 py-2 glass rounded-xl"
                            >
                                {lang === "en" ? "No" : "ഇല്ല"}
                            </button>
                        </div>
                    </>
                )}

                {/* STEP 2 */}
                {step === 2 && attending && (
                    <>
                        <h2 className="text-xl">
                            {lang === "en"
                                ? "How many people?"
                                : "എത്ര പേർ വരും?"}
                        </h2>

                        <input
                            type="number"
                            value={guests}
                            min={1}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="w-full p-2 rounded-lg text-black"
                        />

                        <div className="flex justify-between">
                            <button onClick={back}>Back</button>
                            <button onClick={next}>Continue</button>
                        </div>
                    </>
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
                            placeholder={lang === "en" ? "Name" : "പേര്"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-lg text-black"
                        />

                        <input
                            type="tel"
                            placeholder="WhatsApp Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 rounded-lg text-black"
                        />

                        <div className="flex justify-between">
                            <button onClick={back}>Back</button>
                            <button
                                onClick={async () => {
                                    if (!name || !phone) {
                                        alert("Please fill all fields");
                                        return;
                                    }

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
                                        alert("Error saving response");
                                    }
                                }}
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
                                    ? "Thank you for your response"
                                    : "നിങ്ങളുടെ മറുപടിക്ക് നന്ദി"}
                        </h2>

                        <p>
                            {lang === "en"
                                ? "We look forward to seeing you."
                                : "നിങ്ങളെ കാണാൻ ആകാംക്ഷയോടെ കാത്തിരിക്കുന്നു"}
                        </p>
                    </>
                )}

            </motion.div>
        </main>
    );
}