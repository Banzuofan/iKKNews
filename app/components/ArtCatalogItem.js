import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground
} from 'react-native';

import * as Util from '../util/Util';

export default class ArtCatalogItem extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.itemData);
    };

    _formatDate = (intervalStr) =>{
        return Util.dateFmt('MM-dd hh:mm', intervalStr);
    }

    render() {
        const { event_name, image, start_time, end_time, bid_count, views_count, all_money } = this.props.itemData;
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.container}>
                    <ImageBackground style={styles.backgroundImage} source={{ url: image }}>
                        <View style={styles.top}>
                            <View style={styles.topRight}>
                                <View style={StyleSheet.flatten([styles.item, styles.itemRed])}><Text style={styles.itemText}>{this._formatDate(start_time)}</Text></View>
                                <View style={StyleSheet.flatten([styles.item, styles.itemGreen])}><Text style={styles.itemText}>{this._formatDate(end_time)}</Text></View>
                                <View style={styles.item}><Text style={styles.itemText}>{`${bid_count}出价`}</Text></View>
                                <View style={styles.item}><Text style={styles.itemText}>{`${views_count}围观`}</Text></View>
                                <View style={styles.item}><Text style={styles.itemText}>{`${all_money}总成交额`}</Text></View>
                            </View>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={styles.title}>{event_name}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    }
}

const designedItemHeight = 210;
const screenWidthForDesign = 375.0;
const screenHeightForDesign = 667.0;
let { width, height } = Dimensions.get('window');

const fitSizeToDesign = (rawSize) => {
    return rawSize * width / screenWidthForDesign;
}

export const ART_CATALOG_ITEM_HEIGHT = fitSizeToDesign(designedItemHeight) + StyleSheet.hairlineWidth * 10;

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth*10,
        flex: 1,
        height: ART_CATALOG_ITEM_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        height: fitSizeToDesign(designedItemHeight),
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    top: {
        // backgroundColor:'#rgba(26,0,153, 0.8)',
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
    },
    topRight: {
        width: 220,
        // backgroundColor: '#rgba(122,33,15, 0.6)',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        // paddingBottom: 20,
    },
    item: {
        paddingVertical: 1.5,
        paddingHorizontal: 8,
        backgroundColor: '#rgba(50,50,50,0.5)',
        margin:4, 
        borderRadius: 5,
    },
    itemRed: {
        backgroundColor: '#FC3438',
    },
    itemGreen: {
        backgroundColor: '#1AAE52',
    },
    itemText: {
        fontSize: 11,
        color: 'white',
    },
    bottom: {
        backgroundColor: '#rgba(50, 50, 50, 0.5)',
        height: 50,
    },
    title: {
        flex:1,
        textAlign: 'center',
        paddingTop: 10,
        color: 'white',
        fontWeight: 'bold',
    }
});
