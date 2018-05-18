import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

export default class Picker extends Component {
    render() {
        const Platform = require('Platform');
        return (
            <View style={{width: '90%'}}>
                <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/>
                <View style={styles.itemContainer}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <ModalDropdown
                        {...this.props}
                        defaultValue="请选择"
                        style={styles.select}
                        textStyle={styles.selectText}
                        dropdownStyle={Platform.OS === 'android' ? styles.dropdownAndroid : styles.dropdownIos}
                        dropdownTextStyle={styles.dropdownText}>
                    </ModalDropdown>
                    <Image source={require('../../assets/designer/icon_right.png')} style={styles.iconRight}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        width: "100%",
        height: 54,
        borderBottomWidth: 1,
        borderBottomColor: "#5a5a5a",
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: '#d5d5d5',
        backgroundColor:"transparent",
        position:"absolute",
        left:-5,
        bottom: 11,
    },
    iconRight: {
        position:"absolute",
        right:8,
        bottom:11,
    },
    select: {
        flex:1,
        left: 0,
        height: 54,
        backgroundColor:"transparent"
    },
    selectText: {
        height: 54,
        fontSize: 14,
        bottom:11,
        paddingTop:33,
        paddingRight: 28,
        textAlign: 'right',
        backgroundColor:"transparent",
        color: '#d5d5d5',
    },
    dropdownAndroid:{
        width:"90%",
        marginTop: -StatusBar.currentHeight,
    },
    dropdownIos:{
        width:"90%",
    },
    dropdownText: {
        fontSize: 16,
        height: 40
    },
    star: {
        width: 20,
        height: 20,
        position: 'absolute'
    },
    starIOS: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:15,
        left:-12,
        justifyContent:"center",
    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:15,
        left:-12,
        justifyContent:"center",
    },
});