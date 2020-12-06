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
import actions from '../../store/constants';
import Ionicon from 'react-native-vector-icons/Ionicons';

const renderItem = ({
 item: { from, to, duration, distance }
}) => (
  <View style={styles.listItem}>
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
  </View>
);

const History = ({
  history,
  deleteHistory
}) => {

  const Separator = () => (
    <View style={styles.separator} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={history}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item, index) => `${index}`}
      />
      <TouchableOpacity
        disabled={!history.length}
        style={{
          ...styles.delete,
          ...!history.length && styles.disabled
        }}
        onPress={deleteHistory}>
        <Ionicon name='trash' size={35} color='#ffffff' />
      </TouchableOpacity>
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
  },
  delete: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 20,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#00000033',
    borderWidth: 1,
    backgroundColor: '#ff1030'
  },
  disabled: {
    backgroundColor: '#ff103044'
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
