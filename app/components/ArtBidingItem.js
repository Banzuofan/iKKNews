import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    Button
} from 'react-native';
import TwoTextItem from './TwoTextItem';


let { width, height } = Dimensions.get('window');

const BgColorButton = ({onPress, text}) =>(
    <TouchableOpacity style={{backgroundColor:'#222222', paddingHorizontal:15, paddingVertical:8}} onPress={onPress}>
        <Text style={{color:'white', textAlign:'center', fontSize: 16, fontWeight:'bold'}}>{text}</Text>
    </TouchableOpacity>
);

export default class ArtBidingItem extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.itemData);
    };

    render() {
        const { 
            goods_img, 
            brand_name, 
            act_name, 
            shop_price, 
            deposit } = this.props.itemData;

        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.container}>

                    <View style={styles.contentView}>
                        <View style={styles.top}>
                            <ImageBackground style={styles.backgroundImage} resizeMode='contain' source={{ url: goods_img }}>

                            </ImageBackground>
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.bottomTop}><Text style={styles.bottomTopText}>{`${brand_name} : ${act_name}`}</Text></View>
                            <View style={styles.bottomBottom}>
                                <View style={styles.bottomBottomLeft}>
                                    <TwoTextItem top={`估价  ￥${shop_price}`} bottom={`保证金:￥${deposit}`} />
                                </View>
                                <View style={styles.bottomBottomRight}>
                                    <BgColorButton text='出价' />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export const ART_BIDING_ITEM_HEIGHT = (width-20)+100;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: ART_BIDING_ITEM_HEIGHT,
    },
    contentView: {
        borderBottomColor: 'lightgrey',
        borderRadius: 3,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    top: {
        flex: 3,
    },
    backgroundImage: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    bottomTop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomTopText: {
        color:'grey',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    bottomBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    bottomBottomLeft: {
        flex: 1,
    },
    bottomBottomRight: {
        flex: 1,
    }
});