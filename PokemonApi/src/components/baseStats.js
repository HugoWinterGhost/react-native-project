import React, { useState, useEffect } from "react";
import { Text, View, ScrollView} from "react-native";
import styles from "../styles/StyleSheet";
import { ProgressBar, Colors } from 'react-native-paper';

export default function Stats(props) {
    const { item } = props

    return (
        <ScrollView>
            {
                item.stats.map((stat, idx) => {
                    return (
                        <View key={idx} style={styles.statViewParent}>
                            <Text style={styles.stats__title}>
                              {stat.stat.name[0].toUpperCase() + stat.stat.name.substring(1)}
                            </Text>
                            <Text style={styles.stats__text}>{stat.base_stat}</Text>
                            <View style={styles.statProgressBar}>
                              <ProgressBar progress={stat.base_stat / 100} color={Colors.grey800} />
                            </View>
                        </View>

                    )
                })
            }
        </ScrollView>
    )
}