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
class ApplyRecord extends Component {
    static navigationOptions = ({navigation: {goBack, state}}) => ({
        headerTitle: '应聘记录',
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
        DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
            dispatch({type: 'applyList/refreshList', x_token: val});
        })
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

    _onRefresh = () => {
        const {dispatch} = this.props;
        DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
            dispatch({type: 'applyList/refreshList', x_token: val});
        })
    }

    render() {
        //从总体state中取出isRefreshing值用以判断是否刷新
        const {applyList} = this.props.store;
        return (
            !applyList.isRefreshing ?
                <View style={{flex: 1}}>
                    <FlatList
                        data={applyList.applys}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) =>
                            <RecruitItem
                                type="user"
                                isFirst={index === 0}
                                avatar={item.avatar}
                                category={item.category}
                                time={item.time}
                                jobDetail={item.job_detail}
                                address={item.address}
                                enterPriseNature={item.enterprise_nature}
                                uniqueid={item.uniqueid}
                                status={item.status}
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
export default ApplyRecord;