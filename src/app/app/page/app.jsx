import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const games = [
  { id: 1, home: "Toronto Maple Leafs", away: "Boston Bruins" },
  { id: 2, home: "New York Rangers", away: "New Jersey Devils" },
  { id: 3, home: "Edmonton Oilers", away: "Calgary Flames" },
];

export default function TwoPlayerHockeyPickEm() {
  const [picks, setPicks] = useState({ p1: {}, p2: {} });
  const [turn, setTurn] = useState("p1");

  const makePick = (gameId, team) => {
    setPicks({
      ...picks,
      [turn]: { ...picks[turn], [gameId]: team },
    });
  };

  const nextTurn = () => {
    setTurn(turn === "p1" ? "p2" : "p1");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🏒 Two Player Hockey Pick ’Em</h1>
      <p className="mb-6">Current Turn: {turn === "p1" ? "Player 1" : "Player 2"}</p>

      <div className="grid gap-4 md:grid-cols-3">
        {games.map((game) => (
          <Card key={game.id} className="bg-zinc-900">
            <CardContent className="p-4 space-y-3">
              <div className="text-center font-semibold">
                {game.away} @ {game.home}
              </div>
              <div className="flex justify-between gap-2">
                <Button
                  className="w-full"
                  onClick={() => makePick(game.id, game.away)}
                >
                  {game.away}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => makePick(game.id, game.home)}
                >
                  {game.home}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <Button onClick={nextTurn}>Next Player</Button>
        <Button variant="outline" onClick={() => console.log(picks)}>
          View Picks (Console)
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Summary</h2>
        <pre className="bg-zinc-800 p-4 rounded-xl text-sm">
{JSON.stringify(picks, null, 2)}
        </pre>
      </div>
    </div>
  );
}
