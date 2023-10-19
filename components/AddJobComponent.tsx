import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import ApiManager from '../api/api_manager'
import { appendJobs } from '../redux/job_slice'


const AddJobComponent = () => {

  const dispatch = useDispatch()

  // Function level state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [salary, setSalary] = useState('')
  const [company, setCompany] = useState('')

  const CreateAlert = (heading: string, msg: string) => {
    Alert.alert(heading, msg, [{ text: 'OK' }])
  }

  const AddJob = async () => {
    if (title.trim() === '' || description.trim() === '' || company.trim() === '') {
      CreateAlert("Invalid Input", "Please make sure you have filled all the fields")
    }

    try {
      await ApiManager("/jobs", {
        method: 'post',
        data: {
          title: title,
          description: description,
          salary: salary,
          company: company
        }
      })
        .then(async (response) => {
          if (response.status == 200) {
            dispatch(appendJobs({
              title: title,
              description: description,
              salary: salary,
              company: company,
              postedAt: new Date().toISOString()
            }))

            // Reset State
            setTitle('')
            setDescription('')
            setCompany('')
            setSalary('')

            CreateAlert("Success", "Job has been added successfully")
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
    <View style={styles.container}>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.heading}>Post a new Job</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Title'
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Description'
                value={description}
                onChangeText={text => setDescription(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Salary'
                value={salary}
                onChangeText={text => setSalary(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Company'
                value={company}
                onChangeText={text => setCompany(text)}
                style={styles.input}
                placeholderTextColor={'grey'}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => AddJob()}
                style={styles.button}
              >
                <Text style={{ color: 'white' }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AddJobComponent

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

  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 30
  },

  inputContainer: {
    width: '90%',
  },

  input: {
    backgroundColor: '#f9f9f9',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    marginTop: 5,
  },

  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20 
  },

  button: {
    backgroundColor: 'rgb(122,142,238)',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
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
    alignItems: 'center'
  },

  cardBody: {
    backgroundColor: 'rgb(213,198,224)',
    padding: 15,
    borderBottomEndRadius: 7,
    borderBottomLeftRadius: 7
  },
})