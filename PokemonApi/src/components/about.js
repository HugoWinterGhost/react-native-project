import React, {useState, useEffect} from "react";
import { Text, View,  } from "react-native";
import styles from "../styles/StyleSheet";

export default function About(props) {
    const {item} = props
    const [abilities, setAbilities] = useState([])

    return (
        <View>
            <View style={styles.aboutItemRow}>
                <Text style={styles.about__title}>Species</Text>
                <Text style={styles.about__text}>{item.species}</Text>
            </View>

            <View style={styles.aboutItemRow}>
                <Text style={styles.about__title}>Height</Text>
                <Text style={styles.about__text}>{item.height} ''</Text>
            </View>

            <View style={styles.aboutItemRow}>
                <Text style={styles.about__title}>Weight</Text>
                <Text style={styles.about__text}>{item.weight} lbs</Text>
            </View>

            <View style={styles.aboutItemRow}>
                <Text style={styles.about__title}>Abilities</Text>
                <Text style={styles.about__text}>{abilities.join(', ')}</Text>
            </View>
        </View>
    )
}