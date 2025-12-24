import { Dimensions, View, StyleSheet, Text, TouchableOpacity, ImageBackground, Animated, Easing } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router";
import ButtonAside from "./ButtonAside";
import { useEffect, useRef } from 'react';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window')

const MenuAside = ({ setIsVisible }) => {
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: screenWidth / 2, 
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      setIsVisible(false);
    });
  };

  return (
    <Animated.View style={[styles.fullContainer, { left: slideAnim }]}>
      <ImageBackground
        style={styles.imageBg}
        source={require('@/assets/images/BG-aside.png')}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>

          <View style={styles.buttonsContainer}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={handleClose} style={styles.closeContainer}>
                <Text style={styles.closeBtn}>X</Text>
              </TouchableOpacity>
            </View>
            <ButtonAside text={'Home'} onPress={() => router.replace('/startScreen')} />
            <ButtonAside text={'Statistics'} onPress={() => router.replace('/statisticsScreen')} />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
};

export default MenuAside;

const styles = StyleSheet.create({
  fullContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: screenWidth / 2,
    height: screenHeight,
    zIndex: 10,
  },
  imageBg: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  topBar: {
    width: '60%',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  closeBtn: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 12,
  },
});

