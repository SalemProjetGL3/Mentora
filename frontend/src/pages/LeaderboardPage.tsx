import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Player = {
    userId: string;
    totalPoints: number;
    currentPoints: number;
    streak: number;
    badgesIds: string[];
};

export default function LeaderboardPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    // Step 1: Fetch initial leaderboard
    useEffect(() => {
        fetch('http://localhost:3000/leaderboard') // Use proxy or full URL
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setPlayers(data);
        })
        .catch((err) => console.error('Failed to fetch leaderboard:', err));
    }, []);

    // Step 2: Subscribe to updates via SSE
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/leaderboard/stream');

        eventSource.addEventListener('leaderboardUpdate', (event: MessageEvent) => {
        const updated = JSON.parse(event.data);
        setPlayers(updated);
        });

        eventSource.onerror = (err) => {
        console.error("SSE error:", err);
        eventSource.close();
        };

        return () => {
        eventSource.close();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">

        {/* Leaderboard Section */}
        <section className="container mx-auto px-6 py-16 flex-1">
            <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            >
            <h2 className="text-4xl font-bold mb-10 text-center text-white">
                Leaderboard
            </h2>
            <Card className="max-w-2xl mx-auto bg-[#0F172A] border border-[#3B82F6] shadow-lg">
                <CardHeader>
                <CardTitle className="text-[#F59E0B] text-2xl text-center">
                    Weekly Top Performers
                </CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="divide-y divide-[#1E293B]">
                <li className="grid grid-cols-[80px_1fr_100px_120px] items-center py-4 px-4 rounded-md">
                    <span className="font-semibold text-white/80">Ranking</span>
                    <span className="text-white font-medium">User</span>
                    <span className="text-[#F59E0B] font-semibold">Streak</span>
                    <span className="text-[#10B981] font-semibold">Total Points</span>
                </li>

                {players.map((player, index) => (
                    <li
                    key={player.userId}
                    className={`grid grid-cols-[80px_1fr_100px_120px] items-center py-4 px-4 rounded-md ${
                        index === 0 ? "bg-[#3B82F6]/10 font-bold" : ""
                    }`}
                    >
                    <span className="font-semibold text-white/80">#{index + 1}</span>
                    <span className="text-white font-medium">{player.userId} Yaatek asba selawti</span>
                    <span className="text-[#F59E0B] font-semibold">{player.streak}</span>
                    <span className="text-[#10B981] font-semibold">{player.totalPoints}</span>
                    </li>
                ))}
                </ul>

                </CardContent>
            </Card>
            </motion.div>
        </section>

        </div>
    );
}