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
import Toast from 'react-native-root-toast';

import { fetchArtCatalog } from '../../redux/reducers/ArtReducer';
import * as NetworkStatus from '../../util/NetworkStatus';
import * as Util from '../../util/Util';
import ArtCatalogItem, { ART_CATALOG_ITEM_HEIGHT } from '../../components/ArtCatalogItem';
import EmptyHintView from '../../components/EmptyHintView';
import LoadingView from '../../components/LoadingView';


let { width, height } = Dimensions.get('window');

class ArtCatalogPage extends React.PureComponent {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: '热拍中',
            headerRight: (
                <HeaderButtons color="white">
                    <HeaderButtons.Item style={{ width: 30, height: 30 }} title="toTop" IconElement={<Image style={{ width: 28, height: 28, marginRight: 10 }}
                        source={require('../../../res/img/to_top.png')} />} onPress={() => params.OnToTop()} />
                    <HeaderButtons.Item style={{ width: 30, height: 30 }} title="toEnd" IconElement={<Image style={{ width: 28, height: 28, marginRight: 10 }}
                        source={require('../../../res/img/to_end.png')} />} onPress={() => params.OnToEnd()} />
                </HeaderButtons>
            ),
        }
    };

    state = { selected: (new Map()), refreshing: false };


    _onScrollToEnd = () => {
        if(this._flatList!=null){
            this._flatList.scrollToEnd({ animated: false });
        }
    }

    _onScrollToTop = () => {
        if(this._flatList!=null){
            this._flatList.scrollToIndex({ viewPosition: 0, index: 0, animated: false });
        }
    }

    _onRefresh = () => {
        const { fetchCatalog } = this.props;
        fetchCatalog(0);
    }

    _onReachEnd = (info) => {
        const { fetchCatalog, next } = this.props;
        // console.warn(info);
        fetchCatalog(next);
    }

    _onPressItem = (data) => {
        this.setState(() => {
            const selected = new Map();
            selected.set(data.event_id, !selected.get(data.event_id));
            return { selected };
        });
        // console.warn(data);
        this.props.navigation.navigate('ArtListPage', { 
            event_id: data.event_id,
            event_name: data.event_name,
        });
    }

    _renderItems = ({ item }) => {

        return (
            <ArtCatalogItem
                itemData={item}
                selected={!!this.state.selected.get(item.event_id)}
                onPressItem={this._onPressItem} />
        );
    }

    _keyExtractor = (item, index) => String(item.event_id + index)

    _renderFooter = () => {
        return (
            <View style={{ paddingVertical: 40 }}>
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    _renderSeparator = () => {
        return (
            <View style={{ height: 5, width: '100%', backgroundColor: '#ccc' }} />
        );
    };

    _renderEmptyView = () => {
        return (
            <EmptyHintView message='暂无数据' />
        );
    }

    componentDidMount() {
        const { fetchCatalog, next } = this.props;
        fetchCatalog(next);

        this.props.navigation.setParams({ 
            OnToTop: this._onScrollToTop, 
            OnToEnd: this._onScrollToEnd });
    }

    render() {
        const { status, error, refreshing, events, } = this.props;
        // http://www.hihey.com/api2/api_event_v2.php?size=20&start=0

        // Bad code
        // if (status === NetworkStatus.StatusLoading){
        //     return <Text>loading...</Text>;
        // }

        if(refreshing && events.length===0){
            return <LoadingView />;
        }
        else{
            if (status === NetworkStatus.StatusFailed) {
                return <Text style={{ color: 'red', fontSize: 28 }}>request failed with error:{JSON.stringify(error)}</Text>;
            }
        } 

        return (

            <View style={styles.container}>

                {/* 这是一段非常坑的代码，因为条件渲染所以引起了FlatList的重绘，所以上拉加载更多的时候数据正常了但是列表滚动到了顶部 */}

                {/* {status === NetworkStatus.StatusLoading &&
                    <Text>loading...</Text>
                }

                {status === NetworkStatus.StatusFailed &&
                    <Text style={{ color: 'red', fontSize: 28 }}>request failed with error:{JSON.stringify(error)}</Text>
                }

                {status === NetworkStatus.StatusSuccess &&
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        ItemSeparatorComponent={this._renderSeparator}
                        ListFooterComponent={this.renderFooter}
                        getItemLayout={(data, index) => (
                            { length: ART_CATALOG_ITEM_HEIGHT, offset: (ART_CATALOG_ITEM_HEIGHT+5) * index, index }
                        )}
                        data={events}
                        extraData={this.state}
                        renderItem={this._renderItems}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={-0.1}
                        onEndReached={this._onReachEnd}
                        indicatorStyle={'white'}
                        removeClippedSubviews={false}/>
                } */}

                <FlatList
                    style={styles.list}
                    ref={(flatList) => this._flatList = flatList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    ListEmptyComponent={this._renderEmptyView}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    getItemLayout={(data, index) => (
                        { length: ART_CATALOG_ITEM_HEIGHT, offset: (ART_CATALOG_ITEM_HEIGHT + 5) * index, index }
                    )}
                    data={events}
                    extraData={this.state}
                    renderItem={this._renderItems}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={-0.1}
                    onEndReached={this._onReachEnd}
                    indicatorStyle={'white'}
                    removeClippedSubviews={false} />
            </View>
        )
    }
}

ArtCatalogPage.propsTypes = {
    refreshing: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    events: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired,
    fetchCatalog: PropTypes.func.isRequired,
    curr: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired,
}

ArtCatalogPage.defaultProps = {
    refreshing: false,
    status: NetworkStatus.StatusLoading,
    events: [],
    error: {},
    curr: 0,
    next: 0,
}

//容器组件和子组件传递store方式配置
ArtCatalogPage.contextTypes = {
    store: PropTypes.object,
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        status: state.art_catalog.status,
        events: state.art_catalog.events,
        error: state.art_catalog.error,
        refreshing: state.art_catalog.refreshing,
        curr: state.art_catalog.curr,
        next: state.art_catalog.next,
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        fetchCatalog: (pageNo) => dispatch(fetchArtCatalog(pageNo)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ArtCatalogPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

