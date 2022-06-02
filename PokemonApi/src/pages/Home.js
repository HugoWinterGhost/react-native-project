import React, { useEffect, useState } from "react"
import { Text, View, Button, FlatList } from "react-native"
import {SearchBar} from 'react-native-elements';

import { useDispatch, useSelector } from "react-redux"
import AnimatedSplash from "react-native-animated-splash-screen";
import styles from "../styles/StyleSheet"
import { fetchPokemons } from "../../redux/Requests"
import PokemonCard from "../components/card"

export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const pokemons = useSelector(state => state.pokemons)
  const filtered = useSelector(state => state.pokemons)
  const loading = useSelector(state => state.loading)
  const next = useSelector(state => state.next)

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchPokemons(next));
    }

    fetchData();
  }, [next, dispatch])

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    let resultFiltered = pokemons.filter((pokemon) => {
      pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
    dispatch(filtered(resultFiltered));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text__title}>Bienvenue sur le Pokemon API</Text>

      <SearchBar
        containerStyle={styles.searchBarParent}
        inputStyle={styles.searchBarChild}
        placeholder="Rechercher un pokémon"
        onChangeText={this.onChangeSearch}
        value={searchQuery}
        lightTheme
        platform="ios"
        cancelButtonTitle="Annuler"
      />
      
      <FlatList
        data={filtered}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  )
}