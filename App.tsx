/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// Screen Imports
import AddJobComponent from './components/AddJobComponent';
import ListJobsComponent from './components/ListJobsComponent';
import UpdateJobComponent from './components/UpdateJobComponent';
import ViewJobComponent from './components/ViewJobComponent';

// Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Font Awsome Imports
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons/faCodePullRequest'

import store, { rootState } from './redux/store';
import { Provider } from 'react-redux';

interface Job {
  id: 0,
  title: string;
  description: string;
  salary: number;
  company: string;
  postedAt: string
}

export type RootStackParamList = {
  ListJobsComponent: undefined,
  AddJobComponent: undefined,
  ViewJobComponent: { jobID: number },
  UpdateJobComponent: { job: Job },
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  )
}

const JobStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='ListJobsComponent' component={ListJobsComponent} />
      <Stack.Screen name='ViewJobComponent' component={ViewJobComponent} />
      <Stack.Screen name='UpdateJobComponent' component={UpdateJobComponent} />
    </Stack.Navigator>
  )
}

function AppInner() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            if (route.name === 'Jobs') {
              return <FontAwesomeIcon icon={faList} />;
            } else if (route.name === 'Add') {
              return <FontAwesomeIcon icon={faCodePullRequest} />;
            }
          },
        })}
      >
        <Tab.Screen options={{ headerShown: false }} name='Jobs' component={JobStack} />
        <Tab.Screen options={{ headerShown: false }} name='Add' component={AddJobComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
