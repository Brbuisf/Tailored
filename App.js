// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { ImageProcessor } from './components/ImageProcessor';
import OutfitGenerator from './components/OutfitGenerator';
import ShoppingRecommendations from './components/ShoppingRecommendations';

export default function App() {
  const [wardrobe, setWardrobe] = useState([]);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [preferences, setPreferences] = useState({
    style: 'casual',
    favoriteColors: ['blue', 'black'],
    budget: 'medium'
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const addClothingItem = async (imageUri) => {
    const processor = new ImageProcessor();
    await processor.loadModels();
    
    const processedItem = await processor.processImage(imageUri);
    
    setWardrobe([...wardrobe, {
      ...processedItem,
      id: Date.now().toString()
    }]);
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission ? (
        <>
          <Camera 
            style={styles.camera}
            onPictureTaken={addClothingItem}
          />
          <OutfitGenerator 
            wardrobe={wardrobe}
            preferences={preferences}
          />
          <ShoppingRecommendations 
            wardrobe={wardrobe}
            preferences={preferences}
          />
        </>
      ) : (
        <Text>Please enable camera permissions</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 0.4,
  },
});
