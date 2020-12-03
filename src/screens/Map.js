import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Input = ({
  placeholder,
  style
}) => {
  const [value, onChangeText] = useState(placeholder);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={{
        ...styles.input,
        ...style
      }}
    />
  )
};

const InputBox = () => {

  return (
    <View style={styles.inputBox}>
      <Input placeholder='Start...' style={styles.topInput} />
      <Input placeholder='End...' />
    </View>
  );
};

const Map = () => {

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 35.11,
          longitude: -106.62,
          latitudeDelta: 0.2,
          longitudeDelta: 0.08,
        }}
      />
      <InputBox />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  inputBox: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  input: {
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18
  },
  topInput: {
    marginBottom: 15
  }
});

export default Map;
