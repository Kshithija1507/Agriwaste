import React, { useState, useEffect } from "react";
import axios from "axios";
import { DollarSign, ShoppingCart, Package, Plus } from "lucide-react";

// Define the type for items
interface WasteItem {
  _id: string;
  title: string;
  description: string;
  category: "sell" | "buy";
  price?: number;
  location: string;
  unit: string;
  quantity: number;
  type: string;
  createdAt: string;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming you saved it in localStorage after login
  if (token) {
    console.log("🔑 Sending token:", token); // DEBUG
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("⚠️ No token found in localStorage");
  }
  return config;
});


const WasteToProduct: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sell" | "buy">("sell");

  // Sell form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    unit: "",
    quantity: "",
    type: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Buy items state
  const [items, setItems] = useState<WasteItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch buy items
  useEffect(() => {
    if (activeTab !== "buy") return;

    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/waste?category=buy`);
        setItems(res.data || []);
      } catch (err: any) {
        setError(err.response?.data?.error || err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [activeTab]);

  // Add Sell item
  const handleAddItem = async () => {
    if (
      !newItem.title ||
      !newItem.description ||
      !newItem.location ||
      !newItem.unit ||
      !newItem.quantity ||
      !newItem.type
    )
      return;

    const payload = {
      title: newItem.title,
      description: newItem.description,
      category: "sell",
      price: newItem.price ? Number(newItem.price) : undefined,
      location: newItem.location,
      unit: newItem.unit,
      quantity: Number(newItem.quantity),
      type: newItem.type,
    };

    try {
      await api.post("/waste", payload);
      setShowAddForm(false);
      setNewItem({
        title: "",
        description: "",
        price: "",
        location: "",
        unit: "",
        quantity: "",
        type: "",
      });
    } catch (err: any) {
      setError("Could not add item");
    }
  };
  const handleBuy = async (productId: string, quantity: number) => {
  try {
    const token = localStorage.getItem("token"); // token saved at login
    if (!token) {
      alert("⚠️ No token found. Please log in first.");
      return;
    }

    const res = await api.post(
      "/orders",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ attach token
        },
      }
    );

    alert("✅ Order placed successfully!");
    console.log("📝 Order response:", res.data);
  } catch (err: any) {
    console.error("❌ Error placing order:", err.response?.data || err.message);
    alert("❌ Error placing order: " + (err.response?.data?.message || err.message));
  }
};

  const tabs = [
    { id: "sell", label: "Sell", icon: DollarSign },
    { id: "buy", label: "Buy", icon: ShoppingCart },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Package className="h-6 w-6 mr-2 text-green-600" />
          Waste-to-Product Marketplace
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "sell" | "buy")}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sell Section */}
      {activeTab === "sell" && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </button>
          </div>

          {showAddForm && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Add New Sell Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newItem.location}
                  onChange={(e) =>
                    setNewItem({ ...newItem, location: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg md:col-span-2"
                  rows={2}
                />
                <input
                  type="number"
                  placeholder="Price (optional)"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., kg, liters)"
                  value={newItem.unit}
                  onChange={(e) =>
                    setNewItem({ ...newItem, unit: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Type of Waste (e.g., Plastic, Metal)"
                  value={newItem.type}
                  onChange={(e) =>
                    setNewItem({ ...newItem, type: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg md:col-span-2"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Buy Section */}
      {activeTab === "buy" && (
        <div>
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items available for buying.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    {item.price && (
                      <span className="text-lg font-bold text-green-600">
                        ₹{item.price}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <div className="text-sm text-gray-500 mb-1">
                    {item.quantity} {item.unit} of {item.type}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>{item.location}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* ✅ Buy Button */}
                  <button
                    onClick={() => handleBuy(item._id, 1)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WasteToProduct;
