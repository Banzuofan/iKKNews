import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';

import * as Util from '../util/Util';

import { StockColors } from '../constant/Constants';


const StockCodeName = ({ name, code }) => {
    return (
        <View style={styles.codeNameContainer}>
            <Text style={styles.stockName}>{name}</Text>
            <Text style={styles.stockCode}>{code}</Text>
        </View>
    );
}

export default class StockItem extends Component {

    _onPress = () => {
        this.props.onPressItem(this.props.itemData);
    };

    _getFitChangeRangeStyle = (crStr) => {
        var tmpCr = parseFloat(crStr);
        if(tmpCr>0){
            return StyleSheet.flatten([styles.changeRange, styles.changeRangeRedBg]);
        }
        else if(tmpCr<0){
            return StyleSheet.flatten([styles.changeRange, styles.changeRangeGreenBg]);
        }
        return StyleSheet.flatten([styles.changeRange, styles.changeRangeGreyBg]);
    }

    render() {
        const crStyle = this._getFitChangeRangeStyle(this.props.itemData.sortedData)
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.left}>
                        <StockCodeName style={styles.stockName} name={this.props.itemData.name} code={this.props.itemData.code} />
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.price}>{parseFloat(this.props.itemData.price).toFixed(2)}</Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={crStyle}>{Util.formatChangeRange(this.props.itemData.sortedData)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        paddingLeft: 15,
        flex: 1.5,
    },
    middle: {
        flex: 1,
    },
    right: {
        flex: 1,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    price: {
        textAlign: 'right',
        paddingRight: 20,
        fontSize: 17,
        fontWeight: 'bold',
    },
    changeRange: {
        textAlign: 'right',
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: StockColors.grey,
    },
    changeRangeRedBg: {
        backgroundColor: StockColors.red,
    },
    changeRangeGreenBg: {
        backgroundColor: StockColors.green,
    },
    changeRangeGreyBg: {
        backgroundColor: StockColors.grey,
    },
    codeNameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 2,
    },
    stockName: {
        fontSize: 16,
    },
    stockCode: {
        marginTop: 4,
        fontSize: 12,
        color: 'grey',
    },
});
