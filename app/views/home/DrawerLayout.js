import React, {Component} from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import DeviceStorage from '../../utils/DeviceStorage'
import Consts from '../../config/consts'


const images = {
    avatar: require('../../assets/designer/ry_big.png'),
    feedback: require('../../assets/designer/feedback.png')
}
@connect(state => ({store: state}))
class DrawerLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectIndex: -1,
            userCategory: '',
            name: '',
            avatar: '',
        }
    }

    componentDidMount () {
        const {dispatch} = this.props;
        const {userInfo} = this.props.store;
        DeviceStorage.get(Consts.localStorage.USERCATEGORY).then((val) => {
            this.setState({
                userCategory: val,
            });
        })
        DeviceStorage.get(Consts.localStorage.NAME).then((val) => {
            this.setState({
                name: val,
            });
        })
        //拉出抽屉菜单时判断用户头像不存在时调用接口升级头像信息
        if(userInfo.avatar === 'noresouce') {
            DeviceStorage.get(Consts.localStorage.AVATAR).then((val) => {
                dispatch({type: 'userInfo/updateAvatar', payload: val});
            })
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const {userInfo} = this.props.store;
        return (
            <View style={{flex: 1, backgroundColor: '#000'}}>
                <ScrollView>
                    <View>
                        <View style={styles.avatarContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => navigate('UpdateAvatar',{isUploadShow:false})}>
                                {userInfo.avatar !== 'noresouce' ?
                                    <Image source={{uri: userInfo.avatar}} style={styles.avatar}/> :
                                    <Image source={images.avatar} style={styles.avatar}/>
                                }
                            </TouchableOpacity>
                            <Text style={styles.username}>{this.state.name}</Text>
                        </View>
                        {(this.state.userCategory === 'user' ? userDrawerItems : companyDrawerItems).map((item, index, array) => {
                            return (
                                <View key={'item' + index}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={styles.itemContainer}
                                        onPress={() => {
                                            item.onPress(this.props.navigation);
                                        }
                                        }>
                                        {item.image ?
                                            <View style={styles.iconContainer}><Image source={item.image}/></View> :
                                            <Icon name="ios-power-outline" size={20} style={styles.logout}/>}
                                        <Text style={[styles.itemText,
                                            index === this.state.selectIndex ? {color: '#cf6d05'} : null]}>
                                            {item.text}</Text>
                                    </TouchableOpacity>
                                    {array.length !== index + 1 ? <Text style={styles.divider}></Text> : null}
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.modifyPassword}
                    onPress={()=>{navigate('ModifyPassword')}}>
                    <Image source={require('../../assets/designer/lockpassword.png')}/>
                </TouchableOpacity>
            </View>
        );
    }
}
//普通用户的抽屉菜单
const userDrawerItems = [
/*    {
        image: require('../../assets/designer/resume_edit.png'),
        text: '简历编辑',
    },
    {
        image: require('../../assets/designer/tags.png'),
        text: '标签设置',
    },*/
    {
        image: require('../../assets/designer/record.png'),
        text: '应聘记录',
        onPress: ({navigate}) => {
            navigate('DrawerClose');
            navigate('ApplyRecord');
        }
    },
    {
        image: images.feedback,
        text: '反馈',
        onPress: ({navigate}) => {
            navigate('DrawerClose');
            navigate('FeedBack');
        }
    },
    {
        text: '退出',
        onPress: ({navigate, dispatch}) => {
            Alert.alert('温馨提醒', '确认退出吗？',[
                {text: '取消'},
                {text: '确定', onPress: () => {
                    navigate('DrawerClose');
                    navigate('Login');
                    dispatch({type: 'userInfo/updateLoginState', payload: false});
                    dispatch({type: 'top100designerList/refreshList'});
                    DeviceStorage.save(Consts.localStorage.ISLOGIN, false);
                    DeviceStorage.delete(Consts.localStorage.X_TOKEN);
                    DeviceStorage.delete(Consts.localStorage.USERCATEGORY);
                    DeviceStorage.delete(Consts.localStorage.NAME);
                    DeviceStorage.delete(Consts.localStorage.AVATAR);
                    //DeviceStorage.delete(Consts.localStorage.USERNAME);
                    DeviceStorage.delete(Consts.localStorage.PASSWORD);
                    DeviceStorage.delete(Consts.localStorage.UNIQUEID);
                }},
            ]);
        }
    },
];
//企业用户的抽屉菜单
const companyDrawerItems = [
/*    {
        image: require('../../assets/designer/resume_edit.png'),
        text: '企业信息',
    },*/
    {
        image: require('../../assets/designer/tags.png'),
        text: '招聘需求',
        onPress: ({navigate}) => {
            navigate('DrawerClose');
            navigate('MatchRequire');
        }
    },
    {
        image: require('../../assets/designer/record.png'),
        text: '发布记录',
        onPress: ({navigate}) => {
            navigate('DrawerClose');
            navigate('RecruitRecord');
        }
    },
    {
        image: images.feedback,
        text: '反馈',
        onPress: ({navigate}) => {
            navigate('DrawerClose');
            navigate('FeedBack');
        }
    },
    {
        text: '退出',
        onPress: ({navigate, dispatch}) => {
            Alert.alert('温馨提醒', '确认退出吗？', [
                {text: '取消'},
                {
                    text: '确定', onPress: () => {
                    navigate('DrawerClose');
                    navigate('Login');
                    dispatch({type: 'userInfo/updateLoginState', payload: false});
                    dispatch({type: 'top100designerList/refreshList'});
                    DeviceStorage.save(Consts.localStorage.ISLOGIN, false);
                    DeviceStorage.delete(Consts.localStorage.X_TOKEN);
                    DeviceStorage.delete(Consts.localStorage.USERCATEGORY);
                    DeviceStorage.delete(Consts.localStorage.NAME);
                    DeviceStorage.delete(Consts.localStorage.AVATAR);
                    //DeviceStorage.delete(Consts.localStorage.USERNAME);
                    DeviceStorage.delete(Consts.localStorage.PASSWORD);
                    DeviceStorage.delete(Consts.localStorage.UNIQUEID);
                }
                },
            ]);
        }
    },
];

const styles = StyleSheet.create({
    avatarContainer: {
        paddingTop: 0,
        paddingBottom: 25,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    username: {
        paddingTop: 10,
        fontSize: 17,
        color: "#fff"
    },
    itemContainer: {
        height: 65,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 85,
    },
    itemText: {
        fontSize: 14,
        color: '#ababab',
        marginLeft: 5,
    },
    divider: {
        width: 125,
        height: 1,
        backgroundColor: '#333333',
        alignSelf: 'center',
    },
    iconContainer: {
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout: {
        width: 26,
        height: 26,
        color: '#fff',
        paddingLeft: 5,
        paddingTop: 3,
    },
    modifyPassword: {
        position: 'absolute',
        left: 22,
        bottom: 37,
    }
});

export default DrawerLayout;