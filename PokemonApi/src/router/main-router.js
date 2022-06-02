import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './main-stack'
import { useDispatch, useSelector } from "react-redux"
import SplashScreen from '../pages/SplashScreen'

export default () => {
  const loading = useSelector(state => state.loading);

  if (loading) {
    return <SplashScreen />
  }
  
  return <NavigationContainer>
    <MainStackNavigator />
  </NavigationContainer>
}