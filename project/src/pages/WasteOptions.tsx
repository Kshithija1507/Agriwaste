import React from "react";
import WasteToProduct from "../components/dashboard/WasteToProduct";

const WasteOptions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Waste Options</h1>
          <p className="text-gray-600 mt-2">
            Buy, sell, or barter agricultural waste with the community
          </p>
        </div>
        <WasteToProduct />
      </div>
    </div>
  );
};

export default WasteOptions;
