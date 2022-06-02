import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Detail from './src/pages/Detail';
import styles from './src/styles/StyleSheet';
import store from './redux/Store';
import Router from './src/router/main-router';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from "react-redux"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor="transparent" barStyle="dark-content" />
        <Router />
      </View>
    </Provider>
  );
}


