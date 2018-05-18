import React, {Component} from 'react';
import We from './tabs/we/We';
import News from './tabs/news/News';
import WeSupport from './tabs/wesupport/WeSupport';
import Main from './tabs/main/Main'
import Consts from '../../config/consts'

import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ListView,
    ScrollView,
    StatusBar,
    Image,
} from 'react-native';
import {TabNavigator, DrawerNavigator} from 'react-navigation'
import DrawerLayout from "./DrawerLayout";
const images = {
    //对应TAB的图标
    tabs: {
        matcheIng: require('../../assets/designer/icon_matches_ing.png'),
        matche: require('../../assets/designer/icon_matches.png'),
        weIng: require('../../assets/designer/icon_we_ing.png'),
        we: require('../../assets/designer/icon_we.png'),
        newsIng: require('../../assets/designer/icon_new_ing.png'),
        news: require('../../assets/designer/icon_new.png'),
        supportIng: require('../../assets/designer/we_suppot_ing.png'),
        support: require('../../assets/designer/support.png'),
        matches: require('../../assets/designer/matches.png'),
        designer: require('../../assets/designer/designer.png'),
    }
}

/**
 * 用于控制主页TAB
 */
const HomeScreenTabNavigator = TabNavigator({
    Main: {
        screen: Main,
        path: '/Main',
        navigationOptions: ({navigation: {dispatch}}) => ({
            tabBarIcon: ({focused}) => (
                <Image
                    style={styles.tabicon}
                    source={focused?images.tabs.matcheIng:images.tabs.matche}/>
            ),
            tabBarOnPress: (({route, index}, navigate) => {
                dispatch({type: 'top100designerList/refreshList'});
                dispatch({type: 'matchesList/getList'});
                navigate(index);
            })
        }),
    },
    We: {
        screen: We,
        path: '/We',
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image
                    style={styles.tabicon}
                    source={focused?images.tabs.weIng:images.tabs.we}/>
            ),
        },
    },
    News: {
        screen: News,
        path: '/News',
        navigationOptions: ({navigation: {dispatch}}) => ({
            tabBarIcon: ({focused}) => (
                <Image
                    style={styles.tabicon}
                    source={focused?images.tabs.newsIng:images.tabs.news}/>
            ),
            tabBarOnPress: (({route, index}, navigate) => {
                dispatch({type:'newsList/updateHash', hash: Math.random()});
                dispatch({type:'newsList/getAdvertisement'});
                dispatch({type:'newsList/refreshList', perPage: 5});
                navigate(index);
            })
        })
    },
    Support: {
        screen: WeSupport,
        path: '/WeSupport',
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image
                    style={styles.tabicon}
                    source={focused?images.tabs.supportIng:images.tabs.support}/>

            ),
        },
    },
}, {
    //初始进入页面为Main
    initialRouteName: 'Main',
    ...TabNavigator.Presets.iOSBottomTabs,
    tabBarOptions: {
        showLabel: false,
        activeTintColor: Consts.theme.primaryColor,
        // activeTintColor: '#3478f6', // IOS10默认点击后颜色
        inactiveTintColor: '#929292', // IOS10默认点击前颜色
        style: {
            backgroundColor: '#000000', // 原先F7F7F7
            borderTopColor: '#000',
            height:54
        },
        tabStyle: {
            //backgroundColor: 'black'
        },
        labelStyle: {
            fontSize: 10,
            marginBottom: 5,
        },
    },
    lazy: true,
});

//设定初始进入页面
const routerConfig = {
    Index: {
        screen: HomeScreenTabNavigator,
    }
}
/**
 * 左侧菜单控制
 */
const HomeDrawerNavigator = DrawerNavigator({...routerConfig}, {
    drawerWidth: 270, // 抽屉宽
    drawerPosition: 'left', // 控制抽屉出现的位置在左边还是右边
    contentOptions: {
        initialRouteName: 'Index', // 默认页面组件
        activeTintColor: 'white',  // 选中文字颜色
        activeBackgroundColor: '#ff8500', // 选中背景颜色
        inactiveTintColor: '#ababab',  // 未选中文字颜色
        inactiveBackgroundColor: 'transparent', // 未选中背景颜色
        style: {  // 样式
            //fontSize:12
        },
        labelStyle: {
            fontSize: 14,
        },
    },
    contentComponent: props => {
        return (
            <DrawerLayout navigation={props.navigation}/>
        )
    },
    navigationOptions: {
        drawerLockMode: 'locked-closed',//屏蔽手势对左抽屉的影响
    }
});

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    tabicon: {
        width: 30,
        height: 30,
    },
    avatarContainer: {
        paddingTop: 10,
        paddingBottom: 25,
        paddingHorizontal: 15,
        backgroundColor: '#000',
        alignItems: 'center'
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center'
    },
    username: {
        paddingTop: 10,
        fontSize: 17,
        color: "#fff"
    }
});
export default HomeDrawerNavigator;