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

export default class Select extends Component {
    render() {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.text}>{this.props.name}</Text>
                <ModalDropdown
                    {...this.props}
                    defaultValue=""
                    style={styles.select}
                    textStyle={styles.selectText}
                    dropdownStyle={{width: '90%'}}
                    dropdownTextStyle={styles.dropdownText}>
                </ModalDropdown>
                <Image source={require('../../../assets/designer/icon_right2.png')} style={styles.iconRight}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        width: "90%",
        height: 54,
        borderBottomWidth: 1,
        borderBottomColor: "#e9e9e9",
        flexDirection: 'row'
    },
    text: {
        fontSize: 14,
        color: '#3c3c3c',
        paddingLeft:8,
        backgroundColor:"transparent",
        position:"absolute",
        top: 27,
    },
    iconRight: {
        position:"absolute",
        right:8,
        bottom:8,
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
        paddingTop: 27,
        paddingRight: 28,
        textAlign: 'right',
        backgroundColor:"transparent",
        color: '#c6871b',
    },
    dropdownText: {
        fontSize: 16,
        height: 40
    },
});