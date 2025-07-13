import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider, useAuth } from './AuthContext';
import { HomePage } from './pages/HomePage';

const AppContent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { user } = useAuth();

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
    <PaperProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PaperProvider>
  );
}
