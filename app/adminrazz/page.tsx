"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Admin() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from("rsvp")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            setData(data);
        }

        setLoading(false);
    };

    if (loading) return <p className="p-6">Loading...</p>;

    const totalGuests = data
        .filter((d) => d.attending)
        .reduce((sum, d) => sum + d.guests, 0);

    const totalAttending = data.filter((d) => d.attending).length;

    return (
        <main className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Guest List
            </h1>

            <div className="flex gap-6 mb-6">
                <div className="glass p-4">
                    Total Attending: {totalAttending}
                </div>

                <div className="glass p-4">
                    Total Guests: {totalGuests}
                </div>
            </div>

            <div className="overflow-x-auto glass p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Attending</th>
                            <th>Guests</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>
                                    {item.attending ? "Yes" : "No"}
                                </td>
                                <td>{item.guests}</td>
                                <td>
                                    {new Date(item.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </main>
    );
}