import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
    Image,
    Button,
    StatusBar
} from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';


export default class RootPage extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'HIHEY',
            headerRight: (
                <HeaderButtons color="white">
                    <HeaderButtons.Item
                        title="about"
                        IconElement={<Image style={{ width: 28, height: 28, marginRight: 10 }}
                            source={require('../../../res/img/app_info_icon.png')} />} onPress={params?params.OpenAbout:() => Alert.alert('null')} />
                </HeaderButtons>
            ),
        }
    };

    _openAbout = () => {
        if(this.props.navigation){
            this.props.navigation.navigate('About');
        }
    }

    componentWillMount() {
        this.props.navigation.setParams({ OpenAbout: this._openAbout });
    }

    render() {
        return (
            <View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#6a51ae"
                />
                <Button title='ArtCatalog' onPress={() => this.props.navigation.navigate('ArtCatalog')} />
            </View>
        )
    }
}
