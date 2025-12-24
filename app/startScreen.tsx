import React, { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "./components/Button";
import StartView from "./components/StartView";
import StatusView from "./components/StatusView";
import ProgressinPanel from "./components/ProgressinPanel";
import { Chicken } from "@/utills/types";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuAside from "./components/MenuAside";
import SurpriseAnimation from "./components/SurpriseAnimation";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const chickenStatuses = Object.values(Chicken);

const StartScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isStartViewVisible, setIsStartViewVisible] = useState(true);
  const [numberOfCoins, setNumberOfCoins] = useState(0);
  const [feedingNumber, setFeedingNumber] = useState(0);
  const [chickenStatus, setChickenStatus] = useState(Chicken.egg)
  const [chickenDimensions, setChickenDimensions] = useState({ width: 67, height: 88 })
  const [isChickenReady, setIsChickenReady] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [readyChickenCount, setReadyChickenCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);

  const router = useRouter();

  const getChickenImg = () => {
    if (chickenStatus === Chicken.egg) {
      return readyChickenCount % 3 === 0 ? require("@/assets/images/chicken/egg-golden.png") : require("@/assets/images/chicken/egg.png")
    }
    if (chickenStatus === Chicken.small) {
      return require("@/assets/images/chicken/small.png")
    }
    if (chickenStatus === Chicken.teen) {
      return require("@/assets/images/chicken/teen.png")
    }
    if (chickenStatus === Chicken.adult) {
      return require("@/assets/images/chicken/adult.png")
    }
    if (chickenStatus === Chicken.fried) {
      return require("@/assets/images/chicken/fried.png")
    }
  }

  const getChickenDimensions = () => {
    let width = 67;
    let height = 88;

    if (chickenStatus === Chicken.small) {
      width = 104;
      height = 151;
    }
    if (chickenStatus === Chicken.teen) {
      width = 168;
      height = 240;
    }
    if (chickenStatus === Chicken.adult) {
      width = 221;
      height = 295;
    }

    setChickenDimensions({width, height})
  }

  const onPressHandler = () => {
    switch (chickenStatus) {
      case Chicken.egg:
        setFeedingNumber(prev => prev + 100 / 2)
        break;
      case Chicken.small:
        setFeedingNumber(prev => prev + 100 / 3)
        break;
      case Chicken.teen:
        setFeedingNumber(prev => prev + 100 / 4)
        break;
    }
  }

  const handleAnimationFinish = () => {
    setIsAnimating(false);
  };

  useFocusEffect(
    useCallback(() => {
      const loadItems = async () => {
        try {
          const coinsData = await AsyncStorage.getItem("numberOfCoins");
          const chickensData = await AsyncStorage.getItem("readyChickensCount");
          if (coinsData !== null) {
            setNumberOfCoins(JSON.parse(coinsData));
          }
          if (chickensData !== null) {
            setReadyChickenCount(JSON.parse(chickensData));
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

    if (feedingNumber >= 100) {
      if (currentIndex < chickenStatus.length - 1) {
        setIsButtonActive(false);
        setTimeout(() => {
          setIsButtonActive(true);
          setIsAnimating(true);
          setChickenStatus(chickenStatuses[currentIndex + 1] as Chicken)
          setFeedingNumber(0);
        }, 1000)
      }
    }
  }, [feedingNumber])

  useEffect(() => {
    getChickenDimensions();

    if (chickenStatus === Chicken.adult) {
      setIsChickenReady(true);
      setReadyChickenCount(prev => prev + 1)
    }
  }, [chickenStatus])

  useEffect(() => {
    const saveDashboardItems = async () => {
      try {
        await AsyncStorage.setItem("readyChickensCount", JSON.stringify(readyChickenCount));
      } catch (error) {
        console.error(error);
      }
    };
  
    if (!isLoading) {
      saveDashboardItems();
    }
  }, [readyChickenCount]);

  return (
    <View style={styles.fullContainer}>
      <ImageBackground
        source={require("@/assets/images/BG.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
            {isStartViewVisible && (
              <StartView setIsVisible={() => setIsStartViewVisible(false)}/>
            )}

            <StatusView numberOfCoins={numberOfCoins} setIsMenuVisible={setIsMenuVisible}/>

            {!isChickenReady && (<ProgressinPanel barWidth={feedingNumber}/>)}

            <Image 
              source={getChickenImg()}
              style={[styles.chickenImg, {width: chickenDimensions.width, height: chickenDimensions.height}]}
            />

            {isAnimating && (
              <SurpriseAnimation onAnimationFinish={handleAnimationFinish} />
            )}

            {isButtonActive ? (
              isChickenReady 
                ? (
                  <Button text={'Cook'} onPress={() => router.replace("/cookScreen")} imgSource={require("@/assets/images/fire.png")}/>
                ) : (
                  <Button text={'Feed'} onPress={onPressHandler} imgSource={require("@/assets/images/corns.png")}/>
                )
            ) : (
              isChickenReady 
              ? (
                <Button text={'Cook'} onPress={() => router.replace("/cookScreen")} imgSource={require("@/assets/images/fire.png")} isDisabled={true}/>
              ) : (
                <Button text={'Feed'} onPress={onPressHandler} imgSource={require("@/assets/images/corns.png")} isDisabled={true}/>
              )
            )}

            {isMenuVisible && (<MenuAside setIsVisible={setIsMenuVisible} />)}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default StartScreen;

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
    alignItems: 'center',
  },
  chickenImg: {
    position: 'absolute',
    bottom: '22%',
  }
});
