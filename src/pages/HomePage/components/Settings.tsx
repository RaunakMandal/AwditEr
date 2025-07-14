import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { GenericModal } from '../../../components/GenericModal';
import WebView from 'react-native-webview';
import { useUserContext } from '../../../UserContext';

export const Settings = () => {
  const { user, logout } = useUserContext();

  const [showAuditGuidelines, setShowAuditGuidelines] = useState(false);
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Hello, {user?.name}</Text>
      <Button mode="contained" onPress={logout}>
        Log out
      </Button>
      <Button mode="outlined" onPress={() => setShowAuditGuidelines(true)}>
        Show Audit Guidelines
      </Button>
      {showAuditGuidelines && (
        <GenericModal
          showModal={showAuditGuidelines}
          setShowModal={setShowAuditGuidelines}
          style={styles.modal}
        >
          <WebView
            useWebKit={true}
            source={{ uri: 'https://en.wikipedia.org/wiki/Audit_trail' }}
            style={styles.webView}
          />
        </GenericModal>
      )}
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    margin: 20,
    height: '80%',
    width: '90%',
  },
  webView: {
    flex: 1,
    width: '100%',
  },
});
