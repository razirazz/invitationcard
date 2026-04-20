"use client";

export const dynamic = "force-dynamic";
import { Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { content } from "@/lib/content";
import { useUI } from "@/lib/ui-context";
import { motion } from "framer-motion";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function CardClient() {
    const params = useSearchParams();
    const { lang } = useUI();
    const cardRef = useRef<HTMLDivElement>(null);

    const [isDownloading, setIsDownloading] = useState(false);

    const name = params.get("name") || "Guest";
    const t = content[lang];

    const mapUrl =
        "https://www.google.com/maps?q=Kottalath+Gardenia+Chettippadi";

    const eventTitle = "Marriage Ceremony - Razeena & Yousuf";

    //   const startDate = "20260613T110000";
    //   const endDate = "20260613T150000";

    //   const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    //     eventTitle
    //   )}&dates=${startDate}/${endDate}&location=${encodeURIComponent(
    //     "Kottalath Gardenia, Chettippadi"
    //   )}&details=${encodeURIComponent("Join us for the Marriage ceremony")}`;
    const handleAddToCalendar = () => {
        try {
            const start = "20260613T110000";
            const end = "20260613T150000";

            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Marriage Ceremony - Razeena & Yousuf
LOCATION:Kottalath Gardenia, Chettippadi
DESCRIPTION:Join us for the Marriage ceremony
DTSTART:${start}
DTEND:${end}
END:VEVENT
END:VCALENDAR`;

            const blob = new Blob([icsContent], { type: "text/calendar" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "invitation.ics";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);

            // ⏳ fallback if nothing happens
            setTimeout(() => {
                window.open(
                    `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        "Nikkah Ceremony - Razeena & Yousuf"
                    )}&dates=20260613T110000/20260613T150000&location=${encodeURIComponent(
                        "Kottalath Gardenia, Chettippadi"
                    )}`,
                    "_blank"
                );
            }, 1500);
        } catch (error) {
            // 🚨 fallback immediately if error
            window.open(
                `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    "Nikkah Ceremony - Razeena & Yousuf"
                )}&dates=20260613T110000/20260613T150000&location=${encodeURIComponent(
                    "Kottalath Gardenia, Chettippadi"
                )}`,
                "_blank"
            );
        }
    };

    const downloadCard = async () => {
        if (!cardRef.current) return;

        try {
            setIsDownloading(true);

            // wait for UI update
            await new Promise((r) => setTimeout(r, 300));

            const dataUrl = await toPng(cardRef.current, {
                cacheBust: true,
                pixelRatio: 3,
            });

            const link = document.createElement("a");
            link.download = "invitation.png";
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    return (
        <main ref={cardRef} className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
            
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-90 -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="
          w-full max-w-lg
          p-6 md:p-10
          rounded-2xl
          backdrop-blur-xl
          bg-[rgba(255,255,255,0.1)]
          border border-[rgba(201,166,70,0.3)]
          shadow-[0_0_40px_rgba(201,166,70,0.15)]
          text-center
          space-y-6
        "
                >

                    {/* Top Divider */}
                    <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#c9a646] to-transparent" />

                    {/* Bismillah */}
                    <p className="text-xs md:text-sm opacity-70 tracking-wide">
                        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </p>

                    {/* Names */}
                    <h1 className="text-2xl md:text-4xl font-bold gold">
                        {t.title}
                    </h1>

                    {/* Greeting */}
                    <p className="text-base md:text-lg">
                        {lang === "en"
                            ? `Dear ${name},`
                            : `${name} ന് സ്നേഹപൂർവ്വം`}
                    </p>

                    {/* Message */}
                    <p className="opacity-80 leading-relaxed text-sm md:text-base px-2">
                        {lang === "en"
                            ? "You are cordially invited to the Marriage ceremony with your presence and blessings."
                            : "നിങ്ങളുടെ സാന്നിധ്യവും അനുഗ്രഹവും സഹിതം ഞങ്ങളുടെ കല്യാണചടങ്ങിലേക്ക് ഹൃദയം നിറഞ്ഞ് ക്ഷണിക്കുന്നു"}
                    </p>

                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[rgba(201,166,70,0.4)] to-transparent" />

                    {/* Event Details */}
                    <div className="space-y-1 text-sm md:text-base">
                        <p>{t.date}</p>
                        <p>{t.time}</p>
                        <p className="opacity-80">{t.venue}</p>
                    </div>

                    {isDownloading && (
                        <div className="flex flex-col items-center gap-2 pt-4">
                            <QRCodeCanvas
                                value={mapUrl}
                                size={110}
                                bgColor="transparent"
                                fgColor="#c9a646"
                            />
                            <p className="text-xs opacity-70">
                                {lang === "en"
                                    ? "Scan for location"
                                    : "സ്ഥലം കാണാൻ സ്കാൻ ചെയ്യുക"}
                            </p>
                        </div>
                    )}

                    {/* ACTION BUTTONS */}
                    {!isDownloading && (
                        <div className="flex flex-col gap-3 pt-4">

                            {/* Primary */}
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
              w-full
              px-5 py-3
              rounded-xl
              bg-gradient-to-r from-[#c9a646] to-[#f1d77a]
              text-black font-semibold
              shadow-md
              hover:scale-[1.02]
              transition
            "
                            >
                                📍 {lang === "en" ? "Get Directions" : "വഴി കാണുക"}
                            </a>

                            {/* Secondary */}
                            <a
                                onClick={handleAddToCalendar}
                                // target="_blank"
                                // rel="noopener noreferrer"
                                className="
              w-full
              px-5 py-3
              rounded-xl
              bg-white/15
              border border-[rgba(255,255,255,0.2)]
              backdrop-blur-md
              hover:scale-[1.02]
              transition
              cursor-pointer
            "
                            >
                                📅 {lang === "en" ? "Add to Calendar" : "കലണ്ടറിൽ ചേർക്കുക"}
                            </a>

                            <button
                                onClick={downloadCard}
                                className="
                            w-full
                            px-5 py-3
                            rounded-xl
                            bg-gradient-to-r from-[#c9a646] to-[#f1d77a]
                            text-black font-semibold
                            shadow-md
                            hover:scale-[1.02]
                            transition
                        "
                            >
                                📥 {lang === "en" ? "Download Invitation" : "ഡൗൺലോഡ് ചെയ്യുക"}
                            </button>

                        </div>
                    )}


                    {/* Closing */}
                    <div className="pt-4 space-y-1">
                        <p className="text-sm opacity-70">
                            إِنْ شَاءَ ٱللَّٰهُ
                        </p>
                        <p className="text-xs opacity-60">
                            {lang === "en" ? "In-shā-Allāh" : "ഇൻഷാ അല്ലാഹ്"}
                        </p>
                    </div>

                    {/* Bottom Divider */}
                    <div className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-[#c9a646] to-transparent" />

                </motion.div>
        </main>
    );
}