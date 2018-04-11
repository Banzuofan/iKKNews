import React, { Component } from 'react';
import {
    View,
    Alert,
    Button,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    RefreshControl,
    Image,
    ActivityIndicator,
} from 'react-native';


import HeaderButtons from 'react-navigation-header-buttons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArtList } from '../../redux/reducers/ArtListReducer';
import * as NetworkStatus from '../../util/NetworkStatus';
import * as Util from '../../util/Util';
import EmptyHintView from '../../components/EmptyHintView';
import LoadingView from '../../components/LoadingView';
import ArtBidingItem, { ART_BIDING_ITEM_HEIGHT } from '../../components/ArtBidingItem';


class ArtListPage extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params.nav_title,
        }
    };

    state = { selected: (new Map()), refreshing: false };

    _onPressItem = (data) => {
        this.setState(() => {
            const selected = new Map();
            selected.set(data.act_id, !selected.get(data.act_id));
            return { selected };
        });
        // console.warn(data);
        // this.props.navigation.navigate('ArtListPage', {
        //     event_id: data.event_id,
        //     event_name: data.event_name,
        // });
    }

    _renderItems = ({ item }) => {
        return (
            <ArtBidingItem
                itemData={item}
                selected={!!this.state.selected.get(item.act_id)}
                onPressItem={this._onPressItem} />
        );
    }

    _renderEmptyView = () => {
        return (
            <EmptyHintView message='暂无数据' />
        );
    }

    _keyExtractor = (item, index) => String(item.act_id + index)

    render() {
        const { status, error, refreshing, event, recent_bids, data } = this.props;
        
        if (refreshing) {
            return <LoadingView />;
        }

        return (
            <View>
                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    ListEmptyComponent={this._renderEmptyView}
                    getItemLayout={(data, index) => (
                        { length: ART_BIDING_ITEM_HEIGHT, offset: (ART_BIDING_ITEM_HEIGHT + 0) * index, index }
                    )}
                    data={data}
                    extraData={this.state}
                    renderItem={this._renderItems}
                    keyExtractor={this._keyExtractor}
                    indicatorStyle={'white'}
                    removeClippedSubviews={false} />
            </View>
        );
    }

    componentDidMount() {

        const { getArtList, navigation:{state:{params:{event_id, event_name}}} } = this.props;
        if(event_id!==null){
            getArtList(event_id);
        }
    
        if (event_name!==null){
            this.props.navigation.setParams({
                nav_title: event_name,
            });
        }
    }
}

ArtListPage.propsTypes = {
    getArtList: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    event: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    recent_bids: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
}

ArtListPage.defaultProps = {
    refreshing: false,
    status: NetworkStatus.StatusLoading,
    event: {},
    error: {},
    recent_bids: [],
    data: [],
}

//容器组件和子组件传递store方式配置
ArtListPage.contextTypes = {
    store: PropTypes.object,
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        status: state.art_list.status,
        event: state.art_list.event,
        error: state.art_list.error,
        refreshing: state.art_list.refreshing,
        recent_bids: state.art_list.recent_bids,
        data: state.art_list.data,
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        getArtList: (event_id) => dispatch(fetchArtList(event_id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ArtListPage);
