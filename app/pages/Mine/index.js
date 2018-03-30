import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
    Alert,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';


let { width, height } = Dimensions.get('window');


const ModalPageTopBar = ({ title, goBackSel }) => {

    return (
        <View style={styles.modalPageTopBar}>
            <View style={styles.leftContainer}></View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.close} onPress={goBackSel}>
                    <Image style={styles.closeImage} source={require('../../../res/img/modal_close.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default class MinePage extends React.PureComponent {

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        console.warn(JSON.stringify(Dimensions.get('screen')));
        return (
            <View style={{ alignItems: 'center' }}>
                <ModalPageTopBar title='设置' goBackSel={this._goBack} />
                <Text style={{ fontSize: 17 }}>setting</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    modalPageTopBar: {
        backgroundColor: '#a1b2c3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: width,
        height: 64,
    },
    titleContainer: {
        flex: 2,
        height: 40,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    close: {
        marginBottom: 5,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    closeImage: {
        width: 15,
        height: 15,
    }
});
