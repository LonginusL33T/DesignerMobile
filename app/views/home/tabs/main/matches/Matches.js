import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ListView,
    Image,
    WebView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import MatchItem from "./MatchItem";
import {NavigationActions} from 'react-navigation'
import DeviceStorage from '../../../../../utils/DeviceStorage'
import Consts from '../../../../../config/consts'

@connect(state => ({store: state}))
class Matches extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch({type: 'matchesList/refreshList'});
    }

    _onPressItem = (id) => {
        const {dispatch} = this.props;
        DeviceStorage.get(Consts.localStorage.USERCATEGORY).then((val) => {
            const navigateAction = NavigationActions.navigate({
                routeName: 'MatchDetail',
                params: {
                    uuid: id,
                    category: val
                },
            });
            dispatch(navigateAction);
        });
    };

    _onRefresh = () => {
        const {dispatch} = this.props;
        dispatch({type: 'matchesList/refreshList'});
    };

    render() {
        const {matchesList} = this.props.store;
        return (
            !matchesList.isRefreshing ?
                <View style={{flex: 1}}>
                    <FlatList
                        data={matchesList.matches}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) =>
                            <MatchItem
                                isFirst={index === 0}
                                uuid={item.uniqueid}
                                avatar={item.avatar}
                                category={item.category}
                                jobDetail={item.job_detail}
                                enterpriseNature={item.enterprise_nature}
                                tags={item.tags}
                                address={item.address}
                                onPressItem={this._onPressItem}
                            />
                        }/>
                </View> :
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#aaaaaa"/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
export default Matches;

