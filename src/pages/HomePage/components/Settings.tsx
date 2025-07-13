import { StyleSheet, View } from 'react-native';
import { useAuth } from '../../../AuthContext';
import { Button, Text } from 'react-native-paper';

export const Settings = () => {
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Text>Log out from account</Text>
      <Button mode="contained" onPress={logout}>
        Log out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
