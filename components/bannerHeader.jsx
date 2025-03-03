import React, { useRef, useState, useEffect } from 'react';
import { FlatList, View, Text, Image, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window'); // Get screen width

const BannerHeader = () => {
  const data = [    {
    key: 1,
    title: "Fresh Impact",
    image: require("../assets/images/1.jpg"),
  },
  {
    key: 2,
    title: "Oil of Promotion",
    image: require("../assets/images/2.jpg"),
  },
  {
    key: 3,
    title: "Cross Over Service",
    image: require("../assets/images/3.jpg"),
  },];
  

  const flatListRef = useRef(null); // Reference to FlatList
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.length) {
        nextIndex = 0; // Loop back to the first item
      }

      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image } style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
      onScrollToIndexFailed={(info) => {
        // Handle scroll failures when the index is out of range
        flatListRef.current.scrollToIndex({ index: info.index, animated: true });
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: width,
    height: 200,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    bottom: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
    backgroundColor : "#100303ab",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    textTransform: "capitalize",
    textAlign: "center"
  },
});

export default BannerHeader;
