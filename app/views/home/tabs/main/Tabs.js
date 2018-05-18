import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Platform,
} from 'react-native'
import PropTypes from 'prop-types'
export default class Tabs extends Component{
    static propTypes = {
        goToPage: PropTypes.func, // 跳转到对应tab的方法
        activeTab: PropTypes.number, // 当前被选中的tab下标
        tabs: PropTypes.array, // 所有tabs集合
        tabNames: PropTypes.array, // 保存Tab名称
        tabIcons: PropTypes.array, // 保存Tab图标
    }
    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
    renderTabOption(tab, i) {
        const color = this.props.activeTab == i? "#f5b13b" : "#565656"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity
                key={'tab' + i}
                activeOpacity={0.6}
                onPress={()=>this.props.goToPage(i)}
                style={styles.tab}>
                <Image source={this.props.tabIcons[i]} style={{tintColor: color}}/>
                <Text style={{color: color, fontSize: 17, marginLeft: 8}}>
                    {this.props.tabNames[i]}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 39,
        backgroundColor: '#000',
        justifyContent: 'center',
        zIndex: Platform.OS === 'android' ? 0 : 1,
        shadowColor: 'rgb(73, 65, 62)',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.5,
    },
    tab: {
        flexDirection: 'row',
        width: 119.5,
        height: 29,
        marginHorizontal: 20.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
});