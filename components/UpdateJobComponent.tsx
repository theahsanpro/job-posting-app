import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, Alert, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import ApiManager from '../api/api_manager'
import { updateJob } from '../redux/job_slice'

type UpdateJobProps = NativeStackScreenProps<RootStackParamList, 'UpdateJobComponent'>

interface Job {
  id: number,
  title: string;
  description: string;
  salary: number;
  company: string;
  postedAt: string,
  [key: string]: any;
}

const UpdateJobComponent = ({ route, navigation }: UpdateJobProps) => {

  const dispatch = useDispatch()

  // Route Params
  const { job } = route.params

  // Checks to Enable/Disable Editing
  const [updateState, setUpdate] = useState(false)
  const allowUpdate = () => setUpdate(previousState => !previousState);

  // Functional Level State
  const [jobState, setJobState] = useState({
    id: job.id,
    title: job.title,
    description: job.description,
    company: job.company,
    salary: job.salary,
  });

  // Function to Discard any Changes made
  const discardChanges = () => {
    setJobState({
      id: job.id,
      title: job.title,
      description: job.description,
      company: job.company,
      salary: job.salary,
    });

    allowUpdate()
  };

  const CreateAlert = (heading: string, msg: string) => {
    Alert.alert(heading, msg, [{ text: 'OK' }])
  }

  // Function to Update the cahnges
  const UpdateJob = async () => {
    try {
      await ApiManager("/jobs/" + job.id, {
        method: 'put',
        data: {
          title: jobState.title,
          description: jobState.description,
          salary: jobState.salary,
          company: jobState.company
        }
      })
        .then(async (response) => {
          if (response.status == 200) {
            dispatch(updateJob({
              id: job.id,
              updatedJob: {
                title: jobState.title,
                description: jobState.description,
                salary: jobState.salary,
                company: jobState.company
              }
            }))

            allowUpdate()

            CreateAlert("Success", "Job has been updated successfully")
          } else {
            CreateAlert("Error!", "Something Went Wrong. Please Try Again")
          }
        })
    } catch (error) {
      console.error(error)
      CreateAlert("Error!", "Something Went Wrong. Please Try Again")
    }
  }

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.heading}>Update Details</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.flexCol}>
              <View style={styles.flexRow}>
                <Text style={styles.flexLabel}>Title </Text>
                <TextInput
                  style={styles.flexField}
                  value={jobState.title}
                  editable={updateState}
                  onChangeText={text => setJobState(prevData => ({ ...prevData, title: text }))}
                />
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.flexLabel}>Company </Text>
                <TextInput
                  style={styles.flexField}
                  value={jobState.company}
                  editable={updateState}
                  onChangeText={text => setJobState(prevData => ({ ...prevData, company: text }))}
                />
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.flexLabel}>Salary </Text>
                <TextInput
                  style={styles.flexField}
                  value={(jobState.salary).toString()}
                  editable={updateState}
                  onChangeText={text => {
                    const salaryValue = parseFloat(text);
                    if (!isNaN(salaryValue)) {
                      setJobState(prevData => ({ ...prevData, salary: salaryValue }));
                    }
                  }}
                />
              </View>
              <View style={styles.flexRow}>
                <Text style={styles.flexLabel}>Description </Text>
                <TextInput
                  style={styles.flexField}
                  value={jobState.description}
                  editable={updateState}
                  multiline={true}
                  onChangeText={text => setJobState(prevData => ({ ...prevData, description: text }))}
                />
              </View>
            </View>

            {
              updateState == false ? (
                <>
                  <View style={styles.flexCol}>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        allowUpdate()
                      }}>
                      <Text style={styles.buttonText}>Update Info</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, { backgroundColor: '#f05d60' }]}
                      onPress={() => {
                        navigation.goBack()
                      }}>
                      <Text style={styles.buttonText}>Back</Text>
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.flexRow}>
                    <View style={styles.flexBtn}>
                      <Pressable
                        style={styles.button}
                        onPress={() => {
                          // dispatch(setUser(updatedUserData));
                          UpdateJob()
                        }}>
                        <Text style={styles.buttonText}>Save</Text>
                      </Pressable>
                    </View>

                    <View style={styles.flexBtn}>
                      <Pressable
                        style={[styles.button, { backgroundColor: 'red' }]}
                        onPress={() => {
                          discardChanges()
                        }}>
                        <Text style={styles.buttonText}>Discard</Text>
                      </Pressable>
                    </View>
                  </View>
                </>
              )
            }
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default UpdateJobComponent

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
    marginBottom: 25
  },

  heading: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold'
  },

  flexCol: {
    flexDirection: 'column',
    paddingVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexLabel: {
    flex: 0.3,
    color: '#000000'
  },

  flexField: {
    flex: 0.7,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    color: 'grey'
  },

  flexBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
  },

  button: {
    backgroundColor: '#0782F9',
    width: '90%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },

  buttonText: {
    color: 'white'
  },

  card: {
    width: '90%',
    marginBottom: 15,
  },

  cardHeader: {
    backgroundColor: 'rgb(150,122,161)',
    padding: 15,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7,
    alignItems: 'center',
  },

  cardBody: {
    backgroundColor: 'rgb(213,198,224)',
    padding: 15,
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7
  },
})