interface LeaderboardCardProps {
  name: string
  score: number
  level: number
  rank: number
}

export default function LeaderboardCard({ name, score, level, rank }: LeaderboardCardProps) {
  // Choose rank color based on rank
  const rankColors = {
    1: "bg-yellow-400 text-black",
    2: "bg-gray-400 text-black",
    3: "bg-amber-600 text-white",
  }

  const rankLabel = rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"

  return (
    <div className="relative w-[260px] h-[280px] bg-gradient-to-b from-[#1e2434] to-[#151a27] rounded-2xl shadow-xl flex flex-col items-center justify-start pt-10">

      {/* Rank Badge */}
      <div className={`absolute top-[-20px] left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold shadow-md ${rankColors[rank as 1 | 2 | 3]}`}>
        #{rankLabel}
      </div>

      {/* Username */}
      <h2 className="text-white font-bold text-lg mb-2">{name}</h2>

      {/* Pedestal Box */}
      <div className="w-[85%] bg-[#1c2231] rounded-xl px-4 py-5 mt-4 text-center shadow-md border border-[#2d3344]">
        {/* Level Info */}
        <div className="text-gray-300 text-sm mb-2">
          Level <span className="text-white font-semibold">{level}</span>
        </div>

        <div className="border-t border-gray-700 my-3" />

        {/* Score */}
        <div className="text-blue-400 font-bold text-2xl">{score.toLocaleString()}</div>
        <div className="text-sm text-gray-400 mt-1">Score</div>
      </div>
    </div>
  )
}