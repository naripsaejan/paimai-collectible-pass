export default function SignIn() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">วอเล็ท</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* Wallet Status */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">กระเป๋า Bitkub NEXT</h3>
              <p className="text-sm opacity-90">เชื่อมแล้ว</p>
            </div>
            <div className="text-2xl">👛</div>
          </div>
        </div>

        {/* Collected Stamps */}
        <div className="space-y-4">
          <h3 className="font-semibold">สแตมป์ที่เก็บแล้ว</h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <span className="text-2xl">📭</span>
            </div>
            <p className="text-sm text-gray-500">ยังไม่มีสแตมป์</p>
            <p className="text-xs text-gray-400 mt-1">
              ไปเก็บสแตมป์จากร้านค้าก่อน
            </p>
          </div>
        </div>

        {/* NFT Collection */}
        <div className="space-y-4">
          <h3 className="font-semibold">NFT Collection</h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <p className="text-sm text-gray-500">ยังไม่มี NFT</p>
            <p className="text-xs text-gray-400 mt-1">
              สแกน QR Code เพื่อรับ NFT
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
            ดูใน Bitkub NEXT
          </button>
          <button className="w-full bg-gray-100 text-gray-600 py-3 rounded-lg">
            เปลี่ยนกระเป๋า
          </button>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-sm mb-2">เกี่ยวกับ NFT</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• NFT จะถูกส่งไปยังกระเป๋า Bitkub NEXT</li>
            <li>• สามารถดูได้ในแอป Bitkub NEXT</li>
            <li>• NFT เป็นของจริงบน blockchain</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
