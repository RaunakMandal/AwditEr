import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

export const CameraView = ({
  setPhotoUri,
}: {
  setPhotoUri: (uri: string | null) => void;
}) => {
  const camera = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const capturePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      // reset camera
      camera.current = null;

      // save the photo to the device's storage or handle it as needed
      console.log('Photo captured:', photo.path);
      setPhotoUri(photo.path);
    }
  };

  if (!device) return <Text>Camera is being initialized...</Text>;
  if (!hasPermission)
    return <Text>Camera permission denied, please enable it in settings.</Text>;

  return (
    <View style={styles.wrapper}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <TouchableOpacity style={styles.captureButton} onPress={capturePhoto}>
          <Text style={styles.captureText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  captureButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    zIndex: 10,
  },
  captureText: {
    color: '#fff',
    fontSize: 18,
  },
});
