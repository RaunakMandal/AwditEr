import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, List, Text } from 'react-native-paper';
import { T_Audit } from '../../../types/audit';
import { TextInput } from 'react-native-paper';
import { CameraView } from './Camera';

export const Audit = () => {
  const [expandedId, setExpandedId] = useState<string>('details');
  const [auditData, setAuditData] = useState<Partial<T_Audit> | null>(null);

  const handleFormInputChange = (field: keyof T_Audit, value: any) => {
    setAuditData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Employee Review</Text>
      <View style={styles.formList}>
        <List.AccordionGroup
          expandedId={expandedId}
          onAccordionPress={id => setExpandedId(id as string)}
        >
          <List.Accordion title="Employee Details" id="details">
            <TextInput
              label="Employee Name"
              value={auditData?.employeeDetails?.name || ''}
              onChangeText={text =>
                handleFormInputChange('employeeDetails', {
                  ...auditData?.employeeDetails,
                  name: text,
                })
              }
            />
            <TextInput
              label="Employee Designation"
              value={auditData?.employeeDetails?.designation || ''}
              onChangeText={text =>
                handleFormInputChange('employeeDetails', {
                  ...auditData?.employeeDetails,
                  designation: text,
                })
              }
            />
          </List.Accordion>
          <List.Accordion title="Last Sprint Details" id="sprint">
            <TextInput
              label="Sprint Name"
              value={auditData?.lastSprintDetails?.sprintName || ''}
              onChangeText={text =>
                handleFormInputChange('lastSprintDetails', {
                  ...auditData?.lastSprintDetails,
                  sprintName: text,
                })
              }
            />
            <TextInput
              label="Completed Tasks"
              value={
                auditData?.lastSprintDetails?.completedTasks.join(', ') || ''
              }
              onChangeText={text =>
                handleFormInputChange('lastSprintDetails', {
                  ...auditData?.lastSprintDetails,
                  completedTasks: text.split(',').map(task => task.trim()),
                })
              }
            />
          </List.Accordion>
          <List.Accordion title="Review" id="review">
            <Checkbox.Item label="Task 1" status="checked" />
            <Checkbox.Item label="Task 2" status="unchecked" />
            <Checkbox.Item label="Task 3" status="unchecked" />

            <TextInput
              label="Additional Comments"
              value={auditData?.review?.comments || ''}
              onChangeText={text =>
                handleFormInputChange('review', {
                  ...auditData?.review,
                  comments: text,
                })
              }
            />

            <CameraView />
          </List.Accordion>
        </List.AccordionGroup>
      </View>
      <Button
        mode="contained"
        onPress={() => console.log('Submit Review')}
        style={{ marginTop: 16, marginBottom: 16 }}
      >
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
});
