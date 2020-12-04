import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import actions from '../store/constants';

const renderItem = ({ from, to, duration, distance }, onPress) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.listItem}>
    <Text style={styles.location} numberOfLines={1}>
      {from.description}
    </Text>
    <Text style={styles.location} numberOfLines={1}>
      {to.description}
    </Text>
    <View>
      <Text style={styles.quantities}>
        {distance}, {duration}
      </Text>
    </View>
  </TouchableOpacity>
);

const History = ({
  history,
  deleteHistory
}) => {

  const handleItemPress = () => {

  };

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={history}
        renderItem={({ item }) => renderItem(item, handleItemPress)}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  listItem: {
    paddingVertical: 10
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000'
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 2
  },
  quantities: {
    fontSize: 14
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
