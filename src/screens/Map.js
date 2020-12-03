import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
});

export default Map;
