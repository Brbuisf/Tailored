// components/OutfitGenerator.jsx
import React, { useState, useEffect } from 'react';
import { Swipeable } from 'react-swipeable';

const OutfitGenerator = ({ wardrobe }) => {
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [preferences, setPreferences] = useState({});
  const [swipeHistory, setSwipeHistory] = useState([]);

  useEffect(() => {
    generateNewOutfit();
  }, [wardrobe, preferences]);

  const generateNewOutfit = () => {
    // AI-based outfit generation algorithm
    const outfit = {
      top: findMatchingItem('top', preferences),
      bottom: findMatchingItem('bottom', preferences),
      shoes: findMatchingItem('shoes', preferences),
      accessories: findMatchingItems('accessories', 2, preferences),
      rating: 0,
      weatherCompatibility: checkWeatherCompatibility()
    };
    setCurrentOutfit(outfit);
  };

  const handleSwipe = (direction) => {
    const updatedOutfit = { ...currentOutfit, rating: direction === 'right' ? 1 : -1 };
    setSwipeHistory([...swipeHistory, updatedOutfit]);
    generateNewOutfit();
    // Send feedback to ML model for improvement
    updateRecommendationModel(updatedOutfit);
  };

  return (
    <div className="outfit-generator">
      <Swipeable
        onSwipedLeft={() => handleSwipe('left')}
        onSwipedRight={() => handleSwipe('right')}
      >
        {currentOutfit && (
          <div className="outfit-card">
            <div className="outfit-items">
              <ClothingItem item={currentOutfit.top} />
              <ClothingItem item={currentOutfit.bottom} />
              {/* ... other items */}
            </div>
            <div className="outfit-actions">
              <button onClick={() => handleSwipe('left')}>👎</button>
              <button onClick={() => handleSwipe('right')}>👍</button>
            </div>
          </div>
        )}
      </Swipeable>
    </div>
  );
};

import tensorflow as tf
from tensorflow.keras.layers import Input, LSTM, Dense, Concatenate

class OutfitScorer:
    def __init__(self):
        self.model = self.build_siamese_model()
    
    def build_siamese_model(self):
        # Input for each clothing item (embeddings)
        input_top = Input(shape=(128,))
        input_bottom = Input(shape=(128,))
        input_shoes = Input(shape=(128,))
        
        # Merge and score compatibility
        merged = Concatenate()([input_top, input_bottom, input_shoes])
        score = Dense(1, activation='sigmoid')(merged)
        
        return tf.keras.Model(inputs=[input_top, input_bottom, input_shoes], outputs=score)
