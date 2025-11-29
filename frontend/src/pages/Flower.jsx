import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Flower as FlowerIcon, 
  User, 
  Heart, 
  Send, 
  Users, 
  Sparkles,
  ArrowLeft,
  ShoppingCart,
  Star,
  Gem 
} from "lucide-react";

const FlowerPage = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showFlowerShop, setShowFlowerShop] = useState(false);

  // Sample friends list
  const friends = [
    { id: 1, name: "Sarah Kimani", avatar: "🧡", online: true },
    { id: 2, name: "John Mwangi", avatar: "💙", online: false },
    { id: 3, name: "Aisha Hassan", avatar: "💜", online: true },
    { id: 4, name: "David Otieno", avatar: "🌸", online: true },
    { id: 5, name: "Mary Wanjiku", avatar: "🌺", online: false }
  ];

  // Flowers with meanings and prices 
  const flowers = [
    { 
      id: 1, 
      emoji: "🌸", 
      color: "from-pink-400 to-rose-500", 
      name: "Cherry Blossom", 
      meaning: "New beginnings & renewal",
      price: 20,
      owned: true,
      rarity: "Common"
    },
    { 
      id: 2, 
      emoji: "🌺", 
      color: "from-red-400 to-pink-500", 
      name: "Hibiscus", 
      meaning: "Delicate beauty",
      price: 30,
      owned: true,
      rarity: "Common"
    },
    { 
      id: 3, 
      emoji: "🌻", 
      color: "from-yellow-400 to-orange-500", 
      name: "Sunflower", 
      meaning: "Adoration & loyalty",
      price: 50,
      owned: false,
      rarity: "Rare"
    },
    { 
      id: 4, 
      emoji: "🌹", 
      color: "from-rose-500 to-red-500", 
      name: "Rose", 
      meaning: "Deep love & passion",
      price: 20,  // ✅ Changed to 20 KSH
      owned: false,
      rarity: "Common"  // Changed to Common since affordable
    },
    { 
      id: 5, 
      emoji: "🪷", 
      color: "from-purple-400 to-indigo-500", 
      name: "Lotus", 
      meaning: "Spiritual growth",
      price: 120,
      owned: false,
      rarity: "Legendary"
    },
    { 
      id: 6, 
      emoji: "🌷", 
      color: "from-orange-400 to-red-500", 
      name: "Tulip", 
      meaning: "Perfect love",
      price: 40,
      owned: true,
      rarity: "Common"
    }
  ];

  const balance = 250; // Sample user balance in KSH

  const handleBuyFlower = (flower) => {
    if (balance >= flower.price) {
      alert(`✅ Purchased ${flower.name} for ${flower.price} KSH!\nYour flower garden has grown! 🌸`);
      // Update flower ownership (in real app, call API)
    } else {
      alert(`💸 Need ${flower.price - balance} more KSH to buy ${flower.name}`);
    }
  };

  const handleSendFlower = async () => {
    if (!selectedFriend || !message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      alert(`🌸 ${selectedFriend.name} received your ${flowers.find(f => f.emoji === selectedFriend?.flowerEmoji)?.name || 'beautiful flower'}!\n"${message}"`);
      setIsSending(false);
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-30 to-rose-40 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-3 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                Send a Flower ✨
              </h1>
              <p className="text-gray-600">Brighten someone's day from your flower garden</p>
            </div>
          </div>
          
          {/* Balance & Shop */}
          <div className="flex items-center gap-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/50">
            <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <Gem className="w-4 h-4 text-yellow-500" />
              {balance.toLocaleString()} KSH
            </div>
            <button
              onClick={() => setShowFlowerShop(!showFlowerShop)}
              className="p-2 hover:bg-pink-100 rounded-xl transition-colors flex items-center gap-1 text-pink-600 hover:text-pink-700"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Shop</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Friends Panel */}
          <div className="space-y-4">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-pink-500" />
                Choose Friend
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    className={`w-full p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                      selectedFriend?.id === friend.id
                        ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xl scale-105 ring-4 ring-pink-200/50"
                        : "bg-white hover:bg-pink-50 hover:shadow-xl border border-gray-100 hover:border-pink-200"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-2xl font-bold shadow-lg">
                      {friend.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{friend.name}</div>
                      <div className={`text-xs ${
                        friend.online ? "text-green-500" : "text-gray-400"
                      }`}>
                        {friend.online ? "Online" : "Offline"}
                      </div>
                    </div>
                    {friend.online && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flower Garden & Shop */}
          <div className="space-y-6">
            {/* Your Flower Garden Preview */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                Your Flower Garden ({flowers.filter(f => f.owned).length}/6)
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {flowers.filter(f => f.owned).slice(0, 6).map((flower) => (
                  <div key={flower.id} className="group relative p-3 rounded-xl bg-white shadow-md hover:shadow-xl transition-all cursor-pointer" onClick={() => selectedFriend && setSelectedFriend({...selectedFriend, flowerEmoji: flower.emoji})}>
                    <div className={`text-3xl mb-1 mx-auto ${flower.color.replace('from-', 'bg-gradient-to-br from-')} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                      {flower.emoji}
                    </div>
                    <div className="text-xs text-center text-gray-600 group-hover:text-gray-800">{flower.name}</div>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xxs px-1 py-0.5 rounded-full shadow-lg">
                      {flower.rarity}
                    </div>
                  </div>
                ))}
              </div>
              {flowers.filter(f => !f.owned).length > 0 && (
                <button
                  onClick={() => setShowFlowerShop(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-2 px-4 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Buy More Flowers 🌱
                </button>
              )}
            </div>

            {/* Flower Shop Modal */}
            {showFlowerShop && (
              <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-pink-100 sticky top-6 z-10">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Flower Shop 🌸
                  </h4>
                  <button onClick={() => setShowFlowerShop(false)} className="p-2 hover:bg-pink-100 rounded-xl">
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {flowers.filter(f => !f.owned).map((flower) => (
                    <div key={flower.id} className="group bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-300 hover:shadow-2xl transition-all cursor-pointer hover:scale-[1.02]">
                      <div className={`text-4xl mb-3 mx-auto ${flower.color.replace('from-', 'bg-gradient-to-br from-')} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                        {flower.emoji}
                      </div>
                      <div className="text-sm font-bold text-gray-800 mb-1 text-center">{flower.name}</div>
                      <p className="text-xs text-gray-500 mb-3 text-center leading-tight">{flower.meaning}</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                          <Gem className="w-4 h-4" />
                          {flower.price} KSH
                        </div>
                        <div className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-xs font-semibold text-purple-700 rounded-full">
                          {flower.rarity}
                        </div>
                      </div>
                      <button
                        onClick={() => handleBuyFlower(flower)}
                        disabled={balance < flower.price}
                        className={`w-full py-2 px-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                          balance >= flower.price
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:scale-[1.02]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Starting from just <span className="font-bold text-pink-600">20 KSH</span>
                </p>
              </div>
            )}

            {/* Message & Send Panel */}
            {selectedFriend ? (
              <>
                <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-3xl p-6 border border-pink-200/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-3xl font-bold shadow-2xl">
                      {selectedFriend.avatar}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">Send to {selectedFriend.name}</h4>
                      <p className="text-green-600 font-medium flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Choose flower from your garden
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    Add message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write something sweet... 'Sending you cherry blossoms for your new beginnings!'"
                    className="w-full p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-100/50 resize-vertical min-h-[120px] text-lg placeholder-gray-400 transition-all duration-300"
                    maxLength={280}
                  />
                  <div className="text-right mt-2 text-sm text-gray-500">
                    {message.length}/280
                  </div>
                </div>

                <button
                  onClick={handleSendFlower}
                  disabled={!message.trim() || isSending}
                  className={`w-full py-5 px-6 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
                    message.trim() && !isSending
                      ? "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 hover:shadow-3xl hover:scale-[1.02]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSending ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Send Flower 🌸
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 backdrop-blur-xl rounded-3xl p-12 text-center border-2 border-dashed border-pink-200/50 h-80 flex flex-col items-center justify-center">
                <FlowerIcon className="w-24 h-24 text-pink-300 mx-auto mb-4 opacity-75" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Select a friend</h3>
                <p className="text-gray-500">Choose someone special from your garden</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerPage;
