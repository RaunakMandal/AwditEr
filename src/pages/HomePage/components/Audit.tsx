import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, HelperText, List, Text } from 'react-native-paper';
import { T_Audit } from '../../../types/audit';
import { TextInput } from 'react-native-paper';
import { CameraView } from './Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUDIT_DATA_ASYNC_KEY } from '../../../utils/constants';
import { Rating } from 'react-native-ratings';
import { T_User } from '../../../types/user';

export const Audit = ({ user }: { user: T_User }) => {
  const [expandedId, setExpandedId] = useState<string>('details');
  const [auditData, setAuditData] = useState<Partial<T_Audit> | null>();
  const [errors, setErrors] = useState<string[]>([]);

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    if (photoUri) {
      setAuditData((prevData: Partial<T_Audit>) => {
        return {
          ...prevData,
          review: {
            ...prevData?.review,
            photoUri,
          },
        };
      });
    }
  }, [photoUri]);

  const handleFormErrors = () => {
    const newErrors: string[] = [];
    if (!auditData?.employeeDetails?.name) {
      newErrors.push('employee_name');
    }
    if (!auditData?.employeeDetails?.designation) {
      newErrors.push('employee_designation');
    }
    if (!auditData?.lastSprintDetails?.sprintName) {
      newErrors.push('last_sprint_name');
    }
    if (!auditData?.review?.comments) {
      newErrors.push('review_comments');
    }
    console.log('Form errors:', newErrors);
    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleFormInputChange = (field: keyof T_Audit, value: any) => {
    setAuditData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const toggleTask = (task: string) => {
    const currentTasks = auditData?.lastSprintDetails?.completedTasks || [];

    const updatedTasks = currentTasks.includes(task)
      ? currentTasks.filter(t => t !== task)
      : [...currentTasks, task];

    handleFormInputChange('lastSprintDetails', {
      ...auditData?.lastSprintDetails,
      completedTasks: updatedTasks,
    });
  };

  const isChecked = (task: string) =>
    auditData?.lastSprintDetails?.completedTasks?.includes(task) ?? false;

  const ratingChanged = (rating: number) => {
    setAuditData((prevData: Partial<T_Audit>) => ({
      ...prevData,
      review: {
        ...(prevData?.review ?? {}),
        performanceRating: rating,
      },
    }));
  };

  const saveAuditData = async () => {
    try {
      if (!handleFormErrors()) {
        console.log('Form validation failed:', errors);
        setTimeout(() => {
          setErrors([]);
        }, 3000);
        return;
      }
      const getExistingData = await AsyncStorage.getItem(AUDIT_DATA_ASYNC_KEY);
      const existingData: T_Audit[] = getExistingData
        ? JSON.parse(getExistingData)
        : [];

      await AsyncStorage.setItem(
        AUDIT_DATA_ASYNC_KEY,
        JSON.stringify([
          ...existingData,
          {
            ...auditData,
            id: Date.now().toString(),
            userId: user.id,
            timestamp: new Date(),
          } as T_Audit,
        ]),
      );
      console.log(JSON.stringify([...existingData, auditData]));
      console.log('Audit data saved successfully');

      // Reset the form after saving
      setAuditData(null);
    } catch (error) {
      console.error('Error saving audit data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Employee Review</Text>
      <View style={styles.formList}>
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={id => setExpandedId(id as string)}
        >
          <List.Accordion
            title="Employee Details"
            id="details"
            style={styles.listItem}
          >
            <TextInput
              label="Employee Name"
              value={auditData?.employeeDetails?.name || ''}
              onChangeText={text =>
                handleFormInputChange('employeeDetails', {
                  ...auditData?.employeeDetails,
                  name: text,
                })
              }
              error={errors.includes('employee_name')}
              style={styles.inputField}
            />
            {errors.includes('employee_name') && (
              <HelperText type="error">Employee Name is required</HelperText>
            )}
            <TextInput
              label="Employee Designation"
              value={auditData?.employeeDetails?.designation || ''}
              onChangeText={text =>
                handleFormInputChange('employeeDetails', {
                  ...auditData?.employeeDetails,
                  designation: text,
                })
              }
              style={styles.inputField}
              error={errors.includes('employee_designation')}
            />
            {errors.includes('employee_designation') && (
              <HelperText type="error">
                Employee Designation is required
              </HelperText>
            )}
          </List.Accordion>
          <List.Accordion
            title="Last Sprint Details"
            id="sprint"
            style={styles.listItem}
          >
            <TextInput
              label="Sprint Name"
              value={auditData?.lastSprintDetails?.sprintName || ''}
              onChangeText={text =>
                handleFormInputChange('lastSprintDetails', {
                  ...auditData?.lastSprintDetails,
                  sprintName: text,
                })
              }
              style={styles.inputField}
              error={errors.includes('last_sprint_name')}
            />
            {errors.includes('last_sprint_name') && (
              <HelperText type="error">Sprint Name is required</HelperText>
            )}

            <Checkbox.Item
              label="Task 1 Completed"
              status={isChecked('task1') ? 'checked' : 'unchecked'}
              onPress={() => toggleTask('task1')}
              style={styles.inputField}
            />
            <Checkbox.Item
              label="Task 2 Completed"
              status={isChecked('task2') ? 'checked' : 'unchecked'}
              onPress={() => toggleTask('task2')}
              style={styles.inputField}
            />
          </List.Accordion>
          <List.Accordion title="Review" id="review" style={styles.listItem}>
            <TextInput
              label="Additional Comments"
              value={auditData?.review?.comments || ''}
              onChangeText={text =>
                handleFormInputChange('review', {
                  ...auditData?.review,
                  comments: text,
                })
              }
              style={styles.inputField}
            />
            {errors.includes('review_comments') && (
              <HelperText type="info">
                Please provide a performance rating.
              </HelperText>
            )}
            <View style={styles.inputField}>
              <Text variant="bodyMedium">Performance Rating (1-5):</Text>
              <Rating
                showRating={false}
                onFinishRating={(rating: number) => ratingChanged(rating)}
              />
            </View>
            <CameraView setPhotoUri={setPhotoUri} />
          </List.Accordion>
        </List.AccordionGroup>
      </View>
      <Button mode="contained" onPress={saveAuditData}>
        Submit Review
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  formList: {
    flex: 1,
    gap: 16,
    marginTop: 16,
  },
  listItem: {
    backgroundColor: '#bdc3c7',
  },
  inputField: {
    marginTop: 16,
  },
});
