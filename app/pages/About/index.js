import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';


export default class AboutPage extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        return {
            title: '关于',
        }
    };

    render() {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }
}
