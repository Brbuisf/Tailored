// components/ShoppingRecommendations.jsx
import React, { useEffect, useState } from 'react';
import { RecommendationEngine } from '../services/recommendationEngine';

const ShoppingRecommendations = ({ wardrobe, preferences, swipeHistory }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const loadRecommendations = async () => {
      const engine = new RecommendationEngine();
      
      // 1. Get personalized recommendations
      const personalRecs = await engine.getPersonalRecommendations(
        wardrobe,
        preferences,
        swipeHistory
      );
      
      // 2. Get trending items
      const trendRecs = await engine.getTrendingItems(preferences.location);
      
      setRecommendations([...personalRecs, ...trendRecs]);
    };
    
    loadRecommendations();
  }, [wardrobe, preferences]);

  return (
    <div className="shopping-recommendations">
      <h3>Complete Your Look</h3>
      <div className="recommendation-grid">
        {recommendations.map((item, index) => (
          <RecommendationCard 
            key={index}
            item={item}
            onPurchase={() => handlePurchase(item)}
          />
        ))}
      </div>
    </div>
  );
};
