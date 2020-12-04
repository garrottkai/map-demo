import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import actions from '../store/constants';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { debounce } from 'lodash';

const Input = ({
  placeholder,
  value,
  setValue,
  style
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={setValue}
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
  setTo,
  from,
  setFrom,
  onSwapInputs
}) => {
  return (
    <View style={styles.inputBox}>
      <View style={styles.inputs}>
        <Input
          value={from}
          setValue={setFrom}
          placeholder='From...'
          style={styles.topInput}
        />
        <Input
          value={to}
          setValue={setTo}
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

const Map = ({
  createHistoryItem
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const handleSwapInputs = () => {
    const oldTo = to;
    setTo(from);
    setFrom(oldTo);
  };
  const handleEnter = () => {
    createHistoryItem({
      to,
      from
    });
  }
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
      <InputBox
        to={to}
        from={from}
        setTo={setTo}
        setFrom={setFrom}
        onSwapInputs={handleSwapInputs}
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
  },
  inputBox: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
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
    //paddingHorizontal: 7,
    width: 53,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
  },
  enter: {
    paddingVertical: 5,
    //paddingHorizontal: 7,
    width: 53,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
    backgroundColor: '#0080FF'
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
