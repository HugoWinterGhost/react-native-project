import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/StyleSheet";
import { pokemonColors } from "../../redux/Requests";
import About from "../components/about";
import Stats from "../components/baseStats";

export default function Detail({ navigation, route }) {
  const item = route.params
  const [menu, setMenu] = useState("About")

  const pokemonColor = pokemonColors[item.type];
  const bgStyles = { ...styles.container, backgroundColor: pokemonColor };

  const listMenuInfo = [
    {
      option: "Détails"
    },
    {
      option: "Stats"
    }
  ]

  const setMenuOption = menu => {
    return setMenu(menu)
  }

  const btnActive = {
    color: pokemonColor,
  }

  return (
    <View style={bgStyles}>
      <Text style={styles.text__titleDetail}>{item.name}</Text>
      <View style={styles.detailRow}>
        <View style={styles.detailChildRow}>
          {item.types ?
            item.types.map((type, idx) => {
              return (
                <View key={idx} style={styles.detailItemType}>
                  <Text style={styles.detailItemText}>{type.type.name}</Text>
                </View>
              )
            })
            : <View></View>}
        </View>
        <View style={styles.detailParentView}>
          <Text style={styles.detailParentText}>
              #{`${item.id}`.padStart(3, 0)}
          </Text>
        </View>
      </View>
      <View style={styles.detailImageParent}>
        <Image
            style={styles.detail__imagePokemon}
            source={{ uri: item.imgUrl }}
        />
      </View>
      <View style={styles.container__moves}>
        <SafeAreaView style={styles.detail__containerInfo}>
          <View style={styles.detail__listTab}>
            {
              listMenuInfo.map(e => {
                return (
                  <TouchableOpacity key={e.option} 
                    style={[
                      styles.detail__btnTab, menu === e.option && 
                      { borderBottomWidth: 1, borderBottomColor: pokemonColor }
                    ]} onPress={() => setMenuOption(e.option)}>
                    <Text 
                      style={[
                        styles.detail__textTab, menu === e.option && btnActive
                      ]}>{e.option}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
          <View>
            <View style={styles.detailMenuAction}>
                {menu === "Détails" ?
                  <About item={item}></About> : <View></View>
                }

                {menu === "Stats" ?
                  <Stats item={item}></Stats> : <View></View>
                }
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}