import { useState } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import MenuAside from "./MenuAside";

const StatusView = ({ numberOfCoins, setIsMenuVisible, isTextLeft = false }) => {

  return (
    <View style={styles.container}>
      {isTextLeft ? (
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Statistics</Text>
        </View>
      ) : (
        <View style={styles.leftContainer}>
        <Image
          source={require("@/assets/images/coin.png")}
          resizeMode="contain"
          style={styles.leftImg}
        />
        <Text style={styles.text}>{numberOfCoins}</Text>
      </View>
      )}

      <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
        <Image
          source={require("@/assets/images/burger-menu.png")}
          style={styles.rightImg}
        />
      </TouchableOpacity>

    </View>
  )
}

export default StatusView;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leftImg: {
    height: 50,
    width: 50,
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 32,
    color: '#fff',
  },
  rightImg: {
    height: 27,
    width: 32,
  }
})
