import React, { useCallback, useEffect, useState } from "react";
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
import StartView from "./components/StartView";
import StatusView from "./components/StatusView";
import ProgressinPanel from "./components/ProgressinPanel";
import { Chicken } from "@/utills/types";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuAside from "./components/MenuAside";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const StatisticsScreen = () => {
  const [isLoadnig, setIsLoading] = useState(true);
  const [numberOfCoins, setNumberOfCoins] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [readyChickenCount, setReadyChickenCount] = useState(0);
  const router = useRouter();

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

  return (
    <View style={styles.fullContainer}>
      <ImageBackground
        source={require("@/assets/images/BG-settings.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />

            <StatusView numberOfCoins={numberOfCoins} setIsMenuVisible={setIsMenuVisible} isTextLeft={true}/>

            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <Text style={styles.titleText}>Total number of chickens</Text>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14}}>
                  <Text style={styles.descText}>{readyChickenCount}</Text>
                  <Image 
                    source={require("@/assets/images/chicken/adult.png")}
                    style={{ height: 90, width: 72, }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.innerContainer}>
                <Text style={styles.titleText}>The resulting chips</Text>

                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 14}}>
                  <Text style={styles.descText}>{numberOfCoins}</Text>
                  <Image 
                    source={require("@/assets/images/coin.png")}
                    style={{ height: 87, width: 87, }}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>

            {isMenuVisible && (<MenuAside setIsVisible={setIsMenuVisible} />)}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default StatisticsScreen;

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
  container: {
    marginTop: 40,
    gap: 24,
  },
  innerContainer: {
    borderColor: '#3DC55B',
    borderWidth: 5,
    borderRadius: 20,
    padding: 23,
  },
  img: {
    height: 90,
    width: 72,
  },
  titleText: {
    fontFamily: 'Inter',
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
  },
  descText: {
    fontFamily: 'Inter',
    fontSize: 70,
    color: '#fff',
  }
});
