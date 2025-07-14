import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { UserProvider, useUserContext } from './UserContext';
import { useEffect } from 'react';
import { requestImagePermission } from './components/Permissions';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AppContent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user } = useUserContext();

  useEffect(() => {
    requestImagePermission();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {user ? <HomePage user={user} /> : <LoginPage />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <PaperProvider
      settings={{
        icon: props => <AntDesign {...props} />,
      }}
    >
      <UserProvider>
        <AppContent />
      </UserProvider>
    </PaperProvider>
  );
}
