import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../../store/constants';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { debounce } from 'lodash';
import Config from 'react-native-config';
import Suggestions from './Suggestions';
import InputBox from './InputBox';

const Map = ({
  createHistoryItem,
  addActivePoints,
  clearActivePoints,
  activePoints,
  history
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromID, setFromID] = useState('');
  const [toID, setToID] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState('from');
  const map = useRef();

  const search = async query => {
    const apiKey = Config.MAPS_API_KEY;
    const input = encodeURIComponent(query);
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us&types=geocode&input=${input}&key=${apiKey}`);
    const json = await res.json();
    if (res.status === 200 && json?.predictions) {
      setSuggestions(json.predictions);
    }
  };

  const debouncedSearch = debounce(search, 500);

  const handleSwapInputs = () => {
    const oldTo = to;
    const oldToID = toID;
    setTo(from);
    setToID(fromID);
    setFrom(oldTo);
    setFromID(oldToID);
  };

  const handleSuggestionPress = suggestion => {
    if (active === 'to') {
      setTo(suggestion.description);
      setToID(suggestion.place_id);
    } else {
      setFrom(suggestion.description);
      setFromID(suggestion.place_id);
    }
    setSuggestions([]);
  };

  const handleEnter = () => {
    fetchDirections(fromID, toID);
  };

  const fetchDirections = async (origin, destination) => {
    const apiKey = Config.MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
    if (res.status === 200 && json?.routes?.[0]?.legs?.length) {
      const route = json.routes[0].legs[0];
      const startCoordinates = {
        latitude: route.start_location.lat,
        longitude: route.start_location.lng
      };
      const endCoordinates = {
        latitude: route.end_location.lat,
        longitude: route.end_location.lng
      };
      createHistoryItem({
        from: {
          description: from,
          placeId: fromID,
          coordinates: startCoordinates
        },
        to: {
          description: to,
          placeId: toID,
          coordinates: endCoordinates
        },
        duration: route.duration.text,
        distance: route.distance.text
      });
      if (activePoints.length) {
        clearActivePoints();
      }
      addActivePoints([
        { description: from, coordinates: startCoordinates },
        { description: to, coordinates: endCoordinates }
      ]);
      map.current.fitToCoordinates(
        [ startCoordinates, endCoordinates ],
        { edgePadding: { bottom: 120, top: 50 }}
      );
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  const handleToChange = text => {
    setActive('to');
    setTo(text);
    debouncedSearch(text);
  };

  const handleFromChange = text => {
    setActive('from');
    setFrom(text);
    debouncedSearch(text);
  };

  const handleClose = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    clearActivePoints();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MapView
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 35.11,
            longitude: -106.62,
            latitudeDelta: 0.2,
            longitudeDelta: 0.08,
          }}>
          { activePoints.map(({ coordinates, description }) =>
            <Marker
              coordinate={coordinates}
              title={description}
              key={description}
            />
          )}
        </MapView>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.overlay}>
          <View style={styles.absolute}>
            { !!suggestions.length &&
              <Suggestions
                data={suggestions}
                onPress={handleSuggestionPress}
              />
            }
            <InputBox
              to={to}
              from={from}
              onChangeTo={handleToChange}
              onChangeFrom={handleFromChange}
              onSwapInputs={handleSwapInputs}
              onEnter={handleEnter}
              disabled={!toID || !fromID}
              showInputs={!activePoints.length || !history.length}
              route={history[history.length - 1]}
              onClose={handleClose}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
  overlay: {
    position: 'relative',
    elevation: 10,
    backgroundColor: '#ffffff',
  },
  absolute: {
    position: 'absolute',
    elevation: 10,
    backgroundColor: '#ffffff',
    bottom: 8,
    left: 8,
    right: 8,
    borderRadius: 4,
  },
});

const mapStateToProps = state => ({
  history: state.history,
  activePoints: state.activePoints
});

const mapDispatchToProps = dispatch => ({
  createHistoryItem: item => dispatch({
    type: actions.CREATE_HISTORY_ITEM,
    payload: item
  }),
  addActivePoints: points => dispatch({
    type: actions.ADD_ACTIVE_POINTS,
    payload: points
  }),
  clearActivePoints: () => dispatch({
    type: actions.CLEAR_ACTIVE_POINTS
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
