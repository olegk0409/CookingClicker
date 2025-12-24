import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const SurpriseAnimation = ({ onAnimationFinish }) => {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('@/assets/animations/Animation-surprise.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
        style={{ width: 400, height: 400, marginTop: 300 }}
      />
    </View>
  );
};

export default SurpriseAnimation;