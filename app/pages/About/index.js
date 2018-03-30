import React, { Component } from 'react';
import {
    View,
    Alert,
    Button,
    Text,
} from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as Actions from '../../redux/actions/CounterActions';

import { incrAction, decrAction, reset} from '../../redux/ReduxActions';
import { fetchArtCatalog } from '../../redux/reducers/ArtReducer';



class AboutPage extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: 'NEWS',
            headerRight: (
                <HeaderButtons color="white">
                    <HeaderButtons.Item style={{ width: 30, height: 30 }} title="➕" onPress={() => params.OnIncreaseClick()} />
                    <HeaderButtons.Item style={{ width: 30, height: 30 }} title="➖" onPress={() => params.OnDecreaseClick()} />
                </HeaderButtons>
            ),
        }
    };

    componentWillMount() {
        fetchArtCatalog();
        
        const {onDecreaseClick, onIncreaseClick} = this.props;
        this.props.navigation.setParams({ OnIncreaseClick: onIncreaseClick, OnDecreaseClick: onDecreaseClick });   
    }

    render() {
        const {value, onReset} = this.props;
        console.warn(JSON.stringify(this.context.store.getState()));
        return (
            <View>
                AboutPage
                <Text style={{textAlign:'center', fontSize:28}}>{value}</Text>
                <Button title='Reset' onPress={onReset} />
            </View>
        )
    }

    componentWillUnmount () {
        const { onReset } = this.props;
        if(onReset!=null){
            onReset();
        }
    }
}

AboutPage.propsTypes = {
    value: PropTypes.number.isRequired,
    onDecreaseClick: PropTypes.func.isRequired,
    onIncreaseClick: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
}

AboutPage.defaultProps = {
    value: 0,
}

//容器组件和子组件传递store方式配置
AboutPage.contextTypes = {
    store: PropTypes.object
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        // value: state.counter.count
        value: state.ra_counter.counter,
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        // onIncreaseClick: () => dispatch(Actions.increaseAction()),
        // onDecreaseClick: () => dispatch(Actions.decreaseAction())
        onIncreaseClick: () => dispatch(incrAction()),
        onDecreaseClick: () => dispatch(decrAction()),
        onReset: () => dispatch(reset()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(AboutPage);
