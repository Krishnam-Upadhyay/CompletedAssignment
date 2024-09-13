import React, { useRef, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text, Dimensions, Animated } from 'react-native';

interface CustomCarouselProps {
  images: string[];
}

const { width } = Dimensions.get('window');

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ animated: true, index: prevIndex });
  };

  const renderItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const onViewRef = useRef((viewableItems: any) => {
    setCurrentIndex(viewableItems.changed[0].index);
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Text style={styles.buttonText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>›</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  navigation: {
    position: 'absolute',
    width: '100%',
    top: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  inactiveIndicator: {
    backgroundColor: '#888',
  },
});

export default CustomCarousel;
