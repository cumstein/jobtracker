import { Card, CardContent } from "@/components/ui/card";
import { motivationalQuotes } from "@/lib/utils/motivationalQuotes";


export function MotivationalCard() {
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
      <CardContent className="py-6 text-center">
        <p className="text-lg font-semibold italic">&quot;{quote}&quot;</p>
      </CardContent>
    </Card>
  );
}