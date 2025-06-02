// src/pages/ShopPage.tsx
import { useEffect, useState } from "react";
import ShopCard from "@/components/ShopCard";


export default function ShopPage() {
  const [userPoints, setUserPoints] = useState(0);
  const [ownedItems, setOwnedItems] = useState<number[]>([]);
  const [shopItems, setShopItems] = useState<
    { id: number; name: string; description: string; price: number, cost: number, type: string }[]
  >([]);
  useEffect(() =>{
    fetch('http://localhost:3000/points/1')
    .then((res) => res.json())
    .then((data) => {
      setUserPoints(data.currentPoints)
    })
    .catch((err) => console.error('Failed to fetch user points:', err));
  }, [])
  useEffect(() => {
    fetch('http://localhost:3000/shop')
      .then((res) => res.json())
      .then((data) => {
        setShopItems(data);
      })
      .catch((err) => console.error('Failed to fetch shop items:', err));
  }, [])
  const handleBuy = (itemId: number, cost: number) => {
    if (userPoints >= cost && !ownedItems.includes(itemId)) {
      setUserPoints((prev) => prev - cost);
      setOwnedItems((prev) => [...prev, itemId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">🛍 Mentora Shop</h1>
        <div className="text-center mb-12 text-lg">
          Your Points: <span className="text-[#10B981] font-bold">{userPoints}</span>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shopItems.map((item) => {
            const isOwned = ownedItems.includes(item.id);
            const canAfford = userPoints >= item.cost;

            return (
              <ShopCard
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                description={item.description}
                cost={item.cost}
                owned={isOwned}
                canAfford={canAfford}
                onBuy={() => handleBuy(item.id, item.cost)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
