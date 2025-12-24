import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "./components/Button";
import StatusView from "./components/StatusView";
import { Chicken } from "@/utills/types";
import AsyncStorage from "@react-native-async-storage/async-storage";


import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import MenuAside from "./components/MenuAside";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const chickenStatuses = Object.values(Chicken);

const CookScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfCoins, setNumberOfCoins] = useState(0);
  const [feedingNumber, setFeedingNumber] = useState(0);
  const [chickenStatus, setChickenStatus] = useState(Chicken.adult)
  const [chickenDimensions, setChickenDimensions] = useState({ width: 221, height: 295 })
  const [isChickenReady, setIsChickenReady] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true)
  
  
  const router = useRouter();

  const fireScale = useSharedValue(0);
  const fireRef = useRef<LottieView>(null);

  const fireStyle = useAnimatedStyle(() => {
    const scale = fireScale.value;
    const offsetY = (scale - 1) * 50;
  
    return {
      transform: [
        { translateY: -offsetY },
        { scale: scale },
      ],
    };
  });

  const getChickenImg = () => {
    if (chickenStatus === Chicken.adult) {
      return require("@/assets/images/chicken/adult.png")
    }
    if (chickenStatus === Chicken.fried) {
      return require("@/assets/images/chicken/fried.png")
    }
  }

  const getChickenDimensions = () => {
    let width = 221;
    let height = 295;

    if (chickenStatus === Chicken.adult) {
      width = 221;
      height = 295;
    }
    if (chickenStatus === Chicken.fried) {
      width = 224;
      height = 212;
    }

    setChickenDimensions({width, height})
  }

  const onPressHandler = () => {
    const newValue = feedingNumber + 1;
    setFeedingNumber(newValue);

    fireRef.current?.play();

    const scaleFactor = 1 + newValue * 0.2;
    fireScale.value = withTiming(scaleFactor, { duration: 300 });
  }

  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const data = await AsyncStorage.getItem("numberOfCoins");
          if (data !== null) {
            setNumberOfCoins(JSON.parse(data));
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      loadItems();
    }, [])
  );

  useEffect(() => {
    const currentIndex = chickenStatuses.indexOf(chickenStatus)

    if (feedingNumber >= 20) {
      if (currentIndex < chickenStatus.length - 1) {
        setChickenStatus(chickenStatuses[currentIndex + 1] as Chicken)
        fireScale.value = withTiming(1);
        setIsButtonActive(false)
        setTimeout(() => {
          setIsButtonActive(true)
          setIsChickenReady(true)
        }, 1500)
      }
    }
  }, [feedingNumber])

  useEffect(() => {
    getChickenDimensions();
    setNumberOfCoins(prev => prev + 1)
  }, [chickenStatus])

  useEffect(() => {
    const saveDashboardItems = async () => {
      try {
        await AsyncStorage.setItem("numberOfCoins", JSON.stringify(numberOfCoins));
      } catch (error) {
        console.error(error);
      }
    };
  
    if (!isLoading) {
      saveDashboardItems();
    }
  }, [numberOfCoins]);

  return (
    <View style={styles.fullContainer}>
      <ImageBackground
        source={require("@/assets/images/BG-cook.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />

            <StatusView numberOfCoins={numberOfCoins} setIsMenuVisible={setIsMenuVisible}/>

            {isChickenReady && (
              <Image 
              source={require("@/assets/images/coin.png")}
              style={styles.coinImg}
            />
            )}

            <Image 
              source={getChickenImg()}
              style={[styles.chickenImg, {width: chickenDimensions.width, height: chickenDimensions.height}]}
            />

          <Animated.View style={[styles.fireContainer, fireStyle]}>
            <LottieView
              ref={fireRef}
              source={require('@/assets/animations/fire-animation.json')}
              autoPlay={false}
              loop
              style={{ width: 100, height: 100 }}
            />
          </Animated.View>

          {isButtonActive ? (
              isChickenReady 
                ? (
                  <Button text={'New egg'} onPress={() => router.replace('/startScreen')} imgSource={require("@/assets/images/egg-icon.png")}/>
                ) : (
                  <Button text={'Fire'} onPress={onPressHandler} imgSource={require("@/assets/images/fire.png")}/>
                )
            ) : (
              isChickenReady 
              ? (
                <Button text={'New egg'} onPress={() => router.replace('/startScreen')} imgSource={require("@/assets/images/egg-icon.png")} isDisabled={true}/>
              ) : (
                <Button text={'Fire'} onPress={onPressHandler} imgSource={require("@/assets/images/fire.png")} isDisabled={true}/>
              )
            )}

          {isMenuVisible && (<MenuAside setIsVisible={setIsMenuVisible} />)}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default CookScreen;

const styles = StyleSheet.create({
  fullContainer: {
    width: screenWidth,
    height: screenHeight,
  },
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center'
  },
  chickenImg: {
    position: 'absolute',
    bottom: '20%',
  },
  coinImg: {
    position: 'absolute',
    top: '22.5%',
    height: 185,
    width: 185,
  },
  fireContainer: {
    position: "absolute",
    bottom: '22%',
    zIndex: -1,
  },
});
