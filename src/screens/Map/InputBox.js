import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
  onSwapInputs,
  onEnter,
  disabled,
  showInputs,
  route,
  onClose,
}) => {
  return (
    <View style={styles.inputBox}>
      { showInputs ? (
        <>
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
            <TouchableOpacity
              disabled={disabled}
              style={{
                ...styles.enter,
                ...disabled && styles.disabled
              }}
              onPress={onEnter}>
              <Ionicon name='arrow-forward' size={35} color='#ffffff' />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.inputs}>
            <Text style={styles.location} numberOfLines={1}>
              {route.from.description}
            </Text>
            <Text style={styles.location} numberOfLines={1}>
              {route.to.description}
            </Text>
            <View>
              <Text style={styles.quantities}>
                {route.distance}, {route.duration}
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.close}
              onPress={onClose}>
              <Ionicon name='close' size={25} color='#000000' />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  disabled: {
    backgroundColor: '#0080FF44'
  },
  close: {
    padding: 5,
    marginRight: -10,
    marginTop: -10
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 2
  },
  quantities: {
    fontSize: 14
  },
});

export default InputBox;
