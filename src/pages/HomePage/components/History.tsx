import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const History = () => {
  return (
    <View style={styles.container}>
      <Text>History Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
