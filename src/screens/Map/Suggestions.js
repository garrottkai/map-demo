import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

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
      keyboardShouldPersistTaps='always'
      style={styles.sugg}
      contentContainerStyle={styles.suggContainer}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={item => item.place_id}
    />
  );
};

const styles = StyleSheet.create({
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
  },
});

export default Suggestions;
