// src/components/ShopCard.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShopCardProps {
  id: number;
  name: string;
  type: string;
  description: string;
  cost: number;
  owned: boolean;
  canAfford: boolean;
  onBuy: () => void;
}

export default function ShopCard({
  name,
  description,
  type,
  cost,
  owned,
  canAfford,
  onBuy,
}: ShopCardProps) {
  return (
    <Card
      className={`bg-[#1E293B] border ${
        owned ? "border-[#10B981]" : "border-[#334155]"
      } shadow-lg`}
    >
      <CardHeader>
        <CardTitle className="text-xl text-white">{name}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-[#F59E0B] font-semibold">{cost} pts</span>
          <Button
            disabled={owned || !canAfford}
            onClick={onBuy}
            className={`${
              owned
                ? "bg-[#10B981]/20 text-[#10B981] cursor-not-allowed"
                : canAfford
                ? "bg-[#3B82F6] hover:bg-[#2563EB]"
                : "bg-[#334155] text-gray-400 cursor-not-allowed"
            }`}
          >
            {owned ? "Owned" : "Buy"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
