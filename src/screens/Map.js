import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import actions from '../store/constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { debounce } from 'lodash';
import Config from 'react-native-config';

const Input = ({
  placeholder,
  value,
  onChangeText,
  style
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      selectTextOnFocus
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...styles.input,
        ...style,
        ...focused && styles.focused
      }}
    />
  )
};

const InputBox = ({
  to,
  onChangeTo,
  from,
  onChangeFrom,
  onSwapInputs
}) => {
  return (
    <View style={styles.inputBox}>
      <View style={styles.inputs}>
        <Input
          value={from}
          onChangeText={onChangeFrom}
          placeholder='From...'
          style={styles.topInput}
        />
        <Input
          value={to}
          onChangeText={onChangeTo}
          placeholder='To...'
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.swap} onPress={onSwapInputs}>
          <Ionicon name='swap-vertical' size={30} color='#000000' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.enter}>
          <Ionicon name='arrow-forward' size={35} color='#ffffff' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Suggestions = ({
  data,
  onPress
}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggItem}
      onPress={() => onPress(item)}>
      <Text style={styles.suggText} numberOfLines={1}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );
  const Separator = () => (
    <View style={styles.separator} />
  );
  return (
    <FlatList
      style={styles.sugg}
      contentContainerStyle={styles.suggContainer}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
    />
  );
};

const Map = ({
  createHistoryItem
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState('from');
  const search = async query => {
    const apiKey = Config.MAPS_API_KEY;
    const input = encodeURIComponent(query);
    const res = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:us&types=geocode&input=${input}&key=${apiKey}`);
    const json = await res.json();
    console.log(json)
    if (res.status === 200 && json?.predictions) {
      setSuggestions(json.predictions);
    }
  };
  const debouncedSearch = debounce(search, 500);
  const handleSwapInputs = () => {
    const oldTo = to;
    setTo(from);
    setFrom(oldTo);
  };
  const handleSuggestionPress = suggestion => {
    if (active === 'to') {
      setTo(suggestion.description);
    } else {
      setFrom(suggestion.description);
    }
    setSuggestions([]);
  }
  const handleEnter = () => {
    createHistoryItem({
      to,
      from
    });
  }

  const fetchDirections = async (origin, destination) => {
    const apiKey = Config.MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${apiKey}`;
    const res = await fetch(url);
    const json = await res.json();
      console.log(json)
    if (res.status === 200 && json?.routes) {
    }
  }

  const handleToChange = text => {
    setActive('to');
    setTo(text);
    debouncedSearch(text);
  }

  const handleFromChange = text => {
    setActive('from');
    setFrom(text);
    debouncedSearch(text);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
  },
  absolute: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 15
  },
  inputs: {
    flexBasis: '80%'
  },
  input: {
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18
  },
  focused: {
    borderColor: '#000000',
  },
  topInput: {
    marginBottom: 15
  },
  buttons: {
    flexBasis: '20%',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  swap: {
    paddingVertical: 2,
    width: 53,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
  },
  enter: {
    paddingVertical: 5,
    width: 53,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
    backgroundColor: '#0080FF'
  },
  sugg: {
    flexDirection: 'row',
    backgroundColor: '#000000C0',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 8
  },
  suggContainer: {
    width: '100%'
  },
  suggItem: {
    paddingVertical: 12,
  },
  suggText: {
    color: '#ffffff',
    fontSize: 18
  },
  separator: {
    height: 1,
      width: '100%',
      backgroundColor: '#ffffff'
  }
});

const mapStateToProps = state => ({
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  createHistoryItem: item => dispatch({
    type: actions.CREATE_HISTORY_ITEM,
    payload: item
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
