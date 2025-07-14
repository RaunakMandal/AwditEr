import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  SegmentedButtons,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { makeOptions } from '../../utils/functions';
import { USER_ROLES } from '../../utils/constants/user';
import { useLoginPage } from './LoginPage.hook';

export const LoginPage = () => {
  const {
    form,
    handleFormChange,
    handleFormSubmit,
    errorMessage,
    setShowErrorMessage,
    formErrors,
  } = useLoginPage();

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={text => handleFormChange('email', text)}
        error={formErrors.includes('email')}
      />
      {formErrors.includes('email') && (
        <HelperText type="error">Email is required</HelperText>
      )}
      <TextInput
        label="Password"
        value={form.password}
        onChangeText={text => handleFormChange('password', text)}
        error={formErrors.includes('password')}
      />
      {formErrors.includes('password') && (
        <HelperText type="error">Password is required</HelperText>
      )}
      <SegmentedButtons
        value={form.roles[0]}
        onValueChange={value => handleFormChange('roles', [value])}
        buttons={makeOptions(Array.from(USER_ROLES))}
      />
      <Button mode="elevated" onPress={handleFormSubmit}>
        Login
      </Button>

      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setShowErrorMessage('')}
        action={{
          label: 'Dismiss',
          onPress: () => {
            setShowErrorMessage('');
          },
        }}
      >
        {errorMessage}
      </Snackbar>
    </View>
  );
};

// Styles for the LoginPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
});
