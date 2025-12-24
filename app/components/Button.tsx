import { ImageBackground, TouchableOpacity, Text, StyleSheet, View, Image } from "react-native"

const Button = ({text, onPress, isDisabled = false, imgSource = undefined}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={styles.button}>
      <View style={[styles.container, isDisabled && {backgroundColor: 'gray'}]}>
        <Text style={styles.text}>{text}</Text>
        {imgSource && (<Image source={imgSource} style={styles.img} resizeMode="contain"/>)}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    position: 'absolute',
    bottom: '10%',
  },
  container: {
    backgroundColor: '#3DC55B',
    borderRadius: 9,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  text: {
    fontFamily: 'Inter',
    color: '#fff',
    fontSize: 24,
  },
  img: {
    maxHeight: 32,
    maxWidth: 42,
  }
})

export default Button
