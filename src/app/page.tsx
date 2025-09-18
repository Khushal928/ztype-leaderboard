"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDdlB2tEp3IPKHi0omoNSYRR720ycEOET8",

  authDomain: "leaderboard-6a7a6.firebaseapp.com",

  projectId: "leaderboard-6a7a6",

  storageBucket: "leaderboard-6a7a6.firebasestorage.app",

  messagingSenderId: "329400579144",

  appId: "1:329400579144:web:0cde884ea0abfcc617147d",

  measurementId: "G-3Y5QLDEFGQ"

};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

import ButtonBackground from "@/components/button_background";
import LeaderboardCard from "@/components/leaderboard_card";

interface User {
  rank: number;
  username: string;
  level: number;
  score: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: User[] = snapshot.docs.map((doc, i) => ({
        rank: i + 1,
        username: doc.data().name,
        level: doc.data().wave,
        score: doc.data().score,
      }));
      setUsers(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative h-screen overflow-scroll">
      <div className="absolute top-[-1180px] left-1/2 -translate-x-1/2 w-11/12 h-[1400px] rounded-full bg-gradient-to-b from-[#3d4d75] via-[#3d4d75] to-[#0e101a] z-[-1] border-l-purple-950 blur-[2px] opacity-100" />
      <div className="absolute top-[-65px] left-1/2 -translate-x-1/2 w-96 h-[300px] rounded-full bg-gradient-to-b from-[#082e54] via-[#0b2c51] to-[#0e2b4e] z-[-2] blur-3xl opacity-90" />

      <div className="flex z-[1] pt-5 justify-between px-12">
        <div className="text-white text-3xl font-bold">ztype</div>
        <div className="flex justify-between md:gap-10 lg:gap-16 xl:gap-28">
          <button className="text-white">Home</button>
          <ButtonBackground name="Leader Board" />
          <button className="text-white">Reward</button>
        </div>
        <div>
          <img className="w-fit h-12" src="amfoss-logo.png" alt="Description" />
        </div>
      </div>

      <div className="flex justify-center gap-24 items-end mt-48">
        {(() => {
          const top3 = users.slice(0, 3);

          // Sort them so: middle = rank 1, left = rank 2, right = rank 3
          const arranged = [
            top3.find((u) => u.rank === 2),
            top3.find((u) => u.rank === 1),
            top3.find((u) => u.rank === 3),
          ];

          return arranged.map((user, idx) => {
            if (!user) return null;
            return (
              <div
                key={user.rank}
                className={`
          ${idx === 1 ? "mb-6 z-10 scale-105" : "mb-0"} 
          transition-transform duration-300
        `}
              >
                <LeaderboardCard
                  name={user.username}
                  score={user.score}
                  level={user.level}
                  rank={user.rank}
                />
              </div>
            );
          });
        })()}
      </div>

      {/* Rank 4 & 5 Table */}
      <main className="max-w-5xl mx-auto px-4 mt-10">
        <table className="w-full text-sm text-left border-separate border-spacing-y-4">
          <thead className="text-gray-400">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">User name</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Level</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(3, 5).map((user, idx) => (
              <tr
                key={idx}
                className="bg-gradient-to-r from-[#1e2434] to-[#151a27] hover:from-[#25304a] hover:to-[#1a1f2f] transition duration-300 shadow-md rounded-xl overflow-hidden"
              >
                <td className="py-4 px-6 font-bold text-white">{user.rank}</td>
                <td className="py-4 px-6 flex items-center gap-3 text-white">
                  <div className="bg-[#2a3249] p-2 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-semibold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="font-semibold">{user.username}</div>
                </td>
                <td className="py-4 px-6 font-semibold text-cyan-300">
                  {user.score}
                </td>
                <td className="py-4 px-6">
                  <div className="bg-[#1d2a40] px-3 py-1 rounded-lg text-sm text-white w-fit">
                    Lv. {user.level}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
