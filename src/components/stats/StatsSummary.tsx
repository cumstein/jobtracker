
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, PhoneCall, Handshake, ThumbsDown } from "lucide-react";

const STATUS_CONFIG = {
  Applied: {
    icon: <Briefcase className="text-blue-500" size={24} />,
    color: "text-blue-500",
  },
  Interview: {
    icon: <PhoneCall className="text-yellow-500" size={24} />,
    color: "text-yellow-500",
  },
  Offer: {
    icon: <Handshake className="text-green-500" size={24} />,
    color: "text-green-500",
  },
  Rejected: {
    icon: <ThumbsDown className="text-red-500" size={24} />,
    color: "text-red-500",
  },
};

export function StatsSummary({
  stats,
}: {
  stats: Record<"Applied" | "Interview" | "Offer" | "Rejected", number>;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(stats).map(([status, count]) => {
        const typedStatus = status as keyof typeof STATUS_CONFIG;
        const { icon, color } = STATUS_CONFIG[typedStatus];
        return (
          <Card key={status}>
            <CardContent className="flex flex-col items-center justify-center py-6 gap-2">
              {icon}
              <p className="text-sm font-medium">{status}</p>
              <p className={`text-xl font-bold ${color}`}>{count}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}