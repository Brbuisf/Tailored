import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const OutfitSwipe = ({ outfit, onSwipe }) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSwipe = (direction: 'left' | 'right') => {
    // Send feedback to ML model
    trackOutfitFeedback(outfit.id, direction === 'right');
    onSwipe(direction);
  };

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <OutfitPreview outfit={outfit} />
      <SwipeButtons onLike={() => handleSwipe('right')} onDislike={() => handleSwipe('left')} />
    </Animated.View>
  );
};
