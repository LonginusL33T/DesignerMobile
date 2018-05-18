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
    Alert,
} from 'react-native';
import {connect} from 'react-redux';
import RecruitItem from "../component/RecruitItem";
import DeviceStorage from "../../../utils/DeviceStorage";
import Consts from "../../../config/consts";
import {NavigationActions} from 'react-navigation'


const images = {
    back: require("../../../assets/designer/left.png"),
}

@connect(state => ({store: state}))
class RecruitRecord extends Component {
    static navigationOptions = ({navigation: {goBack, state}}) => ({
        headerTitle: '发布记录',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerRight: (
            <View></View>
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        }
    });

    componentWillMount() {
        const {dispatch} = this.props;
        DeviceStorage.get(Consts.localStorage.UNIQUEID).then((val) => {
            dispatch({type: 'recruitList/refreshList', uniqueid: val});
        })
    }

    _onPressDelete = (uniqueid) => {
        const {dispatch} = this.props;
        Alert.alert('温馨提醒', '确定删除？', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                dispatch({type: 'recruitList/deleteRecruit', uniqueid: uniqueid});
            }
            },
        ]);
    }

    _onPressItem = (id) => {
        const {dispatch} = this.props;
        const navigateAction = NavigationActions.navigate({
            routeName: 'MatchDetail',
            params: {
                uuid: id,
            },
        });
        dispatch(navigateAction);
    }

    _onPressDeliveryBox = (uniqueid) => {
        const {dispatch} = this.props;
        const navigateAction = NavigationActions.navigate({
            routeName: 'DeliveryBox',
            params: {
                uniqueid: uniqueid,
            },
        });
        dispatch(navigateAction);
    }

    _onRefresh = () => {
        const {dispatch} = this.props.navigation;
        DeviceStorage.get(Consts.localStorage.UNIQUEID).then((val) => {
            console.log(val);
            dispatch({type: 'recruitList/refreshList', uniqueid: val});
        })
    }

    render() {
        const {recruitList} = this.props.store;
        return (
            !recruitList.isRefreshing ?
                <View style={{flex: 1}}>
                    <FlatList
                        data={recruitList.recruits}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) =>
                            <RecruitItem
                                type="company"
                                isFirst={index === 0}
                                avatar={item.avatar}
                                applyCount={item.apply_count}
                                jobDetail={item.job_detail}
                                address={item.address}
                                enterPriseNature={item.enterprise_nature}
                                time={item.time}
                                category={item.category}
                                uniqueid={item.uniqueid}
                                onPressDeliveryBox={this._onPressDeliveryBox}
                                onPressDelete={this._onPressDelete}
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
    navBarLeft: {
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 30,
    },
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
export default RecruitRecord;