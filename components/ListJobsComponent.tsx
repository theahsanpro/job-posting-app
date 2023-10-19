import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApiManager from '../api/api_manager'
import { rootState } from '../redux/store'
import { setJobs } from '../redux/job_slice'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type JobProps = NativeStackScreenProps<RootStackParamList, 'ListJobsComponent'>

const ListJobsComponent = ({ navigation }: JobProps) => {

  // Global Level State
  const dispatch = useDispatch()
  const jobs = useSelector((state: rootState) => state.jobs.jobs)

  const CreateAlert = (heading: string, msg: string) => {
    Alert.alert(heading, msg, [{ text: 'OK' }])
  }

  const GetJobList = async () => {
    try {
      await ApiManager("/jobs", {
        method: 'get',
      })
        .then(async (response) => {
          if (response.status == 200) {
            dispatch(setJobs(response.data.jobs))
          } else {
            CreateAlert("Alert!", "No Records Were Found")
          }
        })
    } catch (error) {
      console.error(error)
      CreateAlert("Error!", "Something Went Wrong!")
    }
  }

  useEffect(() => {
    GetJobList()
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Jobs</Text>
      </View>

      <View style={styles.container}>
        {
          jobs.length > 0 ? (
            jobs.map((job) => {
              return (
                <View key={job.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={{ fontWeight: 'bold' }}>{job.title}</Text>
                  </View>
                  <View style={styles.cardBody}>
                    <Text>
                      <Text style={{ fontWeight: 'bold' }}>Posted at: </Text>
                      <Text>{job.postedAt}</Text>
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: 'bold' }}>Posted by: </Text>
                      <Text>{job.company}</Text>
                    </Text>

                    <Text>
                      <Text style={{ fontWeight: 'bold' }}>Salary: </Text>
                      <Text>{job.salary}</Text>
                    </Text>
                    <Text>
                      <Text style={{ fontWeight: 'bold' }}>Job Description: </Text>
                      <Text>{job.description}</Text>
                    </Text>


                    <View style={styles.flexRow}>
                      <View style={styles.flexOne}>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('ViewJobComponent', {jobID: job.id})}
                            style={[styles.button, { backgroundColor: '#0782F9' }]}
                          >
                            <Text style={styles.buttonText}>Details</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={styles.flexOne}>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate('UpdateJobComponent', {job: job})}
                            style={[styles.button, { backgroundColor: 'rgb(52,194,147)' }]}
                          >
                            <Text style={styles.buttonText}>Edit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            })
          ) : (
            <>
              <Text>No Jobs Found!</Text>
            </>
          )
        }
      </View>
    </ScrollView>
  )
}

export default ListJobsComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 25
  },

  heading: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold'
  },

  card: {
    width: '90%',
    marginBottom: 15,
  },

  cardHeader: {
    backgroundColor: 'rgb(150,122,161)',
    padding: 15,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7
  },

  cardBody: {
    backgroundColor: 'rgb(213,198,224)',
    padding: 15,
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7
  },

  buttonContainer: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 16
  },

  flexRow: {
    flexDirection: 'row',
    marginTop: 30
  },

  flexOne: {
    flex: 0.5,
  },
})