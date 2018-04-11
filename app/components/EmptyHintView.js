import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
} from 'react-native';

export default class EmptyHintView extends Component {

    render() {
        const {message} = this.props;
        return (
            <View style={styles.container}>
                <Image style={styles.img} resizeMode='center' source={require('../../res/img/no_data.png')} />
                <Text style={styles.text}>{message}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
    },
    img: {
        
    },
    text: {
        color: '#666666',
        fontSize: 16,
    }
});
