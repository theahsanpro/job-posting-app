import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApiManager from '../api/api_manager'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type ViewJobProps = NativeStackScreenProps<RootStackParamList, 'ViewJobComponent'>

interface Job {
  id: number,
  title: string;
  description: string;
  salary: number;
  company: string;
  postedAt: string
}

const ViewJobComponent = ({ route, navigation }: ViewJobProps) => {

  // Functional Level State
  const [job, setJob] = useState<Job>({
    id: 0,
    title: '',
    description: '',
    salary: 0,
    company: '',
    postedAt: ''
  });
  
  // Route Params
  const { jobID } = route.params

  const GetJob = async () => {
    try {
      await ApiManager("/jobs/" + jobID, {
        method: 'get',
      })
        .then(async (response) => {
          if (response.status == 200) {
            setJob(response.data.jobs)
          } else {
            // Handle 404
          }
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    GetJob()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.containerHeader}>
        <Text style={styles.heading}>Job Details</Text>
        </View>

        <View style={styles.containerBody}>
        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={styles.label}>Title</Text>
          </View>
          <View style={styles.flexTwo}>
            <Text>{job.title}</Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={styles.label}>Company</Text>
          </View>
          <View style={styles.flexTwo}>
            <Text>{job.company}</Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={styles.label}>Salary</Text>
          </View>
          <View style={styles.flexTwo}>
            <Text>GBP {job.salary}</Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={styles.label}>Posted At</Text>
          </View>
          <View style={styles.flexTwo}>
            <Text>{job.postedAt}</Text>
          </View>
        </View>

        <View style={styles.flexRow}>
          <View style={styles.flexOne}>
            <Text style={styles.label}>Description</Text>
          </View>
          <View style={styles.flexTwo}>
            <Text>{job.description}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Text style={{ color: 'white' }}>Back</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  )
}

export default ViewJobComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },

  heading: {
    color: '#000000',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },

  detailsContainer: {
    width: '90%',
    marginBottom: 15,
  },

  containerHeader: {
    backgroundColor: 'rgb(150,122,161)',
    padding: 15,
    borderTopEndRadius: 7,
    borderTopLeftRadius: 7
  },

  containerBody: {
    backgroundColor: 'rgb(213,198,224)',
    padding: 15,
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7
  },

  flexRow: {
    flexDirection: 'row',
    marginTop: 30
  },

  flexOne: {
    flex: 0.4,
  },

  flexTwo: {
    flex: 0.6,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },

  label: {
    fontWeight: 'bold',
    color: 'black'
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
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },
})