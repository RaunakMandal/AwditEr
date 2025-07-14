import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

type GenericModalProps = {
  showModal: boolean;
  setShowModal: (visible: boolean) => void;
  children: React.ReactNode;
  style?: any;
};

export const GenericModal = ({
  showModal,
  setShowModal,
  children,
  style,
}: GenericModalProps) => {
  return (
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{ ...style, ...styles.container }}
      >
        {children}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
