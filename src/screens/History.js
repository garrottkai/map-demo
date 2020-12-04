import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/constants';

const renderItem = (item, onPress) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.listItem}>

  </TouchableOpacity>
);

const History = ({
  history,
  deleteHistory
}) => {

  const handleItemPress = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={history}
        renderItem={item => renderItem(item, handleItemPress)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {

  },
  listItem: {

  }
});

const mapStateToProps = state => ({
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  deleteHistory: () => dispatch({
    type: actions.DELETE_HISTORY
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
