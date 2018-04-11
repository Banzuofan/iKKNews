import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';


 const TwoTextItem = ({ top, bottom }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.top}>{top}</Text>
            <Text style={styles.bottom}>{bottom}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 2,
    },
    top: {
        fontSize: 16,
        color: '#222222',
        textDecorationLine: 'line-through',
    },
    bottom: {
        marginTop: 4,
        fontSize: 12,
        color: 'grey',
    },
});

export default TwoTextItem;