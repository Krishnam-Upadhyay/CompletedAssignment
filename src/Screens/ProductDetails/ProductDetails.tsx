import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CustomCarousel from './CustomerCarousal';



interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string [];
  rating: number;
  brand: string;
  stock: number;
  tags: string[];
}

const ProductDetails: React.FC<any> = ({ route, navigation }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { productId } = route.params;
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [route.params]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.center} />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  if (!product) return null;

  return (
    <ScrollView style={styles.container}>
        <CustomCarousel images={product.images} />
     
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Brand:</Text>
          <Text style={styles.infoText}>{product.brand}</Text>
          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={styles.infoText}>{product.rating} / 5</Text>
          <Text style={styles.infoTitle}>In Stock:</Text>
          <Text style={styles.infoText}>{product.stock}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {product.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"#FFFFFF",
  },
  price: {
    fontSize: 20,
    color: '#2a9d8f',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color:"#FFFFFF",
  },
  infoContainer: {
    marginBottom: 15,

  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color:"#FFFFFF",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color:"#FFFFFF",
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e9c46a',
    color: '#000',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#264653',
    padding: 15,
    borderRadius: 5,
    margin: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetails;
