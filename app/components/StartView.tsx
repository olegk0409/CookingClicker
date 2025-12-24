import { View, StyleSheet, Text, Dimensions } from "react-native"
import Button from "./Button";
import { useState } from "react";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");


const StartView = ({setIsVisible}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Congratulations! You are now the official owner of an egg! All you need to do is feed your chicken once a day and fry it at the end to get the golden chip
      </Text>

      <Button text={'Start'} onPress={setIsVisible}/>
    </View>
  )
}

export default StartView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  text: {
    fontFamily: 'Inter',
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    padding: 32,
  }
})
