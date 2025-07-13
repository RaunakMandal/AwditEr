import { StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  CameraDevice,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const PermissionsPage = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Camera permissions are required to use this feature.
    </Text>
  </View>
);

const NoCameraDeviceError = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No camera device found.</Text>
  </View>
);

export const CameraView = () => {
  const device = useCameraDevice('back');
  const { hasPermission } = useCameraPermission();

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device as CameraDevice}
      isActive={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
