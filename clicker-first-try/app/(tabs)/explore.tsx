
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  let [myText, setMyText] = React.useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: 1000 }}>
        <View style={{ backgroundColor: 'green', width: 390, height: 600 }}>
          <Button
            color="#333333"
            title='жмать сюда'
            onPress={() => setMyText(myText++)}>
          </Button>
          <Text style={styles.Textik}>{myText}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  Textik: {
    bottom: -40,
    left: 10,
  },
});
