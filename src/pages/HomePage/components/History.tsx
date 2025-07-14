import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUDIT_DATA_ASYNC_KEY } from '../../../utils/constants';
import { Fragment, useEffect, useState } from 'react';
import { T_Audit } from '../../../types/audit';
import { GenericModal } from '../../../components/GenericModal';
import { T_User } from '../../../types/user';

export const History = ({ user }: { user: T_User }) => {
  const [history, setHistory] = useState<T_Audit[]>([]);
  const [modalItem, setModalItem] = useState<T_Audit | null>(null);

  const canUserDelete = user.roles.includes('admin');
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await AsyncStorage.getItem(AUDIT_DATA_ASYNC_KEY);
        console.log('Fetched history:', data);
        if (data) {
          setHistory(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    if (!history.length) {
      fetchHistory();
    }
  });

  const deleteHistoryItem = async (itemId: string) => {
    try {
      console.log('Deleting item with ID:', itemId);
      const updatedHistory = history.filter(item => item.id !== itemId);
      await AsyncStorage.setItem(
        AUDIT_DATA_ASYNC_KEY,
        JSON.stringify(updatedHistory),
      );
      setHistory(updatedHistory);
      setModalItem(null);
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  return (
    <View style={styles.container}>
      {history && history.length ? (
        history.map((item, index) => (
          <Fragment key={`history-item-${index}`}>
            <List.Item
              title={
                <Text
                  variant="titleMedium"
                  onPress={() => setModalItem(item)}
                >{`Employee: ${item.employeeDetails?.name}`}</Text>
              }
              description={`Designation: ${item.employeeDetails?.designation}`}
              right={() =>
                canUserDelete ? (
                  <TouchableOpacity
                    onPress={() => deleteHistoryItem(item.id)}
                    style={{ padding: 8 }}
                  >
                    <Text variant="labelLarge" style={{ color: 'red' }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                ) : null
              }
            />
            {index < history.length - 1 && <Divider key={`divider-${index}`} />}
          </Fragment>
        ))
      ) : (
        <Text>No history available</Text>
      )}
      {modalItem && (
        <GenericModal
          showModal={!!modalItem}
          setShowModal={() => setModalItem(null)}
        >
          <List.Item
            title={`Employee: ${modalItem.employeeDetails?.name}`}
            description={`Designation: ${modalItem.employeeDetails?.designation}`}
          />
          <List.Item
            title={`Sprint: ${modalItem.lastSprintDetails?.sprintName}`}
            description={`Completed Tasks: ${modalItem.lastSprintDetails?.completedTasks.join(
              ', ',
            )}`}
          />
          <List.Item
            title={`Performance Rating: ${
              modalItem.review?.performanceRating || 0
            } ⭐️`}
            description={modalItem.review?.comments || 'No comments'}
          />
          <List.Item
            title="Review done at"
            description={new Date(modalItem.timestamp).toLocaleString()}
          />
          <View style={styles.imageContainer}>
            <Text variant="titleMedium">Review Photo</Text>
            <Image
              source={{ uri: `file://${modalItem.review?.photoUri}` }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </GenericModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imageContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});
