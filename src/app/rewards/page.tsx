export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">แลกของรางวัล</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* Coming Soon */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto flex items-center justify-center">
            <span className="text-3xl">🎁</span>
          </div>
          <h2 className="text-lg font-semibold">เร็วๆ นี้</h2>
          <p className="text-sm text-gray-600">
            ระบบแลกของรางวัลกำลังจะมาเร็วๆ นี้
          </p>
        </div>

        {/* Placeholder Rewards */}
        <div className="space-y-4">
          <h3 className="font-semibold">รางวัลที่จะมี</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "ส่วนลด 10%", points: "5 สแตมป์", icon: "🏷️" },
              { name: "ของที่ระลึก", points: "10 สแตมป์", icon: "🎁" },
              { name: "ส่วนลด 20%", points: "15 สแตมป์", icon: "💳" },
              { name: "รางวัลพิเศษ", points: "30 สแตมป์", icon: "⭐" },
            ].map((reward, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{reward.icon}</div>
                <h4 className="font-semibold text-sm">{reward.name}</h4>
                <p className="text-xs text-gray-500">{reward.points}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-2">วิธีการแลกรางวัล</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• เก็บสแตมป์จากร้านค้า 30 แห่ง</li>
            <li>• ใช้สแตมป์แลกรางวัลต่างๆ</li>
            <li>• รางวัลจะส่งไปยังที่อยู่ของคุณ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}