import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, Image, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';


export default function TabTwoScreen() {

const [nbaData, setNbaData] = useState([{}]);
 
    useEffect(() => {
        fetch("http://localhost:3010/GET")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setNbaData(data);
        });
        // axios.get("mongodb://localhost:27017/nba_teams")
        //     .then(response => {
        //       console.log(response.data)
        //         setNbaData(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching NBA data:', error);
        //     });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NBA Teams</Text>
            <FlatList
                data={nbaData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                        />
                        <Text style={styles.text}>Team: {item.name}</Text>
                        <Text style={styles.text}>Wins: {item.wins}</Text>
                        <Text style={styles.text}>Losses: {item.losses}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
    },
});
