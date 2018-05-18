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
import ApplicantItem from "../component/ApplicantItem";
import {getNode} from "../../../services/getNode"

const images = {
    back: require("../../../assets/designer/left.png"),
}

@connect(state => ({store: state}))
class DeliveryBox extends Component {
    static navigationOptions = ({navigation: {goBack, state}}) => ({
        headerTitle: '投递箱',
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

  constructor() {
    super();
    this.state = {
      infoId: '',
    };
  }

    componentWillMount() {
        const {params} = this.props.navigation.state;
        const {dispatch} = this.props;
        this.setState({infoId:params.uniqueid});
        dispatch({type: 'applicantList/refreshList', uniqueid: params.uniqueid});
    }

    _onRefresh = () => {
        const {params} = this.props.navigation.state;
        const {dispatch} = this.props;
        dispatch({type: 'applicantList/refreshList', uniqueid: params.uniqueid});
    }

    _onPressItem = (id) => {
        const {dispatch} = this.props;
        getNode(id, (name) => {
            const navigateAction = NavigationActions.navigate({
                routeName: 'DesignerDetail',
                params: {
                    infoId: this.state.infoId,
                    id: id,
                    name: name,
                },
            });
            dispatch(navigateAction);
        });
    }

    render() {
        const {applicantList} = this.props.store;
        return (
            !applicantList.isRefreshing ?
                <View style={{flex: 1}}>
                    <FlatList
                        data={applicantList.applicants}
                        refreshing={false}
                        onRefresh={this._onRefresh}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) =>
                            <ApplicantItem
                                avatar={item.avatar}
                                username={item.username}
                                uniqueid={item.uniqueid}
                                time={item.time}
                                upload={item.upload}
                                onPressItem={this._onPressItem}/>
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
export default DeliveryBox;