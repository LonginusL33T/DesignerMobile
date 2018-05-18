import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Designer from './designer/Designer'
import Matches from './matches/Matches'
import {connect} from 'react-redux';
import {loginMesh} from '../../../../services/loginmesh'
import DeviceStorage from '../../../../utils/DeviceStorage'
import Consts from '../../../../config/consts'
import {login} from "../../../../services/login";
import SplashScreen from 'react-native-splash-screen'
import Tabs from './Tabs'

const images = {
    search: require("../../../../assets/designer/icon_search.png"),
    matches: require('../../../../assets/designer/matches.png'),
    designer: require('../../../../assets/designer/designer.png'),
    setting: require('../../../../assets/designer/icon_setting.png'),
}
const tabNames = ['Designer', 'Matches',];
const tabIcons = [images.designer, images.matches,];

//初始界面
class Main extends Component {
    static navigationOptions = ({navigation: {navigate}}) => ({
        headerLeft: (
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => {
                    //判断用户名，若不存在则跳转登录
                    DeviceStorage.get(Consts.localStorage.ISLOGIN).then(value => {
                        if (value)
                            navigate('DrawerOpen');
                        else
                            navigate('Login');
                    })
                }}>
                <Image source={images.setting}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                style={styles.navBarRight}
                onPress={() => {
                    //根据搜索历史记录传值至搜索界面
                    DeviceStorage.get(Consts.localStorage.SEARCHHISTORY).then((val) => {
                        navigate('SearchDesigner', {searchHistory: val});
                    })
                }}>
                <Image source={images.search}/>
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            showTabView: false,
        };
    }

    componentDidMount(){
        //设置闪屏时间为1秒
        setTimeout(()=>{SplashScreen.hide()},1000)
        const {dispatch} = this.props.navigation;
        this.timer = setTimeout(() => {
            this.setState({
                showTabView: true
            });
        }, 500);
        DeviceStorage.get(Consts.localStorage.ISLOGIN).then((val) => {
            if(val) {
                //若用户名存在则取出用户名与密码进行填充
                var getTokenPromise = Promise.all([DeviceStorage.get(Consts.localStorage.USERNAME),
                    DeviceStorage.get(Consts.localStorage.PASSWORD)]);
                getTokenPromise.then(([username, password]) => {
                    login(username, password, (val) => {
                        DeviceStorage.save(Consts.localStorage.X_TOKEN, val);
                    });
                })
            }
        })
        loginMesh();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={false}
                           backgroundColor='#000'/>
                {this.state.showTabView ?
                    <ScrollableTabView
                        tabBarPosition='top'
                        renderTabBar={() => <Tabs tabNames={tabNames} tabIcons={tabIcons}/>}>
                        <View tabLabel='Tab1' style={styles.tabContent}><Designer/></View>
                        <View tabLabel='Tab2' style={styles.tabContent}><Matches/></View>
                    </ScrollableTabView> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarLeft: {
        width: 23,
        height: 23,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navBarRight: {
        width: 23,
        height: 23,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContent: {
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        store: state
    };
};

export default connect(mapStateToProps)(Main);

