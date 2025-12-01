import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  let [myText, setMyText] = React.useState(0);
  let [maximum, setMaximum] = React.useState(100);

  const handlePress = () => {
    const newValue = myText + 1;
    setMyText(newValue);
  };

  const getImageSource = () => {
    if (myText > maximum) {
      setMyText(myText - maximum);
      return require('./assets/egg1.jpg');
    } else if (myText > maximum * 0.8) {
      return require('./assets/egg5.jpg');
    } else if (myText > maximum * 0.6) {
      return require('./assets/egg4.jpg');
    } else if (myText > maximum * 0.4) {
      return require('./assets/egg3.jpg');
    } else if (myText > maximum * 0.2) {
      return require('./assets/egg2.jpg');
    } else {
      return require('./assets/egg1.jpg');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: 1000 }}>
        <View style={{ backgroundColor: 'white', width: 390, height: 600, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={handlePress} style={styles.imageButton}>
            <Image
              source={getImageSource()}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.Textik}>{myText}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    // Стили для кнопки-картинки
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  Textik: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});