import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

interface CustomCarouselProps {
  images: string[];
}

const { width } = Dimensions.get('window');

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index: number) => {
    Animated.spring(scrollX, {
      toValue: -index * width,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ translateX: scrollX }] }]}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </Animated.View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handlePrevious} style={styles.button}>
          <Text style={styles.buttonText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  imageContainer: {
    flexDirection: 'row',
    width: width * 3, // For a maximum of 3 images in view at a time
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
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default CustomCarousel;
