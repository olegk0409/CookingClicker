import { View, Image, StyleSheet, Animated } from "react-native"
import React, { useEffect, useRef } from 'react';


const ProgressinPanel = ({ barWidth }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: barWidth > 0 ? barWidth : 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [barWidth]);

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });


  return (
    <View style={styles.container}>
      <View style={styles.externalBar}>
        <Animated.View
            style={{
              backgroundColor: '#3DC55B',
              borderRadius: 7,
              flex: 1,
              width: interpolatedWidth,
            }}
          />
      </View>

      <Image 
        source={require("@/assets/images/arrow-up.png")}
        style={styles.img}
      />
    </View>
  )
}

export default ProgressinPanel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    gap: 7,
  },
  externalBar: {
    backgroundColor: '#fff',
    height: 14,
    flex: 1,
    borderRadius: 7,
  },
  img: {
    width: 17,
    height: 27,
  }
})
