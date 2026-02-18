import React, { useState, useEffect } from 'react';
import { TrendingUp, Leaf, Recycle, Award, Calendar } from 'lucide-react';

interface ImpactData {
  wasteReused: number;
  co2Saved: number;
  itemsProcessed: number;
  monthlyGoal: number;
}

const ImpactTracker: React.FC = () => {
  const [impactData, setImpactData] = useState<ImpactData>({
    wasteReused: 0,
    co2Saved: 0,
    itemsProcessed: 0,
    monthlyGoal: 20
  });

  const [currentMonth] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));

  useEffect(() => {
    // Simulate loading impact data
    const timer = setTimeout(() => {
      setImpactData({
        wasteReused: 125.5,
        co2Saved: 67.8,
        itemsProcessed: 15,
        monthlyGoal: 20
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const progressPercentage = Math.min((impactData.itemsProcessed / impactData.monthlyGoal) * 100, 100);
  const wasteReductionPercentage = Math.min((impactData.wasteReused / 200) * 100, 100);

  const achievements = [
    { title: 'First Steps', description: 'Processed your first waste item', unlocked: true },
    { title: 'Eco Warrior', description: 'Saved 50kg of CO2 emissions', unlocked: true },
    { title: 'Waste Reducer', description: 'Reused 100kg of waste', unlocked: true },
    { title: 'Community Helper', description: 'Helped 5 community members', unlocked: false },
    { title: 'Green Champion', description: 'Achieved monthly goal 3 times', unlocked: false },
    { title: 'Sustainability Expert', description: 'Processed 50 different waste items', unlocked: false }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 mr-2 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900">Impact Tracker</h2>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Waste Reused</p>
              <p className="text-2xl font-bold text-green-900">{impactData.wasteReused.toFixed(1)} kg</p>
            </div>
            <Recycle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">CO2 Saved</p>
              <p className="text-2xl font-bold text-blue-900">{impactData.co2Saved.toFixed(1)} kg</p>
            </div>
            <Leaf className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Items Processed</p>
              <p className="text-2xl font-bold text-purple-900">{impactData.itemsProcessed}</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Goal Progress</span>
            <span className="text-sm text-gray-500">{impactData.itemsProcessed}/{impactData.monthlyGoal} items</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progressPercentage.toFixed(0)}% complete for {currentMonth}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Waste Reduction Impact</span>
            <span className="text-sm text-gray-500">{wasteReductionPercentage.toFixed(0)}% of target</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${wasteReductionPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">You've made a significant environmental impact!</p>
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-green-600" />
          This Month's Impact
        </h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Prevented {impactData.co2Saved.toFixed(1)} kg of CO2 from entering the atmosphere</p>
          <p>• Diverted {impactData.wasteReused.toFixed(1)} kg of waste from landfills</p>
          <p>• Equivalent to planting {Math.floor(impactData.co2Saved / 22)} trees</p>
          <p>• Saved approximately {(impactData.wasteReused * 0.5).toFixed(1)} liters of water</p>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-3 ${
                  achievement.unlocked ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <div>
                  <h4 className={`font-medium ${
                    achievement.unlocked ? 'text-green-900' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-green-700' : 'text-gray-400'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactTracker;