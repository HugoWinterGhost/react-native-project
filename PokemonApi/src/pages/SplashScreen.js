import React, {useEffect} from "react"
import { Text, View, Button, FlatList, Searchbar, Image } from "react-native"
import AnimatedSplash from "react-native-animated-splash-screen";
import { useDispatch, useSelector } from "react-redux"
import styles from "../styles/StyleSheet"
import logo from "../../assets/logo.png"

export default function SplashScreen() {
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => dispatch({ type: 'LOADING/SETLOADING' }), 3000)
  })

  return (
    <Image source={logo} style={styles.splashScreen__logo} />
  )
}