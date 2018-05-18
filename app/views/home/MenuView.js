import React, {Component} from 'react';

import { connect } from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ListView,
    ScrollView,
    Image,
} from 'react-native';

import {TabNavigator,DrawerNavigator,DrawerItems} from 'react-navigation'
@connect(state => ({nav: state.nav}))
class MenuView extends Component{
    render(){
        console.log("menuview",this.props);
        return(
            <ScrollView style={{backgroundColor:'#000'}}>
                <View >
                    <View style={styles.avatarContainer}>
                        <Image source={require('../../assets/GG.png')}
                               style={styles.avatar}/>
                        <Text style={styles.username}>User Name</Text>
                    </View>
                    <DrawerItems {...this.props} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 15,
        height: 15,
    },
    tabicon: {
        width: 25,
        height: 25,
    },
    avatarContainer:{
        paddingTop: 10,
        paddingBottom:10,
        paddingHorizontal: 15,
        backgroundColor:'#000',
        alignItems:'center'
    },
    avatar:{
        width:70,
        height:70,
        borderRadius:35,
        alignItems:'center'
    },
    username:{
        paddingTop:10,
        fontSize:15,
        color:"#fff"
    }
});
export default MenuView